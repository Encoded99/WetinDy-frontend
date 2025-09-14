import { View, } from 'react-native'
import React from 'react'
import { useGlobal } from '@/app/context'
import { StyleSheet } from 'react-native'
import { ChevronHeader,ColoredHeader } from '@/components/Header'
import { Slogan, } from '@/components/Element'
import { useRegister } from '@/store/auth'
import OtpComponent from '@/components/ui/otp'
import { AuthLayOut } from '@/components/LayOut'




const otp = () => {

  const {background,}=useGlobal()
  const {registerData,}=useRegister()
  

const OtpNumber=registerData.prefix + registerData.telephone





  return (
  <AuthLayOut>
  <ChevronHeader/>
      <ColoredHeader type='normal' text={'Verify your phone number'}/>
      <Slogan  text={`We sent a one time password to your phone number. ${OtpNumber}`}/>

  <OtpComponent/>
 
  </AuthLayOut>
    
 
  )
}




export default otp