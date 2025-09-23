
import { View,StyleSheet,Image,Text, Pressable } from "react-native"
import { RFValue } from "react-native-responsive-fontsize"
import { percentagePadding, standardBorderRadius } from "./Element"
import { useGlobal } from "@/app/context"
import { MaterialCommunityIcons } from "@expo/vector-icons"


export const ReviewModal=()=>{
   const {greyText,textColor,darkGreyText}=useGlobal()

 return (
  <>
  <View style={[styles.modalContainer,{borderColor:textColor}]}>
     <View style={styles.profileContainer}>
      <Image style={styles.image} source={{uri:''}}/>
      <View style={{marginLeft:RFValue(10)}}>
        <Text style={{color:textColor,fontSize:RFValue(16),fontFamily:"Poppins-Bold"}}>Ismail Umar</Text>
        <Text style={{color:darkGreyText,fontSize:RFValue(14),fontFamily:"Poppins-Bold"}}>8 reviews</Text>
      </View>

     </View>

     <View style={styles.starContainer}>

      {
       Array.from({length:5}).map((item,index)=>{
        return (
         <>
         <MaterialCommunityIcons size={RFValue(18)} color={darkGreyText}  name="star"/>
         </>
        )
       })
      }

      <Text style={{color:textColor,fontSize:RFValue(12),fontFamily:"Poppins-Regular",marginLeft:RFValue(5)}}>8 months ago</Text>

     </View>
     <View style={styles.textContainer}>
          <Text style={[styles.text,{color:textColor}]}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam in cupiditate, consectetur possimus illo nobis ratione doloribus ipsa quia error sequi. Adipisci vel nihil aliquam velit iusto corrupti aspernatur maiores debitis libero nisi porro, modi cum doloremque facilis dignissimos maxime.</Text>
     </View>

     <View style={styles.buttonContainer}>

                <View style={styles.btnTextContainer}>
                   <Pressable style={[styles.btn,{borderColor:textColor}]}>
             <MaterialCommunityIcons size={RFValue(25)} color={textColor} name="thumb-up-outline"/></Pressable>
                  <Text style={{color:darkGreyText,fontSize:RFValue(14),fontFamily:"Poppins-Bold"}}>8 likes</Text>

                </View>
               <View style={styles.btnTextContainer}>
                   <Pressable style={[styles.btn,{borderColor:textColor}]}>
             <MaterialCommunityIcons size={RFValue(25)} color={textColor} name="thumb-down-outline"/></Pressable>
                  <Text style={{color:darkGreyText,fontSize:RFValue(14),fontFamily:"Poppins-Bold"}}>8 dislikes</Text>

                </View>
          
     </View>

  </View>
  </>
 )
}



const styles=StyleSheet.create({
 modalContainer:{
  minHeight:RFValue(60),
  padding:percentagePadding,
  borderRadius:standardBorderRadius,
  borderWidth:1,
  width:'100%'
 },
 profileContainer:{
  flexDirection:"row",
  justifyContent:'flex-start',
  alignItems:'flex-start'
 },

 image:{
  height:RFValue(60),
  aspectRatio:1,
  borderRadius:RFValue(60),
  backgroundColor:"red"

 },

 starContainer:{
  width:'100%',
  flexDirection:'row',
  alignItems:"center",
   marginVertical:RFValue(10)
 },
 textContainer:{
  width:'100%',
  marginVertical:RFValue(10)

 },
 text:{
  fontFamily:'Poppins-Regular',
  fontSize:RFValue(15),
  textAlign:'justify'
 },
 buttonContainer:{
  width:'100%',
  justifyContent:'space-around',
  alignItems:'center',
  flexDirection:'row'
 },
 btn:{
  justifyContent:'center',
  alignItems:'center',
  height:RFValue(40),
  padding:RFValue(4),
  borderWidth:1,
  borderRadius:RFValue(20),
  width:"100%"
 },
 btnTextContainer:{
   justifyContent:"center",
   alignItems:"center",
   width:"45%"
 }
})