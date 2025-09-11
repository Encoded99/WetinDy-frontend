import { View, } from 'react-native'
import React from 'react'
import { useGlobal } from '@/app/context'
import { StyleSheet } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

import { ChevronHeader,ColoredHeader } from '@/components/Header'
import { Slogan,InputField,InputType,SubmitBtn,SelectInput } from '@/components/Element'
import { useRegister, } from '@/store/auth'






const partTwo = () => {

  const {background,}=useGlobal()
  const {registerData,setRegisterData}=useRegister()
  




type InputArrayType={
  _id:number,
  params:InputType,

}


const InputArray:InputArrayType[]=[


   {
    _id:1,
    params:{
 label:'Telephone',
  text:registerData.telephone,
  icon:"phone",
  setText:(value:string)=>setRegisterData({...registerData,telephone:value}),  
    }

  },
  {
    _id:1,
    params:{
 label:'First Name',
  text:registerData.firstName,
  icon:"account-outline",
  setText:(value:string)=>setRegisterData({...registerData,firstName:value}),

    }

  },

    {
    _id:2,
    params:{
 label:'Last Name',
  text:registerData.lastName,
  icon:"account-outline",
  setText:(value:string)=>setRegisterData({...registerData,lastName:value}),

    
    
    }

  },


]


const handleSubmit=()=>{
console.log(registerData,'register-data')
}


  return (
    <View style={[styles.container,{backgroundColor:background}]}>
      
      <ChevronHeader/>
      <ColoredHeader type='normal' text={'Personal Details'}/>
      <Slogan  text={'Your Informations are safe with us'}/>

    {
      InputArray.map((item,index)=>{
        return (
          <>
 <View style={{marginTop:RFValue(20)}} key={item._id}>
          {
            index===0 && (
              <>
            <SelectInput {...item.params}/>  
              </>
            )
          }

          {
            index>0 && (
              <>
           <InputField {...item.params}/>
              </>
            )
          }
         
  
        </View>
          
          </>
        )
      })
    }
 

  <View style={{justifyContent:"center",alignItems:"center",width:"100%",marginTop:RFValue(100)}}>
 <SubmitBtn text='Continue' trigger={handleSubmit}  type='normal'/>
  </View>
 
    </View>
  )
}


const styles= StyleSheet.create({

  container:{
    width:"100%",
    padding:'2%',
    flex:1,

  },

 

})


export default partTwo