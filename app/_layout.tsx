import React, { useEffect } from 'react';
import { StyleSheet,Platform } from 'react-native';
import  AppProvider  from './context';
import { Slot } from 'expo-router';
import { ResponseModal } from '@/components/ui/reponse';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuth,useLogin } from '@/store/auth';
import { api,apiUrl } from '@/functions/axios'; 






const _layout = () => {
 const {user,setUser} =useAuth()
 const {isLoggedIn}=useLogin()

const queryClient = new QueryClient();



const fetchProfile=async()=>{

  try{
 const url=`${apiUrl}/users/fetch-profile`

 console.log(url,'url sent')

 const response= await api.get(url)
 setUser(response.data)

  }

  catch(err){
    console.log(err,'error-fetching profile')

  }

  finally{

  }

}



useEffect(()=>{

  if (user._id==='' && isLoggedIn){
    fetchProfile()
  }

},[])



  return (

   <QueryClientProvider client={queryClient}>
 <AppProvider>
           <ResponseModal/>
          <Slot />
  
      </AppProvider>


   </QueryClientProvider>
             
        
 
 
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
});

export default _layout;
