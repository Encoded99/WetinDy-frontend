import { View } from 'react-native'
import React,{ useEffect, useState} from 'react'
import { StyleSheet } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { ChevronHeader,ColoredHeader } from '@/components/Header'
import { Slogan,InputField,InputType,Terms, SubmitBtn,AccountStatus,SelectInput } from '@/components/Element'
import { useRegister, } from '@/store/auth'
import { passwordRegex,phoneRegex } from '@/components/Element'
import { useAuth } from '@/store/auth'
import { authApi,apiUrl } from '@/functions/axios'
import { useRouter } from 'expo-router'
import { AuthLayOut } from '@/components/LayOut'
import { CircleLoader } from '@/components/ui/Loader'
import { errorOne } from '@/custom'

const index = () => {
  const {setResponseMessage,setIsError}=useAuth()
 const [isLoading,setIsLoading]=useState<boolean>(false)
  const {registerData,setRegisterData}=useRegister()
  const [isSubmitClicked,setIsSubmitClicked]=useState<boolean>(false)
const router=useRouter()
const instance="registeration"



type InputArrayType={
  _id:number,
  params:InputType,

}






const InputArray:InputArrayType[]=[



  {
    _id:1,
    params:{
 label:'Telephone',
  text:registerData.telephone,
  icon:"phone",
  setText:(value:string)=>setRegisterData({...registerData,telephone:value}), 
   isSubmitClicked, 
   type:"telephone",
   instance
    }

  },

    {
    _id:2,
    params:{
 label:'Password',
  text:registerData.password,
  icon:"eye-outline",
  setText:(value:string)=>setRegisterData({...registerData,password:value}),
  isSubmitClicked,
  type:"password",
 instance
    },
    
  },

  

]


const handleSubmit=async()=>{
    
  setIsSubmitClicked(true)


const isPasswordCorrect= passwordRegex.test(registerData.password)

const isPhoneCorrect=phoneRegex.test(registerData.telephone)
const isFormatCorrect=isPasswordCorrect  && isPhoneCorrect 
if (!isFormatCorrect  ){

   throw Error('Incorrect telephone or password format')

}

setIsLoading(true)



try{
   const data={
    telephone:registerData.telephone,
    prefix:registerData.prefix
   }
  const url=`${apiUrl}/users/first-check`

  await authApi.post(url,data,{
        headers: { 'Content-Type': 'application/json' }},)


  router.push('/(auth)/(register)/partTwo')

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
      <ColoredHeader type='title' text={'Sign Up with'}/>
      <Slogan  text={'Provide your details and let’s get you started'}/>

    {
      InputArray.map((item,index)=>{
        return (
          <>

          

          <View style={{marginTop:RFValue(20)}} key={index}>



                   {
                   index===0 && (
                        <>
                      <SelectInput {...item.params}/>  
                        </>
                      )
                    }

                      {
                   index>0 && (
                        <>
                    <InputField {...item.params}/> 
                        </>
                      )
                    }
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
    </AuthLayOut>
      

  )
}



const styles= StyleSheet.create({

  

  emptyFieldContainer:{
    width:'92%',
    flexDirection:'row',
    alignItems:"center",
    marginTop:6,
   
    alignSelf:"center",
    
  }
 

})

export default index