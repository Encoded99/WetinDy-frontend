import { Text,StyleSheet,Dimensions, TouchableOpacity,} from 'react-native'
import React from 'react'
import { CategoryType, } from '@/store/business'
import { RFValue } from 'react-native-responsive-fontsize'
import { useGlobal } from '@/app/context'
import { percentagePadding } from './Element'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useBusiness } from '@/store/business'




const {height}=Dimensions.get('window')

// Precompute all paths into a flat array
//const allPaths = country.flatMap((cat) => buildPaths(cat));






  export const CategoryRenderItem=({item,textColor}:{item:CategoryType,textColor:string})=>{
   const {greyText}=useGlobal()
   const {business,setSelectedCategory,selectedCategory,categoryInstance,setSelectedCategoryData}=useBusiness()
  const {catId}=useLocalSearchParams()
  const router=useRouter()
 



 const handlePress=async()=>{




if (selectedCategory.subcategories.length!==0){
  switch(categoryInstance){
    case  'category-2':
  business.categories.categoryTwo=item._id
      break;
    case 'category-3':
       business.categories.categoryThree=item._id
      break;
    default :
       business.categories.categoryOne=item._id
      break;
  }


  setSelectedCategoryData(item)
  router.push('/(tabs)/(create)/screen-4')
}

else{

  setSelectedCategory(item)
 
 router.push(`/(tabs)/(create)/(category)/${item._id}`)
   

}

   
  
 
 
 
 }
 
 
     return (
       <>
        <TouchableOpacity style={[styles.categoryLine,{borderBottomColor:greyText}]}
        onPress={handlePress}
        >
       <Text style={[styles.lineText, { color: textColor }]}>{item.name}</Text>
     </TouchableOpacity>
       
       </>
     )
   }
 






  













const styles= StyleSheet.create({
  categoryLine:{
   width:"100%",
   paddingHorizontal:percentagePadding,
   borderBottomWidth:1,
   justifyContent:"center",
 
 
  },
  lineText:{
   fontSize:RFValue(15),
   fontFamily:'Poppins-Regular',
   marginVertical:20,
   minHeight:30,
     
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









