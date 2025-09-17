import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { useGlobal } from '@/app/context'
import { StyleSheet } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { ChevronHeader,ColoredHeader } from '@/components/Header'
import { Slogan,InputField,InputType, SubmitBtn, } from '@/components/Element'
import { AuthLayOut } from '@/components/LayOut'


const  ForgotPassword = () => {

  const {background,}=useGlobal()
  const [password,setPassword]=useState<string>('')
  const [secondPassword,setSecondPassword]=useState<string>('')
    const [isSubmitClicked,setIsSubmitClicked]=useState<boolean>(false)
 const isActive=true
 const  instance="registeration"
 
 
 type InputArrayType={
   _id:number,
   params:InputType,
 
 }
 
 
 const InputArray:InputArrayType[]=[
  
    {
    _id:1,
    params:{
 label:'Password',
  text:password,
  icon:"eye-outline",
  setText:(value:string)=>(value:string)=>setPassword(value),
    type:"password",
  isSubmitClicked,
   instance
    },
    
  },

   {
    _id:2,
    params:{
 label:'Confirm Password',
  text:secondPassword,
  icon:"eye-outline",
  setText:(value:string)=>setSecondPassword(value),
    type:"password",
   isSubmitClicked,
    instance
    },
  
  },

 
    
   
 
 ]
 
 
 const handleSubmit=()=>{
 console.log(password,'register-data')
 }
 

 return (


  <AuthLayOut>
 <ChevronHeader/>
       <ColoredHeader type='normal' text={'Create New Password'}/>
       <Slogan  text={`Enter new password`}/>
 
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
       
 
   <View style={{justifyContent:"center",alignItems:"center",width:"100%",marginTop:RFValue(200)}}>
  <SubmitBtn isActive={isActive} text='Continue' trigger={handleSubmit}  type='normal'/>
   </View>
  </AuthLayOut>

     
   )
}




export default  ForgotPassword