import { View, } from 'react-native'
import React from 'react'
import { useGlobal } from '@/app/context'
import { StyleSheet } from 'react-native'
import { ChevronHeader,ColoredHeader } from '@/components/Header'
import { Slogan, } from '@/components/Element'
import { useLogin } from '@/store/auth'
import OtpComponent from '@/components/ui/otp'





const otp = () => {

  const {background,}=useGlobal()
  const {resetEmail}=useLogin()
  






  return (
    <View style={[styles.container,{backgroundColor:background}]}>
      
      <ChevronHeader/>
      <ColoredHeader type='normal' text={'Enter 4 digit code'}/>
      <Slogan  text={`We sent a one time password to your email. ${resetEmail}`}/>

  <OtpComponent/>
 
 
    </View>
  )
}


const styles= StyleSheet.create({

  container:{
    width:"100%",
    padding:'2%',
    flex:1,

  },

 

})


export default otp