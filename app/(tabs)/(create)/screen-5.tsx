import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import { InnerLayOut } from '@/components/LayOut'
import { LightHeader,ColoredHeader, } from '@/components/Header'
import { Slogan,SubmitBtn,InputField,wantedHeight } from '@/components/Element'

const index = () => {


const handleSubmit=()=>{

}


  return (
    <InnerLayOut>
   <LightHeader text={'List Business'}/>
   <ColoredHeader text='What is the business address?' type='black'/>
 <Slogan  text={'What is the business address?'}/>



<View style={styles.inputContainer}>
 <InputField label="Street address"/>
</View>

<View style={styles.inputContainer}>
 <InputField label="City"/>
</View>


<View  style={styles.smallInput}>

</View>


 <View style={styles.contentContainer}>







<View style={styles.btnContainer}>
  <SubmitBtn type='normal' trigger={handleSubmit} text='Continue' />
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
    marginVertical:10
   },
   smallInput:{
    width:'100%',
    height:wantedHeight,
    backgroundColor:'red',
     padding:'2%',

   }
})


export default index