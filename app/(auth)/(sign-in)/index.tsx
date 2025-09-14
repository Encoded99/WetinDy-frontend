import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { useGlobal } from '@/app/context'
import { RFValue } from 'react-native-responsive-fontsize'
import { ChevronHeader,ColoredHeader } from '@/components/Header'
import { primary } from '@/custom'
import { Slogan,InputField,InputType, SubmitBtn,AccountStatus } from '@/components/Element'
import { useLogin, } from '@/store/auth'
import { AuthLayOut } from '@/components/LayOut'
import { apiUrl,authApi } from '@/functions/axios'
import { useRouter } from 'expo-router'
import { CircleLoader } from '@/components/ui/Loader'
import { useAuth } from '@/store/auth'
import { errorOne } from '@/custom'


const signin = () => {
 
  const {background,}=useGlobal()
  const {setResponseMessage,setIsError}=useAuth()
  const {loginData,setLoginData}=useLogin()
   const [isSubmitClicked,setIsSubmitClicked]=useState<boolean>(false)
  const [isLoading,setIsLoading]=useState<boolean>(false)
  const  instance="normal"
  const router=useRouter()




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
    isSubmitClicked,
      type:"email",
       instance
    }

  },

    {
    _id:2,
    params:{
 label:'Password',
  text:loginData.password,
  icon:"eye-outline",
  setText:(value:string)=>setLoginData({...loginData,password:value}),
     type:"password",
  isSubmitClicked,
   instance
    },
    
  },

  

]




const handleSubmit=async()=>{
    
  setIsSubmitClicked(true)





   if (loginData.email==='' || loginData.password===''){

    return

   }
setIsLoading(true)



try{
   const data={
    telephone:loginData.email,
    password:loginData.password,
   }
  const url=`${apiUrl}/users/log-in`

  await authApi.post(url,data,{
        headers: { 'Content-Type': 'application/json' }},)


 alert('logged in successfully')

}

catch(err:any){

 setIsError(true)
  if (err?.response?.data){
   
  setResponseMessage(err?.response?.data)
  setIsLoading(false)
  return
  }

  setResponseMessage(errorOne)
}

finally{
 
setIsLoading(false)

}


}




  return (
   
      <AuthLayOut>
        <CircleLoader isLoading={isLoading}/>
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
 
      </AuthLayOut>
      
  )
}





export default signin