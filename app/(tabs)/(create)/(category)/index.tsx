import { View,StyleSheet,ScrollView,Text } from 'react-native'
import React,{useState} from 'react'
import { InnerLayOut } from '@/components/LayOut'
import { LightHeader,ColoredHeader, } from '@/components/Header'
import { Slogan,SubmitBtn,DropDown } from '@/components/Element'
import { useBusiness } from '@/store/business'
import { useRouter } from 'expo-router'

import { CategoryInstanceType } from '@/store/business'
import { RFValue } from 'react-native-responsive-fontsize'







const index = () => {
  const router=useRouter()
  const {business}=useBusiness()
   const [isActive,setIsActive]=useState<boolean>(false)


const handleSubmit=()=>{

  if (business.categories.categoryOne==='')return

router.push('/(tabs)/(create)/address')
}











 interface DropDataType{
  _id:number,
  label:string,
  value:CategoryInstanceType
 }


const dropData:DropDataType[]=[
  {
    _id:1,
    label:'Category 1 *',
    value:'category-1'
  },

   {
    _id:2,
    label:'Category 2',
    value:'category-2'
  },
  

   {
    _id:1,
    label:'Category 3',
    value:'category-3'
  },
  

]



React.useEffect(()=>{

  if(business.categories.categoryOne!==''){
    setIsActive(true)
  }
  else{
    setIsActive(false)
  }

},[business.categories.categoryOne])



  return (
    <InnerLayOut>
  
<View style={{width:'100%',flex:1,}}>
  <LightHeader text={'List Business'}/>
   <ColoredHeader text='What kind of Business are you listing' type='black'/>
 <Slogan  text={'Add up to 3 categories that can best describe the business you’re listing.'}/>





{
  dropData.map((item)=>{
    return (
      
    <View style={styles.dropDownContainer} key={item.value}>
          <DropDown label={item.label} value={item.value}/>
      </View>  
  
    )
  })
}




<View style={styles.btnContainer}>
  <SubmitBtn isActive={isActive} type='normal' trigger={handleSubmit} text='Continue' />
</View>
 



</View>



    
   









    </InnerLayOut>

  )
}

const styles=StyleSheet.create({
   btnContainer:{
   
    alignItems:'center',
     marginVertical:RFValue(20),
    alignSelf:'stretch'
   },

   dropDownContainer:{
     marginVertical:RFValue(20),
   },
   warningText:{
color:"red",
fontSize:RFValue(11),
fontFamily:"Poppins-Bold",
textAlign:"center"
   }
})

export default index