import { View, } from 'react-native'
import React from 'react'
import { useGlobal } from '@/app/context'
import { StyleSheet } from 'react-native'
import { ChevronHeader,ColoredHeader } from '@/components/Header'
import { Slogan, } from '@/components/Element'
import { useLogin } from '@/store/auth'
import OtpComponent from '@/components/ui/otp'
import { AuthLayOut } from '@/components/LayOut'




const otp = () => {

  const {background,}=useGlobal()
  const {resetEmail}=useLogin()
  






  return (
     <AuthLayOut>
<ChevronHeader/>
      <ColoredHeader type='normal' text={'Enter 4 digit code'}/>
      <Slogan  text={`We sent a one time password to your email. ${resetEmail}`}/>

  <OtpComponent/>
 
     </AuthLayOut>
      
 
 
  )
}




export default otp