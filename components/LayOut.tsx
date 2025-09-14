import { View,StyleSheet } from 'react-native'
import React from 'react'
import { useGlobal } from '@/app/context'
import { RFValue } from 'react-native-responsive-fontsize'

export const AuthLayOut=({children}:{children:React.ReactNode})=>{

   const {background}=useGlobal()
  return (
    <>



    <View style={[styles.container,{backgroundColor:background}]}>
       {children}
    </View>
    
    
    </>
  )
}



export const InnerLayOut=({children}:{children:React.ReactNode})=>{

   const {background}=useGlobal()
  return (
    <>



    <View style={[styles.innerContainer,{backgroundColor:background}]}>
       {children}
    </View>
    
    
    </>
  )
}



const styles= StyleSheet.create({

  container:{
    width:"100%",
    padding:'2%',
    flex:1,
   justifyContent:'flex-start',
    paddingTop:RFValue(20)

  },

    innerContainer:{
    width:"100%",
    padding:'2%',
    flex:1,
    backgroundColor:"red",
    paddingTop:RFValue(20)
  },


 

})


