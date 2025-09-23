import { View, StyleSheet,Text,ScrollView } from 'react-native'
import React,{useEffect, useState} from 'react'
import { InnerLayOut } from '@/components/LayOut'
import { LightHeader,ColoredHeader, } from '@/components/Header'
import { Slogan,SubmitBtn,InputField,SmallInputField,InputType } from '@/components/Element'
import { RFValue } from 'react-native-responsive-fontsize'
import { useBusiness } from '@/store/business'
import { useRouter } from 'expo-router'
import { useAuth } from '@/store/auth'
import { api,apiUrl } from '@/functions/axios'
import { errorOne ,notFoundError} from '@/custom'
import { CircleLoader } from '@/components/ui/Loader'

const index = () => {


  const {setResponseMessage,setIsError,}=useAuth()
  const {business,setBusiness,claimMode}=useBusiness()
   const [isLoading,setIsLoading]=useState<boolean>(false)
  const [isSubmitClicked,setIsSubmitClicked]=useState<boolean>(false)
   const [isActive,setIsActive]=useState<boolean>(false)
const router=useRouter()


const handleSubmit=async()=>{

   if (claimMode){
    router.push('/(tabs)/(create)/contact')
    return
   }



  setIsSubmitClicked(true)
  if (!isActive) return
setIsLoading(true)
  try{


     const data={
    name:business.name,
    postalCode:business.address.postalCode
   }


   const url=`${apiUrl}/business/check-business-name`

  await api.post(url,data)


 router.push('/(tabs)/(create)/contact')





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


const streetParams:InputType={
 label:'Street address *',
  text:business.address.street,
  setText:(value:string)=>setBusiness({...business,address:{...business.address,street:value}}), 
   isSubmitClicked, 
   type:"text",
instance:'registeration'
    }

    const cityParams:InputType={
 label:'City *',
  text:business.address.city,
  setText:(value:string)=>setBusiness({...business,address:{...business.address,city:value}}), 
   isSubmitClicked, 
   type:"text",
instance:'registeration'
    }


     const provinceParams:InputType={
 label:'Province/Region *',
  text:business.address.stateOrRegion,
  setText:(value:string)=>setBusiness({...business,address:{...business.address,stateOrRegion:value}}), 
   isSubmitClicked, 
   type:"text",
instance:'registeration'
    }


       const postalParams:InputType={
 label:'Postal Code *',
  text:business.address.postalCode,
  setText:(value:string)=>setBusiness({...business,address:{...business.address,postalCode:value}}), 
   isSubmitClicked, 
   type:"telephone",
instance:'registeration'
    }


  

    const checkSyntax=()=>{
      
      const isAllTextFilled= business.address.city && business.address.postalCode && business.address.stateOrRegion && business.address.street
  if (isAllTextFilled){
    setIsActive(true)
  }

  else{
    setIsActive(false)
  }

    }




useEffect(()=>{


checkSyntax()
},[business.address])










  return (
     
    <InnerLayOut>

   <CircleLoader isLoading={isLoading}/>
  

       <LightHeader text={'List Business'}/>
   <ColoredHeader text='What is the business address?' type='black'/>
 <Slogan  text={'What is the business address?'}/>



  <View style={styles.inputContainer}>
 <InputField {...streetParams}/>
</View>

<View style={styles.inputContainer}>
 <InputField  {...cityParams}/>
</View>


<View  style={styles.smallInput}>
  <SmallInputField {...provinceParams} label="Province/Region/State"/>
    <SmallInputField {...postalParams} label="Postal Code"/>
</View>




<View style={styles.btnContainer}>
  <SubmitBtn isActive={isActive} type='normal' trigger={handleSubmit} text='Continue' />
</View>


 


      
      
       
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