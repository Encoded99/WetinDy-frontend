import { View, Text,StyleSheet } from 'react-native'
import React,{useEffect, useState} from 'react'
import { InnerLayOut } from '@/components/LayOut'
import { LightHeader,ColoredHeader, } from '@/components/Header'
import { Slogan,SubmitBtn,InputField,standardHeight,ButtonWithSkip,InputType } from '@/components/Element'
import { RFValue } from 'react-native-responsive-fontsize'
import { useRouter } from 'expo-router'
import { useBusiness } from '@/store/business'
import { api,apiUrl } from '@/functions/axios'
import { errorOne ,notFoundError} from '@/custom'
import { CircleLoader } from '@/components/ui/Loader'
import { useAuth } from '@/store/auth'


const index = () => {
    const {setResponseMessage,setIsError,}=useAuth()
  const {business,setBusiness,claimMode}=useBusiness()
  const [isActive,setIsActive]=useState<boolean>(false)
  const [isLoading,setIsLoading]=useState<boolean>(false)
 const [isSubmitClicked,setIsSubmitClicked]=useState<boolean>(false)
const router=useRouter()




const skipFunction=()=>{
  router.push('/(tabs)/(create)/social')
}


const handleSubmit=async()=>{

   if (claimMode){
     router.push('/(tabs)/(create)/social')
    return
  }



  setIsSubmitClicked(true)
  if (!isActive) return
setIsLoading(true)
  try{


     const data={
    website:business.website,
   }


   const url=`${apiUrl}/business/check-business-website`

  await api.post(url,data)


  router.push('/(tabs)/(create)/social')





  }
catch(err:any){

   setIsError(true)


  if (err?.response?.status===404){
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




useEffect(()=>{

  if (business.website){
    setIsActive(true)
  }
  else{
    setIsActive(false)
  }

},[business.website])





const params={
  skipFunction:skipFunction,
  continueFunction:handleSubmit,
  isActive
}



const inputParam:InputType={
 label:'Website link',
  text:business.website || '',
  setText:(value:string)=>setBusiness({...business,website:value?value:undefined}), 
   isSubmitClicked, 
   type:"text",
   instance:'registeration'
    }


  return (
    <InnerLayOut>
         <CircleLoader isLoading={isLoading}/>
   <LightHeader text={'List Business'}/>
   <ColoredHeader text={`Does  have a ${business.name} business website?` }  type='black'/>
 <Slogan  text={'Add a website for others user to learn more about the business'}/>



<View style={styles.inputContainer}>
 <InputField {...inputParam} label="Website Link"/>
</View>





 <View style={styles.contentContainer}>







<View style={styles.btnContainer}>
  <ButtonWithSkip {...params}/>
</View>




 </View>

    </InnerLayOut>

  )
}

const styles=StyleSheet.create({
   contentContainer:{
    flex:1,
    padding:'2%',
    justifyContent:'flex-end',

   },
   btnContainer:{
    width:'100%',
    alignItems:'center',
    marginTop:20,
   },
   inputContainer:{
    width:"100%",
    marginVertical:RFValue(30)
   },
   smallInput:{
    width:'100%',
    height:standardHeight,
    backgroundColor:'red',
     padding:'2%',

   }
})


export default index