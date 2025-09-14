import { View, } from 'react-native'
import React,{useState} from 'react'

import { RFValue } from 'react-native-responsive-fontsize'
import { authApi,apiUrl } from '@/functions/axios'
import { ChevronHeader,ColoredHeader } from '@/components/Header'
import { Slogan,InputField,InputType,SubmitBtn, emailRegex } from '@/components/Element'
import { useRegister, } from '@/store/auth'
import { useRouter } from 'expo-router'
import { useAuth } from '@/store/auth'
import * as Location from "expo-location";
import { AuthLayOut } from '@/components/LayOut'
import { CircleLoader } from '@/components/ui/Loader'
import { errorOne } from '@/custom'


const partTwo = () => {
 const {setResponseMessage,setIsError}= useAuth()
 
  const {registerData,setRegisterData}=useRegister()
  const [isSubmitClicked,setIsSubmitClicked]=useState<boolean>(false)
  const [isLoading,setIsLoading]=useState<boolean>(false)
  const instance="registeration"
const router=useRouter()


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
  isSubmitClicked,
     type:"email",
 instance
    
    }

  },

  {
    _id:2,
    params:{
 label:'First Name',
  text:registerData.firstName,
  icon:"account-outline",
  setText:(value:string)=>setRegisterData({...registerData,firstName:value}),
 isSubmitClicked,
 type:"text",
 instance
    }

  },

    {
    _id:3,
    params:{
 label:'Last Name',
  text:registerData.lastName,
  icon:"account-outline",
  setText:(value:string)=>setRegisterData({...registerData,lastName:value}),
 isSubmitClicked,
      type:"text",
       instance
    
    }

  },


]





  const getLocationAndAddress = async (): Promise<{
  address?: Location.LocationGeocodedAddress;
  currentLocation?: Location.LocationObject;
}> => {
  try {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setResponseMessage("Location access denied. Please enable permission to continue.");
    return { address: undefined, currentLocation: undefined };
    }

    let currentLocation = await Location.getCurrentPositionAsync({});
    let reverseGeocoded = await Location.reverseGeocodeAsync({
      latitude: currentLocation.coords.latitude,
      longitude: currentLocation.coords.longitude,
    });

    return { 
      address: reverseGeocoded[0], 
      currentLocation 
    };
  } catch (error) {
    setIsError(true);
    setResponseMessage("Error retrieving location");
    return { address: undefined, currentLocation: undefined };
  }
};










const handleSubmit=async()=>{
    
  setIsSubmitClicked(true)


const isEmailCorrect=emailRegex.test(registerData.email)

if (!isEmailCorrect  ){

   throw Error('Incorrect email format')

}



if (!registerData.firstName || !registerData.lastName || !registerData.telephone || !registerData.prefix){

 
  throw Error('this field cant be empty')
}



   
setIsLoading(true)

const gottenParams= await getLocationAndAddress()

const {address,currentLocation} =gottenParams


 console.log(address,'address',currentLocation)
if (address?.country && currentLocation?.coords){

 if (address.country!==registerData.country){
  setIsLoading(false)
  setResponseMessage('Country mismatch, try again')
   
  return
 }

 
}

else{
  setIsLoading(false)
  setResponseMessage('Error retrieving location')
    return
}


try{
   const data={
    firstName:registerData.firstName,
    lastName:registerData.lastName,
    prefix:registerData.prefix,
   telephone:registerData.prefix+registerData.telephone,
   email:registerData.email,
   password:registerData.password,
   country:registerData.country,
   location:{
    latitude:currentLocation?.coords.latitude,
    longitude:currentLocation?.coords.longitude,
    accuracy:currentLocation?.coords.accuracy,
    timestamp:currentLocation?.timestamp
   }

   }




   setIsLoading(false)
  
  const url=`${apiUrl}/users`

const response=  await authApi.post(url,data,{
        headers: { 'Content-Type': 'application/json' }},)
  console.log(response.data,'sucess re')

  alert('success')
  
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
      <ColoredHeader type='normal' text={'Personal Details'}/>
      <Slogan  text={'Your Informations are safe with us'}/>

    {
      InputArray.map((item,index)=>{
        return (
          <>
 <View style={{marginTop:RFValue(20)}} key={item._id}>
           <InputField {...item.params}/>
          </View>
          
          </>
        )
      })
    }
 

  <View style={{justifyContent:"center",alignItems:"center",width:"100%",marginTop:RFValue(100)}}>
 <SubmitBtn text='Continue' trigger={handleSubmit}  type='normal'/>
  </View>
 
   </AuthLayOut>
  )
}



export default partTwo