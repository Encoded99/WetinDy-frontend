import { View, Text,StyleSheet,Dimensions } from 'react-native'
import React from 'react'
import { InnerLayOut } from '@/components/LayOut'
import { LightHeader,ColoredHeader, } from '@/components/Header'
import { Slogan,SubmitBtn,InputField } from '@/components/Element'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { RFValue } from 'react-native-responsive-fontsize'


const {width}=Dimensions.get('window')


const index = () => {


const handleSubmit=()=>{

}


  return (
    <InnerLayOut>
   <LightHeader text={'List Business'}/>


 <InputField label="Business Name"/>


 <View style={styles.contentContainer}>


  <View style={styles.modal}>

    <View style={{justifyContent:'flex-start',marginRight:0,width:'15%'}}>
       <MaterialCommunityIcons color={'#FEAA34'} size={0.08*width} name='alert-circle-outline'/>
    </View>

       <View style={{justifyContent:'flex-start',width:'75%'}}>
    <Text style={styles.modalText}>
      Please only suggest business that you know exist. All submissions are subject to reviews before appearing on the app. Business owners may later claim their business and provide official details. False or misleading submission will be removed.
    </Text>
    </View>
   
   

  </View>

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
   modal:{
    width:'100%',
    paddingHorizontal:'2%',
    paddingVertical:20,
    justifyContent:'center',
    alignItems:'flex-start',
    backgroundColor:'#FEAA341A',
    marginBottom:30,
    flexDirection:'row',
     borderRadius:10,
     

   },
   modalText:{
    fontFamily:'Poppins-Regular',
    textAlign:'justify',
    fontSize:RFValue(10)
   

   }
})

export default index