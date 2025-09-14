import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import { InnerLayOut } from '@/components/LayOut'
import { LightHeader,ColoredHeader, } from '@/components/Header'
import { Slogan,SubmitBtn,DescriptionField,wantedHeight } from '@/components/Element'

const index = () => {


const handleSubmit=()=>{

}


  return (
    <InnerLayOut>
   <LightHeader text={'List Business'}/>
   <ColoredHeader text='Do you have photos for Tony Enterprise?' type='black'/>
 <Slogan  text={'Add up to 3 pictures to back up Tony Enterprise for users to believe it’s real.'}/>



<View style={styles.inputContainer}>
  <DescriptionField />

</View>



<View  style={styles.smallInput}>
</View>


 <View style={styles.contentContainer}>







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
   },
   inputContainer:{
    width:"100%",
    marginVertical:10
   },
   smallInput:{
    width:'100%',
    height:wantedHeight,
     padding:'2%',

   }
})


export default index