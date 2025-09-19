import { View, Text,StyleSheet,ScrollView } from 'react-native'
import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import { SubmitBtn } from '@/components/Element'
import { useRouter } from 'expo-router'
import { title,primary } from '@/custom'
import { useGlobal } from '../context'








const index = () => {


const {textColor,background,greyText,darkGreyText}=useGlobal()
const isActive=true
const router= useRouter()


const handleSubmit=()=>{
  router.push('/(auth)/(register)')

}




  return (
    <ScrollView  style={[styles.container,{backgroundColor:background}]}>
    <Text style={[styles.heading,{color:textColor}]}>Welcome to <Text style={styles.logo}>{title}</Text></Text>

       <View style={[styles.btnContainer,styles.topBtnContainer]}>
             <SubmitBtn isActive={isActive} type='normal' text={'Continue with Phone'} icon='phone' trigger={handleSubmit}>

        </SubmitBtn>
        </View>

        <View style={[styles.btnContainer,styles.topBtnContainer]}>
             <SubmitBtn isActive={isActive} type='normal' text={'Log In'}  trigger={()=>router.push('/(auth)/(sign-in)')}>

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
             <SubmitBtn isActive={isActive} type='white' text={'Continue with Google'} icon="google" trigger={handleSubmit}>

        </SubmitBtn>
        </View>

         <View style={styles.btnContainer}>
             <SubmitBtn  isActive={isActive} type='white' text={'Continue with Facebook'} icon="facebook" trigger={handleSubmit}>

        </SubmitBtn>
        </View>
        
        


      <Text style={[styles.lastText,{color:darkGreyText}]}>
        Need help? Contact us at (+22) 678-2733
        </Text>
    </ScrollView>
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


     marginTop: RFValue(20),
    marginBottom: RFValue(20)

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