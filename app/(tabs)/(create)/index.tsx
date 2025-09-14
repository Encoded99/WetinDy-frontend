import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import { InnerLayOut } from '@/components/LayOut'
import { LightHeader,ColoredHeader, } from '@/components/Header'
import { Slogan,SubmitBtn } from '@/components/Element'

const index = () => {


const handleSubmit=()=>{

}


  return (
    <InnerLayOut>
   <LightHeader text={'List Business'}/>
   <ColoredHeader text='Are you listing the business for yourself or for someone else?' type='black'/>
 <Slogan  text={'You can register a business for yourself or on behalf of someone.'}/>

 <View style={styles.contentContainer}>


<View style={styles.btnContainer}>
  <SubmitBtn type='normal' trigger={handleSubmit} text='Register for Myself' />
</View>

<View style={styles.btnContainer}>
  <SubmitBtn type='white' trigger={handleSubmit} text='Register for Someone Else' />
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
   }
})

export default index