import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import { InnerLayOut } from '@/components/LayOut'
import { LightHeader,ColoredHeader, } from '@/components/Header'
import { Slogan,SubmitBtn,InputField,SearchSelectField } from '@/components/Element'
import Category from '@/components/category'

const index = () => {




const handleSubmit=()=>{
  
}


const params={
  label:'Category',
  onSearch:handleSubmit,
  onClickDown:handleSubmit
}


  return (
    <InnerLayOut>
   <LightHeader text={'List Business'}/>
   <ColoredHeader text='What kind of Business are you listing' type='black'/>
 <Slogan  text={'Add up to 3 categories that can best describe the business you’re listing. The business owner can change later.'}/>

<SearchSelectField {...params}/>

 <View style={styles.contentContainer}>



<Category/>



<View style={styles.btnContainer}>
  <SubmitBtn type='normal' trigger={handleSubmit} text='Continue' />
</View>




 </View>

    </InnerLayOut>

  )
}

const styles=StyleSheet.create({
   contentContainer:{
    flex:1,
    padding:'2%',
    justifyContent:'flex-end',

   },
   btnContainer:{
    width:'100%',
    alignItems:'center',
    marginTop:20,
   }
})

export default index