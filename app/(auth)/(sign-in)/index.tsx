import { View, Text } from 'react-native'
import React, { use } from 'react'
import { useGlobal } from '@/app/context'
import { StyleSheet } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { ChevronHeader,ColoredHeader } from '@/components/Header'
import { primary } from '@/custom'
import { Slogan,InputField,InputType,Terms, SubmitBtn,AccountStatus } from '@/components/Element'
import { useLogin, } from '@/store/auth'


const signin = () => {

  const {background,}=useGlobal()
  const {loginData,setLoginData}=useLogin()
  




type InputArrayType={
  _id:number,
  params:InputType,

}


const InputArray:InputArrayType[]=[
  {
    _id:1,
    params:{
 label:'Phone or Email',
  text:loginData.email,
  icon:"email-outline",
  setText:(value:string)=>setLoginData({...loginData,email:value}),
    
    }

  },

    {
    _id:2,
    params:{
 label:'Password',
  text:loginData.password,
  icon:"eye-outline",
  setText:(value:string)=>setLoginData({...loginData,password:value}),
  isPassword:true,
    },
    
  },

  

]


const handleSubmit=()=>{
console.log(loginData,'register-data')
}


  return (
    <View style={[styles.container,{backgroundColor:background}]}>
      
      <ChevronHeader/>
      <ColoredHeader type='title' text={'Sign into'}/>
      <Slogan  text={'Enter your log in details'}/>

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
       <Text style={{color:primary,fontFamily:'Poppins-Bold',textAlign:'center',marginVertical:30,fontSize:RFValue(13)}}>Forgot password?</Text>

  <View style={{justifyContent:"center",alignItems:"center",width:"100%"}}>
 <SubmitBtn text='Continue' trigger={handleSubmit}  type='normal'/>
  </View>
 <AccountStatus link="sign-up"/>
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

export default signin