import { View,StyleSheet,ScrollView,KeyboardAvoidingView,Platform } from 'react-native'
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



    
    <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"} // iOS uses padding, Android uses height
          keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0} // Adjust if header overlaps input
        >

      <ScrollView 
      style={{ flex: 1, backgroundColor: background }} 
      
      showsHorizontalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
 <View style={styles.innerContainer}>
          {children}
        </View>

      </ScrollView>

        </KeyboardAvoidingView>



      
   
    
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
  
    paddingTop:RFValue(20)
  },


 

})


