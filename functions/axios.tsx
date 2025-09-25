import axios, { InternalAxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const local:string = 'http://192.168.0.4:8080';
export const hosted:string = 'https://talezee-backend.onrender.com';
export const apiUrl:string =local
const localServerLess = 'http://192.168.0.2:3000';
const hostedServerLess = 'https://tale-zee-web.vercel.app';

export const serverLessUrl = hostedServerLess;
export const wbUrl = apiUrl;

export interface MultiPartAxiosConfig extends InternalAxiosRequestConfig {
  isMultipart?: boolean;
}

export const api = axios.create({
  baseURL: apiUrl,
timeout: 60000,
});

// Function to wake up the server by hitting the wake-server endpoint
export const wakeServer = async () => {
  try {
    const url = `${apiUrl}/users/wake-server`; // Replace with your actual wake server endpoint
    await axios.post(url);
    return true
  } catch (error:any) {
   
    return false;
  }
};

// Function to check if the server is awake







// Request Interceptor
api.interceptors.request.use(
  async (config: MultiPartAxiosConfig): Promise<InternalAxiosRequestConfig<any>> => {
    config.headers = config.headers || {}; // Ensure headers exist

    const accessToken = await AsyncStorage.getItem('token');
    const refreshToken = await AsyncStorage.getItem('refresh-token');

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    if (refreshToken) {
      config.headers['x-refresh-token'] = refreshToken;
    }

    // Set Content-Type dynamically based on isMultipart
    if (config.isMultipart) {
      config.headers['Content-Type'] = 'multipart/form-data';
    } else {
      config.headers['Content-Type'] = 'application/json';
    }

    config.headers['x-source'] = 'mobile'; // Custom header

    // Before making the actual API request, check if the server is awake
 
    return config; // Return updated config
  },
  (error) => Promise.reject(error)
);

// Response Interceptor


const retry=false


api.interceptors.response.use(









  async (response) => {

    


    if (response.data && response.data.message === 'Token-refresh') {
      await AsyncStorage.setItem('token', response.data.token);
      await AsyncStorage.setItem('refresh-token', response.data.refreshToken);

      const originalRequest = response.config as MultiPartAxiosConfig;
      originalRequest.headers = originalRequest.headers || {};
      originalRequest.headers.Authorization = `Bearer ${response.data.token}`;

      return api(originalRequest);
    }

    return response;
  },
  async (error) => {
    if (error.response) {
      console.error('HTTP Error:', error.response.status, error.message);
    } else if (error.request) {

     error.config._retry= error.config._retry || 0

     const isManualRetry = error.config.headers?.['X-Manual-Retry'] === 'true';


      if (error.config._retry<1 && retry && !isManualRetry ){


     

        await new Promise((resolve) => setTimeout(resolve, 60000));

       
      
      
      

        
        error.config._retry++;
      
            return api(error.config); 

      }


     

     



     

    } else {
      console.error('Error:', error.message);
    }

    return Promise.reject(error);
  }
);









export interface MultiPartAxiosConfig extends InternalAxiosRequestConfig {
  isMultipart?: boolean;
}

export const authApi = axios.create({
  baseURL: apiUrl,
  timeout: 5000, 
});

// Request Interceptor
authApi.interceptors.request.use(
  async (config: MultiPartAxiosConfig): Promise<InternalAxiosRequestConfig<any>> => {
    config.headers = config.headers || {}; // Ensure headers exist

    // Set Content-Type dynamically based on isMultipart
    if (config.isMultipart) {
      config.headers['Content-Type'] = 'multipart/form-data';
    } else {
      config.headers['Content-Type'] = 'application/json';
    }

    config.headers['x-source'] = 'mobile'; // Custom header
    return config; // Return updated config
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
authApi.interceptors.response.use(
  async (response) => response, // Return response normally
  async (error) => {
    if (error.response) {
      // Log HTTP error response status
     

      // If error is "Invalid Token", DO NOT retry
      if (error.response.status === 401 && error.response.data?.message === 'Invalid Token') {
        return Promise.reject(error);
      }
    } else if (error.request) {
      // Retry logic for network errors
      error.config._retry = error.config._retry || 0;

      if (error.config._retry < 1) {
       
        await new Promise((resolve) => setTimeout(resolve, 60000)); // Wait 1 min

        error.config._retry++; // Increment retry count
        return authApi(error.config); // Retry the request
      }
    }

    return Promise.reject(error); // If retry fails, reject
  }
);

