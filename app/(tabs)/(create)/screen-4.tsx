import { View,StyleSheet,ScrollView } from 'react-native'
import React from 'react'
import { InnerLayOut } from '@/components/LayOut'
import { LightHeader,ColoredHeader, } from '@/components/Header'
import { Slogan,SubmitBtn,DropDown } from '@/components/Element'



import { CategoryInstanceType } from '@/store/business'
import { RFValue } from 'react-native-responsive-fontsize'







const index = () => {




const handleSubmit=()=>{

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







  return (
    <InnerLayOut>
  
 <ScrollView  style={{width:"100%"}}>

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
  <SubmitBtn type='normal' trigger={handleSubmit} text='Continue' />
</View>
 


 </ScrollView>
    
   









    </InnerLayOut>

  )
}

const styles=StyleSheet.create({
   btnContainer:{
    width:'100%',
    alignItems:'center',
     marginVertical:RFValue(20),
   },

   dropDownContainer:{
     marginVertical:RFValue(20),
   }
})

export default index