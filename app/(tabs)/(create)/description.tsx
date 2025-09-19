import { View, Text,StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { InnerLayOut } from '@/components/LayOut'
import { LightHeader,ColoredHeader, } from '@/components/Header'
import { Slogan,standardHeight,ButtonWithSkip,DescriptionField } from '@/components/Element'
import { RFValue } from 'react-native-responsive-fontsize'
import { useBusiness } from '@/store/business'
import { useRouter } from 'expo-router'






const index = () => {
const {business,setBusiness}=useBusiness()

const [isActive,setIsActive] =useState<boolean>(false)
const [isSubmitClicked,setIsSubmitClicked] =useState<boolean>(false)
const router=useRouter()


const handleSubmit=()=>{

  setIsSubmitClicked(true)
  if (!isActive) return
 router.push('/(tabs)/(create)/website')

}

const skipFunction=()=>{


 router.push('/(tabs)/(create)/website')

}



const params={
  skipFunction:skipFunction,
  continueFunction:handleSubmit,
  isActive:isActive,
}


useEffect(()=>{

  if (business.description){
    setIsActive(true)
  }

  else{
    setIsActive(false)
  }

},[business.description])



  return (
    <InnerLayOut>
   <LightHeader text={'List Business'}/>
   <ColoredHeader text='Add a brief description of the business.' type='black'/>
 <Slogan  text={'Add a brief description of your business and what makes it unique.'}/>



<View style={styles.inputContainer}>
 <DescriptionField isSubmitClicked={isSubmitClicked}  setText={(value)=>setBusiness({...business,description:value})}     text={business.description} placeholder="Tell customers what’s special about your business and why people should choose you"/>
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