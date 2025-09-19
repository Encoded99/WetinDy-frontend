import { View, StyleSheet,ScrollView } from 'react-native'
import React,{useEffect, useState} from 'react'
import { InnerLayOut } from '@/components/LayOut'
import { LightHeader,ColoredHeader, } from '@/components/Header'
import { Slogan,SubmitBtn,InputField,InputType } from '@/components/Element'
import { RFValue } from 'react-native-responsive-fontsize'
import { useBusiness } from '@/store/business'
import OtpComponent from '@/components/ui/otp'
import { useRouter } from 'expo-router'
import { api,apiUrl } from '@/functions/axios'
import { useAuth } from '@/store/auth'
import { errorOne ,notFoundError} from '@/custom'
import { CircleLoader } from '@/components/ui/Loader'



const index = () => {
  const router=useRouter()
    const {setResponseMessage,setIsError,}=useAuth()
  const {business,setBusiness}=useBusiness()
  const [isSubmitClicked,setIsSubmitClicked]=useState<boolean>(false)
   const [isActive,setIsActive]=useState<boolean>(false)
    const [isOtpShown,setIsOtpShown]=useState<boolean>(false)
   const [isLoading,setIsLoading]=useState<boolean>(false)








const handleSubmit=async()=>{

  setIsSubmitClicked(true)
  if (!isActive) return
setIsLoading(true)
  try{


     const data={
    telephone:business.telephone,
    email:business.email
   }


   const url=`${apiUrl}/business/check-business-contact`

  await api.post(url,data)


router.push('/(tabs)/operation')





  }
catch(err:any){

   setIsError(true)


  if (err?.response?.status==='404'){
    setResponseMessage(notFoundError)
    setIsLoading(false)
    return
  }

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










const telParams:InputType={
 label:'Phone Number *',
  text:business.telephone,
  setText:(value:string)=>setBusiness({...business,telephone:value}), 
   isSubmitClicked, 
   type:"telephone",
instance:'registeration'
    }

    const emailParams:InputType={
 label:'Email',
  text:business.email,
  setText:(value:string)=>setBusiness({...business,email:value}), 
   isSubmitClicked, 
   type:"email",
instance:'registeration'
    }


  

    const checkSyntax=()=>{
      
      const isAllTextFilled= business.telephone 
  if (isAllTextFilled){
    setIsActive(true)
  }

  else{
    setIsActive(false)
  }

    }




useEffect(()=>{


checkSyntax()
},[business.telephone])










  return (
     
    <InnerLayOut>
         <CircleLoader isLoading={isLoading}/>
   {
    isOtpShown && (
      <>
      <OtpComponent/>
      </>
    )
   }
   <ScrollView
   showsVerticalScrollIndicator={false}

   >

       <LightHeader text={'List Business'}/>
   <ColoredHeader text='Add contact details for the business you’re listing' type='black'/>
 <Slogan  text={'Add contact details for Tony Enterprises to help customers contact them'}/>



<View style={styles.inputContainer}>
 <InputField {...telParams}/>
</View>

<View style={styles.inputContainer}>
 <InputField  {...emailParams}/>
</View>





<View style={styles.btnContainer}>
  <SubmitBtn isActive={isActive} type='normal' trigger={handleSubmit} text='Continue' />
</View>
 


      
        

     
   


   </ScrollView>
      
       
    </InnerLayOut>

  )
}

const styles=StyleSheet.create({
   contentContainer:{
    flex:1,
    padding:'2%',
    

   },
   btnContainer:{
    width:'100%',
    alignItems:'center',
   marginVertical:RFValue(20),
   },
   inputContainer:{
    width:"100%",
    marginVertical:RFValue(20),
   },
   smallInput:{
    width:'100%',
  
      marginVertical:RFValue(20),
    
  flexDirection:"row",
  alignItems:'center',
  justifyContent:'space-between'
   }
})


export default index