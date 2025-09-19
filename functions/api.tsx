
import AsyncStorage from "@react-native-async-storage/async-storage"


export const storeToken = async (token:string,refreshToken:string) => {
  try {
    await AsyncStorage.setItem('token', token);
    await AsyncStorage.setItem('refresh-token', refreshToken);
//  router.push ('/(secure)')
  } catch (error) {
   
  }
};