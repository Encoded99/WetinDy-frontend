import { View,  } from 'react-native'
import React from 'react'
import { useGlobal } from '@/app/context'
import { StyleSheet } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { ChevronHeader,ColoredHeader } from '@/components/Header'

import { Slogan,InputField,InputType,Terms, SubmitBtn,AccountStatus } from '@/components/Element'
import { useRegister, } from '@/store/auth'


const index = () => {

  const {background,}=useGlobal()
  const {registerData,setRegisterData}=useRegister()
  




type InputArrayType={
  _id:number,
  params:InputType,

}


const InputArray:InputArrayType[]=[
  {
    _id:1,
    params:{
 label:'Email',
  text:registerData.email,
  icon:"email-outline",
  setText:(value:string)=>setRegisterData({...registerData,email:value}),
    
    }

  },

    {
    _id:2,
    params:{
 label:'Password',
  text:registerData.password,
  icon:"eye-outline",
  setText:(value:string)=>setRegisterData({...registerData,password:value}),
  isPassword:true,
    },
    
  },

   {
    _id:3,
    params:{
 label:'Confirm Password',
  text:registerData.secondPassword,
  icon:"eye-outline",
  setText:(value:string)=>setRegisterData({...registerData,secondPassword:value}),
  isPassword:true,
    },
  
  },

]


const handleSubmit=()=>{
console.log(registerData,'register-data')
}


  return (
    <View style={[styles.container,{backgroundColor:background}]}>
      
      <ChevronHeader/>
      <ColoredHeader type='title' text={'Sign Up with'}/>
      <Slogan  text={'Provide your details and let’s get you started'}/>

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
  <Terms/>

  <View style={{justifyContent:"center",alignItems:"center",width:"100%"}}>
 <SubmitBtn text='Continue' trigger={handleSubmit}  type='normal'/>
  </View>
 <AccountStatus link="sign-in"/>
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

export default index