
import { useAuth } from "@/store/auth"
import { useGlobal } from "@/app/context";
import { StyleSheet,View,Modal,Dimensions,Pressable,Text} from 'react-native';
import { primary } from "@/custom";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import React,{useEffect} from 'react'


const {height,width}=Dimensions.get('window')

export const ResponseModal=()=>{
const {background,textColor}=useGlobal()
 const  {responseMessage,setResponseMessage,isError,setIsError} = useAuth()
const isMessage=responseMessage!==''?true:false



useEffect(()=>{

 const t= setTimeout(() => {
   setResponseMessage('')
   setIsError(false)
 
 },1500);


 return ()=>clearTimeout(t)

},[])



 return (
  <>

   <Modal
       visible={isMessage}
       animationType='slide'
       transparent={true}
      >
<Pressable style={styles.responseOverlay} onPress={()=>setResponseMessage('')}>

 <View style={[styles.responseModal,{backgroundColor:background}]}>
 <View style={styles.innerModal}>
    <View style={styles.logoContainer}>
   <MaterialCommunityIcons  color={isError?'red':'green'} size={RFValue(20)} name='alert-circle-outline'/>
    </View>
 
        <View style={{width:"70%"}}>
  <Text style={{color:textColor,fontFamily:'Poppins-Bold',fontSize:RFValue(12)}}>{responseMessage}</Text>
        </View>
  
  <Pressable style={styles.logoContainer} onPress={()=>setResponseMessage('')}>
    <MaterialCommunityIcons color={textColor} size={RFValue(20)} name='close'/>
    </Pressable>
    
 </View>
 </View>

</Pressable>

      </Modal>
  </>
 )
}


const styles=StyleSheet.create({
 responseOverlay:{
  width:width,

  height:height,

 },
 responseModal:{
   width:'90%',
   alignSelf:'center',
   borderRadius:6,
  minHeight:60,
   marginTop:'15%',
    shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
  borderLeftWidth:12,
  borderLeftColor:primary,

  flexDirection:'row',
  justifyContent:'flex-end'

 },
 innerModal:{
  flexDirection:'row',
  justifyContent:'center',
  alignItems:'center',
  width:'98%',
  paddingVertical:10

 },
 logoContainer:{
  width:"15%",
    justifyContent:'center',
  alignItems:'center',
 }
})