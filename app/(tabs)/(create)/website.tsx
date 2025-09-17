import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import { InnerLayOut } from '@/components/LayOut'
import { LightHeader,ColoredHeader, } from '@/components/Header'
import { Slogan,SubmitBtn,InputField,wantedHeight,ButtonWithSkip } from '@/components/Element'
import { RFValue } from 'react-native-responsive-fontsize'

const index = () => {


const handleSubmit=()=>{

}


const params={
  skipFunction:handleSubmit,
  continueFunction:handleSubmit,
}

  return (
    <InnerLayOut>
   <LightHeader text={'List Business'}/>
   <ColoredHeader text='Does Tony Enterprise have a business website?' type='black'/>
 <Slogan  text={'Add a website for others user to learn more about the business'}/>



<View style={styles.inputContainer}>
 <InputField label="Website Link"/>
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
    height:wantedHeight,
    backgroundColor:'red',
     padding:'2%',

   }
})


export default index