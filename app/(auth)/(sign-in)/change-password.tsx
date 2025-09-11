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



const  ForgotPassword = () => {

  const {background,}=useGlobal()
  const [password,setPassword]=useState<string>('')
  const [secondPassword,setSecondPassword]=useState<string>('')

 
 
 
 
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
  isPassword:true,
    },
    
  },

   {
    _id:2,
    params:{
 label:'Confirm Password',
  text:secondPassword,
  icon:"eye-outline",
  setText:(value:string)=>setSecondPassword(value),
  isPassword:true,
    },
  
  },

 
    
   
 
 ]
 
 
 const handleSubmit=()=>{
 console.log(password,'register-data')
 }
 

 return (
     <View style={[styles.container,{backgroundColor:background}]}>
       
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
  <SubmitBtn text='Continue' trigger={handleSubmit}  type='normal'/>
   </View>
 
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


export default  ForgotPassword