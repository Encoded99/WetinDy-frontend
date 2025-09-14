import { View, Text,StyleSheet,Dimensions } from 'react-native'
import React,{useEffect, useState} from 'react'
import {title,primary} from '../custom'
import { RFValue } from 'react-native-responsive-fontsize'
import { useGlobal } from './context'
import { useFonts } from '../fontConfig'
import { SubmitBtn } from '@/components/Element'
import { useRouter } from 'expo-router'


const index = () => {

const {fontLoaded}= useFonts()
const {textColor,background,greyText,darkGreyText}=useGlobal()


const router= useRouter()


const handleSubmit=()=>{
  router.push('/(auth)/(register)')
}


useEffect(()=>{

const t=setTimeout(() => {
//  router.push('/(auth)/(sign-in)/otp')
 router.push('/(tabs)/(create)/screen-4')
}, (500));

  return ()=>clearTimeout(t)

},[])





if (!fontLoaded){

    return (
      <>
      
       <View  style={[styles.container,{backgroundColor:background}]}>
     
     
        
    </View>
      </>
    )

  }


  return (
    <View  style={[styles.container,{backgroundColor:background}]}>
    <Text style={[styles.heading,{color:textColor}]}>Welcome to <Text style={styles.logo}>{title}</Text></Text>

       <View style={[styles.btnContainer,styles.topBtnContainer]}>
             <SubmitBtn type='normal' text={'Continue with Phone'} icon='phone' trigger={handleSubmit}>

        </SubmitBtn>
        </View>


        

        <View style={styles.lineContainer}>
        <View style={[styles.line,{backgroundColor:greyText,}]}>

          </View>

            <View style={{paddingHorizontal:'2%'}}>
              <Text style={{color:darkGreyText,fontSize:RFValue(13),fontFamily:'Inter-Semi-Bold',textAlign:"center"
              }}>Or Continue With</Text>
          </View>

           <View style={[styles.line,{backgroundColor:greyText,}]}>

          </View>
        </View>

         <View style={styles.btnContainer}>
             <SubmitBtn type='white' text={'Continue with Google'} icon="google" trigger={handleSubmit}>

        </SubmitBtn>
        </View>

         <View style={styles.btnContainer}>
             <SubmitBtn type='white' text={'Continue with Facebook'} icon="facebook" trigger={handleSubmit}>

        </SubmitBtn>
        </View>
        
         <View style={styles.btnContainer}>
             <SubmitBtn type='white' text={'Continue with Apple'} icon="apple" trigger={handleSubmit}>

        </SubmitBtn>
        </View>


      <Text style={[styles.lastText,{color:darkGreyText}]}>
        Need help? Contact us at (+22) 678-2733
        </Text>
    </View>
  )
}


const styles=StyleSheet.create({
  container:{
    flex:1,
    width:"100%",
    padding: RFValue(10)
  },
  heading:{
   fontSize:RFValue(25),
   fontFamily:'Poppins-Bold',
   textAlign:"center",
   marginTop:RFValue(55)

  },
  logo:{
    fontSize:RFValue(25),
    fontFamily:'Lora',
    color:primary,
  },
  btnContainer:{
    width:"100%",
    justifyContent:'center',
    alignItems:"center",
   marginVertical: RFValue(20)
  },

  topBtnContainer:{


     marginTop: RFValue(40),
    marginBottom: RFValue(40)

  },


  lineContainer:{
    width:"100%",
    flexDirection:"row",
    justifyContent:'center',
    alignItems:'center'

  },
  line:{
    height:1.5,
    width:"25%",
  },
  lastText:{
   fontFamily:'Poppins-Bold',
   fontSize:RFValue(12),
  textAlign:"center",
  marginTop: RFValue(20)

  }
})

export default index