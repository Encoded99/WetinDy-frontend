import { View, StyleSheet,Image,ScrollView } from 'react-native'
import React,{useState,useEffect} from 'react'
import { InnerLayOut } from '@/components/LayOut'
import { LightHeader,ColoredHeader, } from '@/components/Header'
import { Slogan,SubmitBtn,ImageField,wantedHeight } from '@/components/Element'
import { useBusiness } from '@/store/business'
import { RFValue } from 'react-native-responsive-fontsize'
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';






const index = () => {
  const {business}=useBusiness()
  const [isActive,setIsActive]=useState<boolean>(false)
  const [isSubmitClicked,setIsSubmitClicked]=useState<boolean>(false)
const [selectedImage,setSelectedImage]=useState('')








  
 const pickImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images, // Fix mediaTypes option
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.canceled) {
    const fileInfo = await FileSystem.getInfoAsync(result.assets[0].uri);

    // Check if the file exists before accessing its size
    if (fileInfo.exists && fileInfo.size > 1024 * 1024) {  // 1MB limit
      alert("File is too large! Please select an image below 1MB.");
      return;
    }


    console.log(result.assets[0].uri,'uri')

    setSelectedImage(result.assets[0].uri); 
  }
};

const handleImagePermission=async()=>{
  const {status} =await ImagePicker.requestMediaLibraryPermissionsAsync()

  if (status!=='granted'){

    alert('Sorry, we need media library permissions to make this work!')

  }

  else{
    pickImage()
  }
}



















const handleSubmit=()=>{

}




useEffect(()=>{




},[business.image])


const params={
  isSubmitClicked,
  onPick:handleImagePermission,
  

}

useEffect(()=>{
  console.log(selectedImage,'selected-image')
})



  return (
    <InnerLayOut>
   <LightHeader text={'List Business'}/>


   <ScrollView showsVerticalScrollIndicator={false} style={{width:"100%"}}>

<ColoredHeader text={`Do you have photos for ${business.name}?`} type='black'/>
 <Slogan  text={`Add up to 3 pictures to back up ${business.name} for users to believe it’s real.`}/>



<View style={styles.inputContainer}>
  
   <ImageField  {...params}/>
</View>



<View style={styles.selectedImageContainer}>

  <Image source={{ uri: selectedImage[0] }}  style={styles.image}/>
  <Image style={styles.image}/>
  <Image style={styles.image}/>

</View>





   </ScrollView>
   


 <View style={styles.contentContainer}>







   <View style={styles.btnContainer}>
 <SubmitBtn isActive={isActive} type='normal' trigger={handleSubmit} text='Continue' />
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
   },
   inputContainer:{
    width:"100%",
    marginVertical:10
   },
   smallInput:{
    width:'100%',
    height:wantedHeight,
     padding:'2%',

   },

   selectedImageContainer:{

    width:"100%",
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    height:RFValue(100),
    paddingHorizontal:'4%',
    marginVertical:RFValue(30)

   },
   image:{
    width:'30%',
    backgroundColor:'red',
    height:'100%'
   }

})


export default index