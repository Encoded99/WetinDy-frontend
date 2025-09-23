import { View,StyleSheet,Text,Dimensions,Image,Pressable} from 'react-native'
import { BusinessType } from '@/store/business'
import { RFValue } from 'react-native-responsive-fontsize'
import { MaterialCommunityIcons,Ionicons } from '@expo/vector-icons'
import { FinalBusinessType } from '@/store/business'
import { useRouter } from 'expo-router'




const {height}=Dimensions.get('window')






export const BusinessRenderItem=({item,textColor}:{item:FinalBusinessType,textColor:string})=>{

   const router=useRouter()

const handlePress=()=>{
   router.push(`/(tabs)/(home)/(discover)/${item._id}`)
}

 return (
  <>
        <Pressable
        style={styles.feedModalContainer}
        onPress={handlePress}
        >
        <Image 
          source={{ uri: item?.image[0]?.url }}
        
        style={styles.image}/>

         <View style={styles.textOverlay}>
            <Text numberOfLines={1} style={styles.feedHeader}>
             {item.name}
            </Text>
             <Text numberOfLines={1} style={styles.feedAddress}>
             {item.address.street}
            </Text>
     

             <View style={styles.arrowLinkContainer}>
                     <MaterialCommunityIcons 
  name="star" 
  size={25} 
  color="gold" 
/>
    <MaterialCommunityIcons 
  name="star" 
  size={25} 
  color="gold" 
/>
    <MaterialCommunityIcons 
  name="star" 
  size={25} 
  color="gold" 
/>
  <MaterialCommunityIcons 
  name="star" 
  size={25} 
  color="grey" 
/>
             </View>



             <View style={styles.arrowLinkContainer}>

               <Text style={styles.linkText}>View business </Text>

               <Ionicons size={RFValue(23)} color={'white'} name='arrow-forward'/>
             </View>
            
         </View>

        </Pressable>
      
        

  
    
  
  </>
 )
}











const standardBorder=10
export const styles=StyleSheet.create({
   feedModalContainer:{
    width:'100%',
    height:RFValue(300),
    marginVertical:RFValue(10),
    alignSelf:'center',
    borderRadius:standardBorder,
   
 
    
   },

   image:{
      width:'100%',
      height:'100%',
      borderRadius:standardBorder,
   },

   textOverlay:{
      width:'100%',
      backgroundColor:'hsla(210, 50%, 50%, 0.3)',
      position:'absolute',
      bottom:0,
       padding:'4%',
       borderBottomLeftRadius:standardBorder,
       borderBottomRightRadius:standardBorder
   },

   feedHeader:{
      fontFamily:"Poppins-Bold",
      color:'white',
      fontSize:RFValue(25),
     
   },

    feedAddress:{
      fontFamily:"Poppins-Bold",
      color:'white',
      fontSize:RFValue(14),
   
   },
   
starText:{
   fontSize:RFValue(15),
   marginVertical:'3%'
},
linkText:{
   fontSize:RFValue(13),
    fontFamily:"Poppins-Bold",
      color:'white',
},

arrowLinkContainer:{
   flexDirection:'row',
   width:'100%',
   alignItems:'center'
}



   
})