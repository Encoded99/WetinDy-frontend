import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { useGlobal } from '@/app/context'
import { StyleSheet } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { ChevronHeader,ColoredHeader } from '@/components/Header'
import { primary } from '@/custom'
import { Slogan,InputField,InputType,Terms, SubmitBtn,AccountStatus } from '@/components/Element'
import { useLogin } from '@/store/auth'
import { title } from '@/custom'
import { AuthLayOut } from '@/components/LayOut'


const  ForgotPassword = () => {

  const {background,}=useGlobal()
   const {resetEmail,setResetEmail}=useLogin()
  const [isSubmitClicked,setIsSubmitClicked]=useState<boolean>(false)
 
 const instance= "registeration"
 
 
 
 
 type InputArrayType={
   _id:number,
   params:InputType,
 
 }
 
 
 const InputArray:InputArrayType[]=[
   {
     _id:1,
     params:{
  label:'Email',
   text:resetEmail,
   icon:"email-outline",
   setText:(value:string)=>setResetEmail(value),
   isSubmitClicked,
   type:"email",
    instance
     
     }
 
   },
 
    
   
 
 ]
 
 
 const handleSubmit=()=>{
 console.log(resetEmail,'register-data')
 }
 

 return (

  <AuthLayOut>
 <ChevronHeader/>
       <ColoredHeader type='normal' text={'Reset password'}/>
       <Slogan  text={`Enter the email or number associated with your ${title} account to recieve a password reset code`}/>
 
     {
       InputArray.map((item,index)=>{
         return (
           <>
           <View style={{marginTop:RFValue(20)}}>
          <InputField {...item.params}/>
         </View>
           
           </>
         )
       })
     }
       
 
   <View style={{justifyContent:"center",alignItems:"center",width:"100%",marginTop:RFValue(300)}}>
  <SubmitBtn text='Continue' trigger={handleSubmit}  type='normal'/>
   </View>
  </AuthLayOut>
    
   )
}



export default  ForgotPassword