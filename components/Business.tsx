import { View,StyleSheet,Text,Dimensions,Image,Pressable} from 'react-native'
import { BusinessType } from '@/store/business'
import { RFValue } from 'react-native-responsive-fontsize'
import { MaterialCommunityIcons,Ionicons } from '@expo/vector-icons'
import { FinalBusinessType } from '@/store/business'
import { useRouter } from 'expo-router'
import { useGlobal } from '@/app/context'
import { percentagePadding } from './Element'




const {height}=Dimensions.get('window')






export const BusinessBannerItem=({item,textColor}:{item:FinalBusinessType,textColor:string})=>{

const ratings=Math.round(item.ratings/item.noOfRatings)


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


       {
         Array.from({length:5}).map((star,index)=>{

            const isThreshold= index+1<=ratings
            return (
               <View key={index}>
              <MaterialCommunityIcons
              
              name="star" 
             size={RFValue(25)} 
             color={isThreshold?"gold":"grey"}
              
              
              
              /> 
               </View>
            )
         })
       }


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






interface GlobalContextType {
  background: string;
  greyBackground: string;
  textColor: string;
  greyText: string;
  darkGreyText: string;
  setMode: React.Dispatch<React.SetStateAction<'light' | 'dark'>>;
}









export const BusinessRenderItem=({item,global}:{item:FinalBusinessType,global:GlobalContextType})=>{

   const {textColor,darkGreyText}=global

   

const ratings=Math.round(item.ratings/item.noOfRatings)


   const router=useRouter()

const handlePress=()=>{
   router.push(`/(tabs)/(home)/(discover)/${item._id}`)
}

 return (
  <>
        <Pressable
        style={[styles.modalContainer,]}
        onPress={handlePress}
        >
        <Image style={styles.modalImage}
           source={{ uri: item?.image[2]?.url }}
        
        
        />

        <View style={styles.modalBottom}>
           <View style={styles.firstBottomLine}>

              <View style={styles.modalStarContainer}>
                    <View style={{maxWidth:"80%"}}>
                <Text numberOfLines={1} style={[styles.headerName,{color:textColor}]}>{item.name}</Text>
                    </View>
                   
                   <MaterialCommunityIcons style={{marginLeft:"2%"}}  size={RFValue(20)} color={'green'} name='check-circle'/>
              </View>
          



           <View style={styles.modalStarContainer}>


        {
         Array.from({length:5}).map((star,index)=>{

            const isThreshold= index+1<=ratings
            return (
               <View key={index}>
              <MaterialCommunityIcons
              
              name="star" 
             size={RFValue(20)} 
             color={isThreshold?"gold":"grey"}
              
              
              
              /> 
               </View>
            )
         })
       }
       {
         ratings>0 && (
            <>
           <Text style={[styles.ratingText, {color:textColor}]}>{ratings}</Text> 
            </>
         )
       }
     
       
          <Text style={[styles.reviewText, {color:darkGreyText}]}>{`(${item.noOfRatings} reviews)`}</Text>


              

           </View>

           <View style={styles.modalStarContainer}>

             <MaterialCommunityIcons
              
            name='map-marker'
             size={RFValue(18)} 
             color={textColor}

              />
        
      
       
          <Text style={[styles.reviewText, {color:textColor,fontFamily:"Poppins-Bold"}]}>{item.address.city}</Text>


              

           </View>

           </View>

           
           

        </View>


        </Pressable>
      
        

  
    
  
  </>
 )
}
























const standardBorder=10
export const styles=StyleSheet.create({



   modalContainer:{
      width:'100%',
     
    borderRadius: standardBorder,       
    justifyContent:"flex-start",
 
     marginVertical:RFValue(10), 

 shadowColor: '#000',         // shadow color
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.15,          // adjust for lighter/darker shadow
  shadowRadius: 2,
borderWidth: 0.5,
  // Android shadow
 
borderColor: 'rgba(0,0,0,0.2)', 
   },





 modalImage:{
      width:'100%',
borderTopLeftRadius: standardBorder, 
borderTopRightRadius: standardBorder,   

   alignSelf:'center',
    height:RFValue(200),
   },



  modalBottom:{
   width:'100%',
 padding:'2%',
   flexDirection:"row",
   justifyContent:'center',
   alignItems:"center",
borderBottomLeftRadius: standardBorder, 
borderBottomRightRadius: standardBorder, 
  },




 headerName:{
   fontSize:RFValue(15),
   fontFamily:"Poppins-Bold"

 },



  firstBottomLine:{
   flex:1,


  },




modalStarContainer:{
   width:'100%',
   flexDirection:"row",

},

ratingText:{
   fontFamily:"Poppins-Bold",
   fontSize:RFValue(13),
   marginLeft:'2%'

},

reviewText:{
   fontFamily:"Poppins-Regular",
   fontSize:RFValue(13),
   marginLeft:'2%'

},








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