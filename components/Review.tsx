
import { View,StyleSheet,Image,Text, Pressable } from "react-native"
import { RFValue } from "react-native-responsive-fontsize"
import { percentagePadding, standardBorderRadius } from "./Element"
import { useGlobal } from "@/app/context"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { ReviewType } from "@/store/business"
import { getShortTime } from "@/functions/business"
import moment from 'moment-timezone';
import React,{useEffect, useState} from "react"
import { apiUrl,api } from "@/functions/axios"
import { primary } from "@/custom"




export const ReviewModal=({item}:{item:ReviewType})=>{
   const {greyText,textColor,darkGreyText}=useGlobal()
   const [like,setLike]=useState<number>(-1)
   const [dislike,setDisLike]=useState<number>(-1)
  
   const [initialLike,setInitialLike] =useState<number>(item?.like)
   const [intialDisLike,setInitialDisLike]=useState<number>(item?.dislike)

 const now = moment();
 const duration = moment.duration(now.diff(item.createdAt));
 
 
   const shortTime=getShortTime(duration)



const  updateReview=async({param,instance}:{param:number,instance:'like'|'dislike'})=>{


 
 

  try{


     const data={
    like:instance==='like'?item.like+param:undefined,
    dislike:instance==='dislike'?item.dislike+param:undefined,
   }

   const url=`${apiUrl}/reviews/update-review/${item?._id}`

  await api.patch(url,data)






  }
catch(err:any){


console.log(err?.response?.data,'error gotten')

  

}

finally{

  

}
}






 return (
  <>
  <View style={[styles.modalContainer,{borderColor:textColor}]}>
     <View style={styles.profileContainer}>
      <Image style={styles.image} source={{uri:item?.user?.image?.url}}/>
      <View style={{marginLeft:RFValue(10)}}>
        <Text style={{color:textColor,fontSize:RFValue(16),fontFamily:"Poppins-Bold"}}>{item?.user?.firstName} {item?.user?.lastName}</Text>
        <Text style={{color:darkGreyText,fontSize:RFValue(14),fontFamily:"Poppins-Bold"}}>{item?.user?.reviewNo} reviews</Text>
      </View>

     </View>

     <View style={styles.starContainer}>

      {
       Array.from({length:item?.ratings}).map((item,index)=>{
        return (
         <>
         <MaterialCommunityIcons size={RFValue(18)} color={darkGreyText}  name="star"/>
         </>
        )
       })
      }

      <Text style={{color:textColor,fontSize:RFValue(12),fontFamily:"Poppins-Regular",marginLeft:RFValue(5)}}>{shortTime}</Text>

     </View>
     <View style={styles.textContainer}>
          <Text style={[styles.text,{color:textColor}]}>{item?.content}</Text>
     </View>

     <View style={styles.buttonContainer}>

                <View style={styles.btnTextContainer}>
                   <Pressable style={[styles.btn,{borderColor:textColor}]}
                   
                    
                   onPress={async()=>{
                       if (like===-1){
                        setLike(1)
                         await  updateReview({param:1,instance:"like"})
                      }
                      else{
                        setLike(-1)
                       await   updateReview({param:-1,instance:"like"})
                      }

                  
                      setInitialLike((prev)=>prev-like)
                  
                   }}
                   
                   >
             <MaterialCommunityIcons size={RFValue(25)} color={like===-1? textColor:primary} name="thumb-up-outline"/></Pressable>
                  <Text style={{color:darkGreyText,fontSize:RFValue(14),fontFamily:"Poppins-Bold"}}>{initialLike} likes</Text>

                </View>
               <View style={styles.btnTextContainer}>
                   <Pressable style={[styles.btn,{borderColor:textColor}]}
                   
                   onPress={async()=>{
                      

                      if (dislike===-1){
                        setDisLike(1)
                         await   updateReview({param:1,instance:"dislike"})
                      }
                      else{
                         setDisLike(-1)
                        await   updateReview({param:-1,instance:"dislike"})
                      }

                   
                      
                       setInitialDisLike((prev)=>prev-dislike)

                   }}
                   
                   >
             <MaterialCommunityIcons size={RFValue(25)} color={dislike===-1? textColor:primary} name="thumb-down-outline"/></Pressable>
                  <Text style={{color:darkGreyText,fontSize:RFValue(14),fontFamily:"Poppins-Bold"}}>{intialDisLike} dislikes</Text>

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
  backgroundColor:"greya"

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