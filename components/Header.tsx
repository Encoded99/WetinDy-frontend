import { View,StyleSheet,Text } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { RFValue } from 'react-native-responsive-fontsize'
import { useGlobal } from "@/app/context";
import { useRouter } from "expo-router";
import { title } from "@/custom";
import { primary } from "@/custom";


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


export const ColoredHeader=({text,type}:{text:string,type:"normal"|"title"})=>{
const {textColor}=useGlobal()



 return (
  <>
   <View  style={styles.coloredHeader}>
 
       <Text style={[styles.coloredHeaderText,]}>
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



const styles= StyleSheet.create({
 chevronContainer:{
  width:'100%',
  flexDirection:'row',
  justifyContent:'flex-start',
  alignItems:"center",
  height:80,

 },

  coloredHeader:{
    width:'100%',
    flexDirection:'row',
    justifyContent:'flex-start',
    paddingLeft:"4%"
  },

 coloredHeaderText:{
  fontSize:RFValue(25),
  color:primary,
  fontFamily:'Poppins-Bold'
 },

 coloredLogo:{
  fontFamily:'Poppins-Bold',
  fontSize:RFValue(25),
 }
})