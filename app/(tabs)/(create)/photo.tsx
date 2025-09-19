import { View, StyleSheet,Image,ScrollView } from 'react-native'
import React,{useState,useEffect} from 'react'
import { InnerLayOut } from '@/components/LayOut'
import { LightHeader,ColoredHeader, } from '@/components/Header'
import { Slogan,SubmitBtn,ImageField,standardHeight } from '@/components/Element'
import { useBusiness } from '@/store/business'
import { RFValue } from 'react-native-responsive-fontsize'
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useGlobal } from '@/app/context'
import { ImageType } from '@/store/business'
import { apiUrl,api } from '@/functions/axios'
import { useAuth } from '@/store/auth'
import { errorOne } from '@/custom'
import { CircleLoader } from '@/components/ui/Loader'
import { CongratsResponse } from '@/components/ui/reponse'
import { useRouter } from 'expo-router'
import { notFoundError } from '@/custom'
import { MultiPartAxiosConfig } from '@/functions/axios'
import { initialBusiness } from '@/store/business'








const index = () => {
  const {setResponseMessage,setIsError,user}=useAuth()
 const {darkGreyText}=useGlobal()
  const {business,setBusiness}=useBusiness()
  const [isActive,setIsActive]=useState<boolean>(false)
  const [isSubmitClicked,setIsSubmitClicked]=useState<boolean>(false)
const [showCongrats,setShowCongrats]=useState<boolean>(false)
const [isLoading,setIsLoading]=useState<boolean>(false)

const router= useRouter()




const  handleCongratPress=()=>{


  setBusiness(initialBusiness)

setShowCongrats(false)


  }
 

  
 const pickImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images, // Fix mediaTypes option
    allowsEditing: true,
    allowsMultipleSelection:user.premium? true:false,
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


  






  

const imageArray= [
  {
    cloudId:'',
    url:result.assets[0].uri
  },
   

]

setBusiness({image:imageArray})

 

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


















const uploadToCloudinary=async()=>{

  const formData = new FormData();

  console.log('uplaod clouidnary')

business.image.forEach((img, i) => {
  formData.append('file', {
    uri: img.url,
    name: `photo_${i}.jpg`,
    type: 'image/jpeg',
  } as any);
});

 
setIsLoading(true)
  try{
  const url=`${apiUrl}/business/upload-cloudinary`
  
  



    const response = await api.post(url,formData,{isMultipart:true} as MultiPartAxiosConfig);
 
    
    return response.data
  
   

    

  }

  catch(err:any){
    setResponseMessage('Error uploading Image')
    setIsError(true)
 console.log(err.response.data,'error resposn ima')
    setIsLoading(false)
   return null
    

  }

  finally{
    setIsLoading(false)
  }


}







const handleSubmit=async()=>{


  setIsSubmitClicked(true)

  if (!isActive)return

setIsLoading(true)





  if (business.image.length>0){
    const value= await uploadToCloudinary()

    if (value===null){
       throw new Error ('Error uploading image')
    }

    else{

     business.image=value
      
    }
  }






  try{
  
  
  
     const url=`${apiUrl}/business/list-business`
  
    await api.post(url,business)
  
  
   
    setShowCongrats(true)
  
  
  
  
    }
  catch(err:any){
  
     setIsError(true)

  console.log(err?.response?.data,'gotten error')
  if (err?.response?.status===404){
 
    setResponseMessage(notFoundError)
    setIsLoading(false)
    return
  }



      if (err?.response?.data ==='string'){
       
      const message =
    typeof err.response.data === 'string'
      ? err.response.data
      : err.response.data.error || JSON.stringify(err.response.data);

  setResponseMessage(message);
  setIsLoading(false);
  return;
  
      }
    
      setResponseMessage(errorOne)
  
  }
  
  finally{
    setIsLoading(false)
  }
}




const handleDelete=(param:ImageType)=>{

 const resultantImage= business.image.filter((item)=>item.url!==param.url)

 setBusiness({image:resultantImage})

}




useEffect(()=>{


if (business.image.length>0){
  setIsActive(true)
}

else{
  setIsActive(false)
}

},[business.image])


const params={
  isSubmitClicked,
  onPick:handleImagePermission,
  

}


const congratsParams={
  showCongrats,
  handlePress:handleCongratPress,
  text:business.isPostedByOwner?"Thank you! This business will appear once approved.":'Thank you! This business will appear once approved. The owner can claim it later.'

}




  return (
    <InnerLayOut>
      <CongratsResponse  {...congratsParams}/>
        <CircleLoader isLoading={isLoading}/>
   <LightHeader text={'List Business'}/>


   <ScrollView showsVerticalScrollIndicator={false} style={{width:"100%"}}>

<ColoredHeader text={`Do you have photos for ${business.name}?`} type='black'/>
 <Slogan  text={`Add up to 3 pictures to back up ${business.name} for users to believe it’s real.`}/>



<View style={styles.inputContainer}>
  
   <ImageField  {...params}/>
</View>



<View style={styles.selectedImageContainer}>

  {
    business.image.map((image,index)=>{
      return (
     
         <View style={styles.imageContainer} key={index}>
     <Image source={{ uri: business.image[0].url }}  style={styles.image}
     resizeMode='cover'
     
     
     />


     <View style={[styles.eraserContainer,{backgroundColor:darkGreyText}]}>
          <MaterialCommunityIcons color={'white'} size={RFValue(15)} name='close'
     onPress={()=>handleDelete(image)}
     />
     </View>
   
   </View>
    
      )
    })
  }

  
     
</View>

   <View style={styles.btnContainer}>
 <SubmitBtn isActive={isActive} type='normal' trigger={handleSubmit} text='Continue' />
   </View>
 



   </ScrollView>
   




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
    marginBottom:RFValue(20)
   },
   inputContainer:{
    width:"100%",
    marginVertical:10
   },
   smallInput:{
    width:'100%',
    height:standardHeight,
     padding:'2%',

   },

   selectedImageContainer:{

    width:"100%",
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    height:RFValue(100),
    paddingHorizontal:'4%',
    marginVertical:RFValue(50),
  
    marginHorizontal:'auto'

   },
   image:{
    width:'100%',
    height:'150%'
   },
   imageContainer:{
      width:'25%',
      justifyContent:'center',
      alignItems:'center',
      height:RFValue(60)
   },
  
   eraserContainer:{
       marginVertical:10,
       justifyContent:'center',
       alignItems:'center',
       height:RFValue(20),
       width:RFValue(20),
       borderRadius:RFValue(20)
   }

})


export default index