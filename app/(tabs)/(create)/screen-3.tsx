import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import { InnerLayOut } from '@/components/LayOut'
import { LightHeader,ColoredHeader, } from '@/components/Header'
import { Slogan,SubmitBtn,InputField } from '@/components/Element'

const index = () => {


const handleSubmit=()=>{

}


  return (
    <InnerLayOut>
   <LightHeader text={'List Business'}/>
   <ColoredHeader text='Add contact details for the business you’re listing' type='black'/>
   <Slogan text='Add contact details for Tony EnterpriseS to help customers contact them'/>


<View style={styles.inputContainer}>
 <InputField label="Phone Number"/>
</View>

<View style={styles.inputContainer}>
 <InputField label="Phone Number"/>
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
   }
})

export default index