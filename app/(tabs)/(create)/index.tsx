import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import { InnerLayOut } from '@/components/LayOut'
import { LightHeader,ColoredHeader, } from '@/components/Header'
import { Slogan,SubmitBtn } from '@/components/Element'
import { useBusiness } from '@/store/business'
import { useRouter } from 'expo-router'

const index = () => {
  const router=useRouter()
const {setBusiness}=useBusiness()
const isActive=true
const handleSubmit=(param:'owner'|'other')=>{

if (param==='owner'){
  setBusiness({isPostedByOwner:true})
}

else{
  setBusiness({isPostedByOwner:false})

}


router.push('/(tabs)/(create)/name')




}


  return (
    <InnerLayOut>
   <LightHeader text={'List Business'}/>
   <ColoredHeader text='Are you listing the business for yourself or for someone else?' type='black'/>
 <Slogan  text={'You can register a business for yourself or on behalf of someone.'}/>

 <View style={styles.contentContainer}>


<View style={styles.btnContainer}>
  <SubmitBtn isActive={isActive} type='normal' trigger={()=>handleSubmit('owner')} text='Register for Myself' />
</View>

<View style={styles.btnContainer}>
  <SubmitBtn isActive={isActive}  type='white' trigger={()=>handleSubmit('other')} text='Register for Someone Else' />
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

export default index