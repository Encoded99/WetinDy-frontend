import { View,StyleSheet,} from 'react-native'
import React,{useEffect, } from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import { useGlobal } from './context'
import { useFonts } from '../fontConfig'
import { useRouter } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useLogin } from '@/store/auth'










const index = () => {
const {setIsLoggedIn}=useLogin()
const {fontLoaded}= useFonts()
const {background,}=useGlobal()

const router= useRouter()








  const checkToken=async ()=>{

try{



  const token= await  AsyncStorage.getItem('token')



  if (token){
   setIsLoggedIn(true)
  router.push('/(tabs)/(create)/photo')
  }

  else{ 

 

    router.push('/(auth)')
    setIsLoggedIn(false)
  }

  
}


catch(err){
    setIsLoggedIn(false)
router.push('/(auth)')
  
}




  }















useEffect(()=>{




const t=setTimeout(() => {
checkToken()
}, (100));

  return ()=>clearTimeout(t)

},[])





if (!fontLoaded){

    return (
      <>
      
       <View  style={[styles.container,{backgroundColor:background}]}>
     
     
        
    </View>
      </>
    )

  }


  return (
    <View  style={[styles.container,{backgroundColor:background}]}>
  
    </View>
  )
}


const styles=StyleSheet.create({
  container:{
    flex:1,
    width:"100%",
    padding: RFValue(10)
  },
  
})

export default index