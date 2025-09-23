import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import { InnerLayOut } from '@/components/LayOut'
import { LightHeader,ColoredHeader, } from '@/components/Header'
import { SubmitBtn } from '@/components/Element'
import { useBusiness } from '@/store/business'
import { useRouter } from 'expo-router'

const claim = () => {
  const router=useRouter()
const {setBusiness}=useBusiness()
const isActive=true
const handleSubmit=()=>{

 setBusiness({isPostedByOwner:true})

router.push('/(tabs)/(create)/name')




}


  return (
    <InnerLayOut>
   <LightHeader text={'List Business'}/>
   <ColoredHeader text='Are you sure you are the owner of Tony Enterprise?' type='black'/>

 <View style={styles.contentContainer}>


<View style={styles.btnContainer}>
  <SubmitBtn isActive={isActive} type='normal' trigger={()=>handleSubmit()} text='Proceed with Claim' />
</View>




 </View>

    </InnerLayOut>

  )
}

const styles=StyleSheet.create({
   contentContainer:{
    flex:1,
    justifyContent:'flex-end',
    
   },
   btnContainer:{
    width:'100%',
    alignItems:'center',
    marginTop:20,
    marginBottom:20
   }
})

export default claim