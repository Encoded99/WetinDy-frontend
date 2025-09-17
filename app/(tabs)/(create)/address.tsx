import { View, StyleSheet,Text,ScrollView } from 'react-native'
import React,{useEffect, useState} from 'react'
import { InnerLayOut } from '@/components/LayOut'
import { LightHeader,ColoredHeader, } from '@/components/Header'
import { Slogan,SubmitBtn,InputField,wantedHeight,SmallInputField,InputType } from '@/components/Element'
import { RFValue } from 'react-native-responsive-fontsize'
import { useBusiness } from '@/store/business'
import { useRouter } from 'expo-router'




const index = () => {
  const {business,setBusiness}=useBusiness()
  const [isSubmitClicked,setIsSubmitClicked]=useState<boolean>(false)
   const [isActive,setIsActive]=useState<boolean>(false)
const router=useRouter()

const instance="registeration"

const handleSubmit=()=>{
  setIsSubmitClicked(true)
  console.log(business.address,'address')

}


const streetParams:InputType={
 label:'Street address',
  text:business.address.street,
  setText:(value:string)=>setBusiness({...business,address:{...business.address,street:value}}), 
   isSubmitClicked, 
   type:"text",
instance:'registeration'
    }

    const cityParams:InputType={
 label:'City',
  text:business.address.city,
  setText:(value:string)=>setBusiness({...business,address:{...business.address,city:value}}), 
   isSubmitClicked, 
   type:"text",
instance:'registeration'
    }


     const provinceParams:InputType={
 label:'Province/Region/State',
  text:business.address.stateOrRegion,
  setText:(value:string)=>setBusiness({...business,address:{...business.address,stateOrRegion:value}}), 
   isSubmitClicked, 
   type:"text",
instance:'registeration'
    }


       const postalParams:InputType={
 label:'Street address',
  text:business.address.postalCode,
  setText:(value:string)=>setBusiness({...business,address:{...business.address,postalCode:value}}), 
   isSubmitClicked, 
   type:"text",
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
 
   <ScrollView
   showsVerticalScrollIndicator={false}

   >

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