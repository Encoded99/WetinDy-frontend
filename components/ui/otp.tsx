import { View, Text,StyleSheet,TextInput,Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useGlobal } from '@/app/context'
import { primary } from '@/custom'
import { RFValue } from 'react-native-responsive-fontsize'
const {width}=Dimensions.get('window')

const OtpComponent = () => {
  const [number,setNumber]=useState<string>('')
 const {background,greyBackground,textColor}=useGlobal()

  
const handleText = (value: string, i: number) => {
    setNumber((prev) => {
      const arr = prev.split("");
      arr[i] = value; // replace the character at index
      return arr.join("");
    });
  };


  return (

   <>
   
   <View style={styles.otpContainer}>
     


{
       Array.from({length:4},(_,i)=>{

      const isFilled=number.length>i

        return (
         <>
          <TextInput
        style={[styles.input,{backgroundColor:isFilled?background:greyBackground,borderColor:isFilled?primary:greyBackground,color:textColor}]}
       value={number[i]}
       onChangeText={(value)=>handleText(value,i)}
       maxLength={1}
        keyboardType="numeric"
       />
         </>
        )
       } )}
     

     
    </View>
   
   
    <Text style={[styles.commentText,{color:textColor,}]}>
       Didn’t receive code?
       <Text style={{color:primary,fontFamily:'Poppins-Bold'}}> Resend</Text>
      </Text>
   </>
    
  )
}


const styles= StyleSheet.create({
 otpContainer:{
  width:'90%',
  flexDirection:'row',
  height:width*0.9*0.2,
  alignItems:'center',
  justifyContent:'space-between',
  alignSelf:'center',
  marginVertical:20

 },
 input:{
  borderWidth:2,
  width:'20%',
  height:'100%',
  borderRadius:6,
  fontSize:RFValue(20),
  textAlignVertical: 'center',
  textAlign:'center',
  fontFamily:'Poppins-Bold'
 },
 commentText:{
fontFamily:'Poppins-Regular',fontSize:RFValue(14),textAlign:"center",
marginVertical:50
 }
 


})

export default OtpComponent