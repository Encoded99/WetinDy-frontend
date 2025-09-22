import { View,StyleSheet,Text } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { RFValue } from 'react-native-responsive-fontsize'
import { useGlobal } from "@/app/context";
import { useRouter } from "expo-router";
import { title } from "@/custom";
import { primary } from "@/custom";
import { percentagePadding } from "./Element";



export const ChevronHeader=()=>{
const {textColor}=useGlobal()
const router=useRouter()


 return (
  <>
  <View style={styles.chevronContainer}>

   <MaterialCommunityIcons size={RFValue(50)} color={textColor} name='chevron-left'  onPress={()=>router.back()}/>

  </View>
  
  </>
 )

}






export const ColoredHeader=({text,type}:{text:string,type:"normal"|"title"|"black"})=>{
const {textColor}=useGlobal()



 return (
  <>
   <View  style={styles.coloredHeader}>
 
       <Text style={[styles.coloredHeaderText,{color:type==='black'?textColor:primary}]}>
         {text}
         {
          type==='title' && (
           <>
            <Text style={styles.coloredLogo}>  {title}</Text>
           </>
          )
         }
        
       </Text>
 
     </View>
  
  </>
 )

}



export const LightHeader=({text,}:{text:string})=>{
const {textColor}=useGlobal()
const router=useRouter()

 return (
  <>

  
   <View  style={styles.lightHeaderContainer}>
      
   <MaterialCommunityIcons  size={RFValue(50)} color={textColor} name='chevron-left'  onPress={()=>router.back()}/>
      <Text style={[styles.lightHeaderText,{color:textColor}]}>
         {text}
       
       </Text>
 
     </View>
  
  </>
 )

}



const styles= StyleSheet.create({
 chevronContainer:{
  width:'100%',
  flexDirection:'row',
  justifyContent:'flex-start',
  alignItems:"center",

   height:100,

 },

  coloredHeader:{
   
    flexDirection:'row',
    justifyContent:'flex-start',
  
  

  
  },

 coloredHeaderText:{
  fontSize:RFValue(20),

  fontFamily:'Poppins-Bold'
 },

 coloredLogo:{
  fontFamily:'Poppins-Bold',
  fontSize:RFValue(20),
 },

 lightHeaderContainer:{
    width:'100%',
    flexDirection:'row',
   alignItems:"center",
  justifyContent:'flex-start'
 
  },

  lightHeaderText:{
  fontSize:RFValue(24),
  fontFamily:'Poppins-Regular',
  
 },
})