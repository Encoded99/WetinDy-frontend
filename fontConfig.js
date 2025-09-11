
import { useGlobal } from './app/context';
import React,{useEffect, useState,} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Font from 'expo-font';




export const useFonts=()=>{

  const {setMode}=useGlobal()

    const [fontLoaded, setFontLoaded] = useState(false);
    
  


const loadFonts=async()=>{

  const storedMode=await AsyncStorage.getItem('mode') 
  setMode(storedMode || 'light');
 


     try{
      await Font.loadAsync({
        'Lora': require('./assets/fonts/Lora-Bold.ttf'),   
        'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
        'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
     
      })

     }

     catch(err){
    
    console.log(err)

     }
    finally{
      setFontLoaded(true)
    }
  
}


useEffect(()=>{
  loadFonts()

},[])


return{
  fontLoaded,

}
  
}