import { Text,StyleSheet,Dimensions, TouchableOpacity,View} from 'react-native'
import React from 'react'
import { CategoryType, } from '@/store/business'
import { RFValue } from 'react-native-responsive-fontsize'
import { useGlobal } from '@/app/context'
import { percentagePadding } from './Element'
import {  useRouter } from 'expo-router'
import { useCategory,useBusiness } from '@/store/business'
import { MaterialCommunityIcons } from '@expo/vector-icons'



const {height}=Dimensions.get('window')

// Precompute all paths into a flat array
//const allPaths = country.flatMap((cat) => buildPaths(cat));






  export const CategoryRenderItem=({item,textColor,}:{item:CategoryType,textColor:string})=>{
   const {greyText}=useGlobal()
   const {categoryInstance,setSelectedCategoryData,selectedCategoryData,}=useCategory()
  const {setBusiness,business}=useBusiness()
  const router=useRouter()
 



 const handlePress=async()=>{



if (item.subcategories.length===0){





  switch(categoryInstance){



    case  'category-2':


  setBusiness({categories:{...business.categories,categoryTwo:item._id}})
      break;
    case 'category-3':
       setBusiness({categories:{...business.categories,categoryThree:item._id}})
      break;
    default :


       setBusiness({categories:{...business.categories,categoryOne:item._id}})
          

      break;
  }




  


  const filteredSelected= selectedCategoryData.filter((item)=>item.instance!==categoryInstance)

 const object={...item,instance:categoryInstance}
 setSelectedCategoryData([...filteredSelected,object])





  router.push('/(tabs)/(create)/(category)')
}

else{


 
 router.push(`/(tabs)/(create)/(category)/${item._id}`)
   
}
 }
 
 
     return (
       <>
        <TouchableOpacity style={[styles.categoryLine,{borderBottomColor:greyText}]}
        onPress={handlePress}
        >
         

          <View style={styles.textContainer}>
            <Text
       numberOfLines={1}
       
       style={[styles.lineText, { color: textColor }]}>{item.name}</Text>
          </View>
      <View style={{width:"15%",height:"100%",justifyContent:"center",alignItems:"center"}}>
       <MaterialCommunityIcons size={RFValue(30)} color={textColor} name='chevron-right'/>
      </View>
      
     </TouchableOpacity>
       
       </>
     )
   }
 






  













const styles= StyleSheet.create({
  categoryLine:{
   width:"100%",
   paddingHorizontal:percentagePadding,
   borderBottomWidth:1,
   justifyContent:"space-between",
   flexDirection:'row',
   alignItems:'center',
   height:RFValue(70)
 
 
  },
  lineText:{
   fontSize:RFValue(15),
   fontFamily:'Poppins-Regular',
   marginVertical:20,
   minHeight:30,
     
  },

  textContainer:{
    width:'85%',
    height:'100%',
    justifyContent:"center",
    alignItems:"flex-start",

  },



categoryHeader:{
    width:"100%",
    marginTop:0,

     
  },

  
  modalContainer: {
    width: '100%',
    height:height,
   
    flex:1,
 
 

  },



})









