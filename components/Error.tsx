import { View, Text,StyleSheet,ScrollView, Pressable } from 'react-native'
import { useGlobal } from '@/app/context'
import { RFValue } from 'react-native-responsive-fontsize'
import { standardHeight } from './Element'
import { primary } from '@/custom'


export const ErrorComponent=({errorMessage,onRetry}:{errorMessage?:string,onRetry:()=>void})=>{
  const {textColor}=useGlobal()

 return (
  <>

  <View style={styles.errorContainer}>

   <Text style={[styles.headerText,{color:textColor}]}>Couldn't load content</Text>
   <Text style={[styles.smallerText,{color:textColor}]}>Something went wrong, please try again</Text>

   <Pressable style={styles.btn} onPress={onRetry}>
    <Text style={{color:"white",fontFamily:"Poppins-Bold",fontSize:RFValue(15)}}>Try Again</Text>
   </Pressable>

  </View>
  
  </>
 )
}

const styles=StyleSheet.create({
 errorContainer:{
  width:'95%',
  height:400,
  justifyContent:'center',
  alignItems:'center',
  alignSelf:"center"
 },
 headerText:{
  fontSize:RFValue(15),
  fontFamily:'Poppins-Bold',

 },

 smallerText:{
  fontSize:RFValue(15),
  fontFamily:'Poppins-Regular',
   marginVertical:20,
   textAlign:"center"
 },
 btn:{
  width:200,
  height:standardHeight,
  borderRadius:10,
  backgroundColor:primary,
  color:'white',
  justifyContent:"center",
  alignItems:'center',
  

 }
})