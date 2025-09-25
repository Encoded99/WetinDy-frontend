import { View,StyleSheet,ScrollView,KeyboardAvoidingView,Platform,SafeAreaView,StatusBar ,Text} from 'react-native'
import React from 'react'
import { useGlobal } from '@/app/context'
import { RFValue } from 'react-native-responsive-fontsize'
import { percentagePadding, standardPaddingTop } from './Element'






export const AuthLayOut=({children}:{children:React.ReactNode})=>{

   const {background}=useGlobal()
  return (
    <>


<SafeAreaView  style={{width:'100%',flex:1,paddingTop:standardPaddingTop,backgroundColor:background,padding:percentagePadding}}>
 <StatusBar
          barStyle="dark-content" // or 'light-content'
          backgroundColor={background}  // Android only
        />
    
<View style={[styles.container,{backgroundColor:background}]}>
       {children}
    </View>

</SafeAreaView>
    
   
    
    </>
  )
}



export const InnerLayOut=({children}:{children:React.ReactNode})=>{

   const {background}=useGlobal()
  return (
    <>


<SafeAreaView  style={{width:'100%',flex:1,paddingTop:standardPaddingTop,backgroundColor:background}}>

    <StatusBar
          barStyle="dark-content" // or 'light-content'
          backgroundColor={background}  // Android only
        />
    

      

     
<ScrollView
    style={styles.innerContainer}
    contentContainerStyle={{ flexGrow: 1 }}
  >

      {children}
    
  </ScrollView>
            

      

   

</SafeAreaView>
    



      
   
    
    </>
  )
}


export const InnerLayOutWithOutScroll=({children}:{children:React.ReactNode})=>{

   const {background}=useGlobal()
  return (
    <>

<SafeAreaView  style={{width:'100%',flex:1,backgroundColor:background,paddingTop:standardPaddingTop,}}>
    <StatusBar
          barStyle="dark-content" // or 'light-content'
          backgroundColor={background}  // Android only
        />




 
        
             
 <View style={[styles.innerContainer]}>
          {children}
        </View>

            

      

   


</SafeAreaView>

    
    



      
   
    
    </>
  )
}


const styles= StyleSheet.create({

  container:{
    width:"100%",
   
    flex:1,
   justifyContent:'flex-start',
    

  },

    innerContainer:{
    width:"100%",
    padding:percentagePadding,
    flex:1


  },


 

})

