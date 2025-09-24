import { View, Text,StyleSheet,ImageBackground,SafeAreaView,StatusBar,ScrollView, TouchableOpacity, findNodeHandle, Pressable, TextInput,NativeSyntheticEvent,NativeScrollEvent,Linking,Alert, Share } from 'react-native'
import React, { useState,useRef,useEffect } from 'react'
import { useQuery } from '@tanstack/react-query';
import { api,apiUrl } from '@/functions/axios';
import { useLocalSearchParams } from 'expo-router';
import { InnerLayOut } from '@/components/LayOut';
import { LargePreLoader ,CircleLoader} from '@/components/ui/Loader';
import { percentagePadding, standardBorderRadius, standardHeight } from '@/components/Element';
import { LargeErrorComponent } from '@/components/Error';
import { RFValue } from 'react-native-responsive-fontsize';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BusinessType, FinalBusinessType } from '@/store/business'
import { useAuth } from '@/store/auth';
import { lightPrimary, primary, title } from '@/custom';
import { useGlobal } from '@/app/context';
import { DayInfo } from '@/store/business';
import { SubmitBtn } from '@/components/Element';
import { ReviewModal } from '@/components/Review';
import { TextCounter,DescriptionField } from '@/components/Element';
import { notFoundError,errorOne } from '@/custom';
import { ReviewType } from '@/store/business';
import { useBusiness } from '@/store/business';
import { useRouter } from 'expo-router';
import { PanGestureHandler, PanGestureHandlerGestureEvent,GestureHandlerRootView, FlatList  } from 'react-native-gesture-handler';

import Animated, { runOnJS, useAnimatedGestureHandler,  useSharedValue, withSpring , 
  useAnimatedStyle,
  withTiming,} from 'react-native-reanimated';









const imageIconColor='white'
const imageIconSize=RFValue(35)
const imageWrapperSize=RFValue(40)
type LinkInstanceType='Overview'|'Reviews'|'Services'






type DataType={
  business:FinalBusinessType,
  reviews:ReviewType[],
  reviewNo:number,
  doesBookMarkExist:boolean
}












const index = () => {
const {id}=useLocalSearchParams()


const fetchData = async (): Promise<DataType> => {
  // ...fetch logic
const url=`${apiUrl}/business/discover-business/${id}`

    const response = await api.get(url);
  return response.data;


};




const {
    data,
    isLoading,
    isError,
    refetch,
    
  } = useQuery({
    queryKey: ['discovered-business',id],
    queryFn: () => fetchData(),
  });


const SWIPE_THRESHOLD = 45;

  const {setBusiness,setTempCategoriesName}=useBusiness()
  const router=useRouter()
 const {textColor,background,greyText,darkGreyText}=useGlobal()
 const translateX = useSharedValue(0);
 const {user,setResponseMessage,setIsError,setShortResponseMessage}=useAuth()
 const [imageIndex,setImageIndex]=useState<number>(0)
 const [instance,setInstance]=useState<LinkInstanceType>('Overview')
 
 const [showFullDescription,setShowFullDescription]=useState<boolean>(false)
 const [reviewText,setReviewText]=useState<string>('')
const [overviewY, setOverviewY] = useState(0);
const [serviceY, setServiceY] = useState(0);
const [reviewY, setReviewY] = useState(0);
const [fixTab,setFixTab]=useState<boolean>(false)
const [isSubmitClicked,setIsSubmitClicked]=useState<boolean>(false)
const [isPreviewLoading,setIsPreviewLoading]=useState<boolean>(false)
const [isActive,setIsActive]=useState<boolean>(false)
const [ratingNo,setRatingNo]=useState<number>(0)
const [isSaved, setIsSaved] = useState<boolean>(true);




const LinkData:LinkInstanceType[]=['Overview','Reviews','Services']



const handleClick=()=>{

}


type TabLinkType = 'Call' | 'Share' | 'Direction' | 'Website' | 'Save'|'Unsave';


type TabLinkArrayType={
 _id:number,
 name:TabLinkType,
 trigger:()=>void,
 icon:React.ComponentProps<typeof MaterialCommunityIcons>['name'];
}


















const business= data?.business
const reviews=data?.reviews
const averageRating=(data?.business?.ratings ?? 0) / (data?.business?.noOfRatings ?? 0);
type CategoryType={
  categoryOne?:string,
    categoryTwo?:string,
      categoryThree?:string,



}
 



const handleClaim=()=>{

   const categoriesOne=business?.categories?.categoryOne?._id
  const categoriesTwo=business?.categories?.categoryTwo?._id
    const categoriesThree=business?.categories?.categoryThree?._id
const categoriesNameOne=business?.categories?.categoryOne?.name
const categoriesNameTwo=business?.categories?.categoryTwo?.name
const categoriesNameThree=business?.categories?.categoryThree?.name

const categoryName={
  categoryOne:categoriesNameOne?categoriesNameOne:undefined,
    categoryTwo:categoriesNameTwo?categoriesNameTwo:undefined,
        categoryThree:categoriesNameThree?categoriesNameThree:undefined
}



setTempCategoriesName(categoryName)


const categories:CategoryType={

  categoryOne:categoriesOne,
    categoryTwo:categoriesTwo?categoriesTwo:undefined,
        categoryThree:categoriesThree?categoriesThree:undefined


}




const newBusiness={...business,categories:categories}

delete newBusiness._id
delete newBusiness.ratings
delete newBusiness.isVerified

setBusiness(newBusiness)
    
router.push('/(tabs)/(create)/claim')

}









const date= new Date().getDay()

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const today= days[date]

const gottenDay=business?.operatingDays.find((item:DayInfo)=>item?.name.toUpperCase()===today.toUpperCase())

  const isOpen=gottenDay?.isOpen 
  
const scrollRef = useRef<ScrollView>(null);



const scrollToSection = (section: LinkInstanceType) => {

  let y = 0;
  switch (section) {
    case 'Overview':
      y = overviewY;
      break;
    case 'Services':
      y = serviceY;
      break;
    case 'Reviews':
      y = reviewY;
      break;
  }
 setInstance(section)
  scrollRef.current?.scrollTo({ y, animated: true });
};

const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
  const yOffset = event.nativeEvent.contentOffset.y; // current vertical scroll

  // Example: call function when scrolled past 300
  if (yOffset >= 300) {
   setFixTab(true)
  } else{
    setFixTab(false)
  }
};




const  postReview=async()=>{


if (!isActive) return
 setIsSubmitClicked(true)
  if ( ratingNo===0) {

    setResponseMessage('Please leave a rating for this business')
    setIsError(true)
    return

  }

  
 
  if(reviewText ){
  setIsPreviewLoading(true)
  }

  try{


     const data={
    content:reviewText,
    ratings:ratingNo
   }


   const url=`${apiUrl}/reviews/post-review/${business?._id}`

  await api.post(url,data)

setIsError(false)
 setResponseMessage("Your review has been posted successfully.")

  setRatingNo(0)
  setReviewText('')






  }
catch(err:any){

   setIsError(true)


  if (err?.response?.status==='404'){
    setResponseMessage(notFoundError)
    setIsPreviewLoading(false)
    return
  }

    if (err?.response?.data){
     
    setResponseMessage(err?.response?.data)
    setIsPreviewLoading(false)
    return
    }
  
    setResponseMessage(errorOne)

}

finally{
  setIsPreviewLoading(false)
  setIsSubmitClicked(false)
}
}






const phoneNumber= `${business?.prefix}${business?.telephone.slice(1)}`


const makeCall = () => {
    let phoneUrl = `tel:${phoneNumber}`;
    Linking.canOpenURL(phoneUrl)
      .then((supported) => {
        if (!supported) {
          Alert.alert('Error', 'Your device does not support calling');
        } else {
          return Linking.openURL(phoneUrl);
        }
      })
      .catch((err) => console.error(err));
  };




  const handleShare = async () => {
    try {
      const message = `🌟 Discover ${business?.name} on ${title}! 
Trusted, nearby, and highly rated — check it out now: ${''} 🚀`;

      await Share.share({
        message,
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };



const visitWebsite = () => {
  const url = business?.website ? (business?.website.startsWith('http') ? business?.website : `https://${business?.website}`) : null;

  if (!url) {
    Alert.alert('Error', 'No website available for this business.');
    return;
  }

  Linking.canOpenURL(url)
    .then((supported) => {
      if (!supported) {
        Alert.alert('Error', 'Your device cannot open this website.');
      } else {
        Linking.openURL(url);
      }
    })
    .catch((err) => console.error('Error opening website:', err));
};









const  handleBookMark=async()=>{




  try{


     const data={
    content:reviewText,
    ratings:ratingNo
   }


   const url=`${apiUrl}/business/handle-bookmark/${business?._id}`

  await api.patch(url,data);
 
if (!isSaved){
setShortResponseMessage('saved')
}
 
else{
  setShortResponseMessage('unsaved')
}


setIsSaved(!isSaved)





  }
catch(err:any){

   setIsError(true)


  if (err?.response?.status==='404'){
    setResponseMessage(notFoundError)
    setIsPreviewLoading(false)
    return
  }

    if (err?.response?.data){
     
    setResponseMessage(err?.response?.data)
    setIsPreviewLoading(false)
    return
    }
  
    setResponseMessage(errorOne)

}

finally{
  setIsPreviewLoading(false)
  setIsSubmitClicked(false)
}
}










const tabLink:TabLinkArrayType[] = [
  {
    _id: 1,
    name: 'Call',
    icon: 'phone', // phone icon
    trigger: () => makeCall(),
  },
  {
    _id: 2,
    name: 'Share',
    icon: 'link-variant', // share icon
    trigger: () => handleShare(),
  },
  {
    _id: 3,
    name: 'Direction',
    icon: 'arrow-right-circle', // directions / navigation icon
    trigger: () => handleClick(),
  },
  {
    _id: 4,
    name: 'Website',
    icon: 'web', // website / globe icon
    trigger: () =>visitWebsite(),
  },
  {
    _id: 5,
    name: !isSaved?'Save':'Unsave',
    icon: !isSaved?'bookmark-outline':'bookmark-off-outline', // save / bookmark icon
    trigger: () => handleBookMark(),
  },
];











  const gestureHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onActive: (event) => {
      translateX.value = event.translationX;
    },
    onEnd: (event) => {
 
if (!business?.image?.length) return;
  
      if (event.translationX > SWIPE_THRESHOLD && imageIndex > 0) {
        translateX.value = withSpring(500); // Instant transition
        // Update index immediately after crossing threshold
     
        runOnJS(setImageIndex)(imageIndex - 1);
        translateX.value = 0; // Reset for the new card
      } else if (event.translationX < -SWIPE_THRESHOLD && imageIndex < business?.image?.length - 1  ) {
    
        
        translateX.value = withSpring(-500); // Instant transition
        // Update index immediately after crossing threshold
        runOnJS(setImageIndex)(imageIndex + 1);
        translateX.value = 0; // Reset for the new card
      } else {
        translateX.value = withSpring(0); // Reset if threshold is not crossed
      }
    }
  });










useEffect(()=>{

  if ( reviewText){
    setIsActive(true)
  }

  else{
    setIsActive(false)
  }

},[reviewText])





useEffect(()=>{
  if (data?.doesBookMarkExist){

    setIsSaved(true)
  }

},[])




if (isLoading ){
 return (
  <>
   <InnerLayOut>
  <LargePreLoader/>

   </InnerLayOut>
  </>
 )
}



if (isError){
 return (
  <>
 <LargeErrorComponent  onRetry={refetch}/>
  </>
 )
}


 


  return (
   <>
   <CircleLoader isLoading={isPreviewLoading}/>
   <SafeAreaView style={{flex:1,}}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
       {
        fixTab && (
          <>
          <View style={{width:'100%',padding:percentagePadding,marginTop:RFValue(20)}}>
   <View style={[styles.tabContainer, ]}>


          {
           LinkData.map((item)=>{
            return (
        
                <TouchableOpacity style={[styles.tabBtn, {backgroundColor:instance===item ? primary:lightPrimary}]} key={item}
                onPress={() => scrollToSection(item)}
                
                >
            <Text style={[styles.tabBtnText,{color:instance===item?'white':primary}]}>{item}</Text>
         </TouchableOpacity>

             
            )
           })
          }

      
        </View>
          </View>
        
          </>
        )
       }




  
     <ScrollView  ref={scrollRef}  onScroll={(event) => handleScroll(event)}  style={{flexGrow:1,backgroundColor:background,position:'relative'}} scrollEventThrottle={16}  >
                
          <GestureHandlerRootView >


   <PanGestureHandler onGestureEvent={gestureHandler}>
    <Animated.View style={styles.swipeContainer}>

      <ImageBackground resizeMode='cover'  source={{uri:business?.image[imageIndex]?.url}} style={styles.image}>

            <View style={styles.imageLinkFirstLine}>

                   <TouchableOpacity style={styles.iconWrapper} onPress={()=>router.back()}>
                     <MaterialCommunityIcons size={imageIconSize} color={imageIconColor}  name='chevron-left'/>
                   </TouchableOpacity>
                   <View style={{flexDirection:"row",}}>
               
                   <TouchableOpacity style={[styles.iconWrapper,{marginRight:'4%',}]} onPress={handleBookMark}>
                     <MaterialCommunityIcons size={imageIconSize*0.8} color={imageIconColor}  name={!isSaved?'bookmark-outline':"bookmark-off-outline"}/>
                   </TouchableOpacity>


                   <TouchableOpacity style={[styles.iconWrapper,{marginRight:'0%',}]}
                   onPress={handleShare}
                   >
                     <MaterialCommunityIcons size={imageIconSize*0.7} color={imageIconColor}  name='link-variant'/>
                   </TouchableOpacity>



                     
                   </View>

            </View>
       <View style={styles.bottomLine}>
        <View style={styles.circleContainer}>


         {
          business?.image.map((item:any,index:number)=>{
           return (
            <>
              <View style={[styles.circle,{backgroundColor:index===imageIndex?primary:'white'}]}>

         </View>
            </>
           )
          })
         }

       

        </View>
       <Text numberOfLines={2} style={styles.nameHeader}>{business?.name}</Text>

      
        <View style={styles.ratingLine}>
         <View style={styles.starsContainer}>

          {
           Array.from({length:5}).map((item,index)=>{

const isThreshold= index+1<=averageRating
            return (
             
             <View style={styles.starContainer} key={index}>
              <MaterialCommunityIcons size={RFValue(25)} color={isThreshold?'gold':'black'} name='star-outline'/>
          </View> 
            
            )
           })
          }
    
         </View>

            {
              averageRating>0 && (
                <>
                 <Text style={{fontSize:RFValue(18),color:'white'}}>{averageRating} rating</Text>

                </>
              )
            }
        
        </View>

        <View style={{width:'100%',flexDirection:'row',marginVertical:RFValue(6),alignItems:"center"}}>
        
           <View style={{width:'70%',flexDirection:"row",flexWrap:'wrap'}}>
               <Text numberOfLines={1}  style={[styles.imageText,]}>{business?.categories?.categoryOne?.name}</Text>
               <Text style={[styles.imageText,{marginHorizontal:5}]}>in</Text>
                <Text style={styles.imageText}>{business?.address?.city}</Text> 

              
           </View>
                <Text style={[styles.imageText,{color:isOpen?'green':'red',fontFamily:"Poppins-Bold"}]}>{isOpen?'OPEN':'CLOSE'}</Text>
           
        </View>




       </View>


       

           </ImageBackground>

    </Animated.View>

   </PanGestureHandler>


 


          </GestureHandlerRootView>
          


        <View >
       <View>
        
       </View>


       <View style={{padding:percentagePadding}}>
       {
        !fixTab && (
          <>
           <View style={[styles.tabContainer,{marginVertical:business?.isVerified?RFValue(20):0} ]}>


          {
           LinkData.map((item)=>{
            return (
        
                <TouchableOpacity style={[styles.tabBtn, {backgroundColor:instance===item ? primary:lightPrimary}]} key={item}
                onPress={() => scrollToSection(item)}
                
                >
            <Text style={[styles.tabBtnText,{color:instance===item?'white':primary}]}>{item}</Text>
         </TouchableOpacity>

             
            )
           })
          }

      
        </View>
          </>
        )
       }



        {
         !business?.isVerified && (
          <>
           <View style={{width:'100%',justifyContent:'center',alignItems:"center",marginVertical:RFValue(20)}}>
           <SubmitBtn isActive={true} type='normal' trigger={handleClaim}  text='Claim Business' />
        </View>

          </>
         )
        }
       
       
   <View style={styles.secondTabContainer}>

    {
     tabLink.map((item,index)=>{
      return (
      
       <TouchableOpacity style={styles.secondTab}    key={index}
       
       onPress={item.trigger}
       
       >
         
          <View style={styles.secondTabBtn} >
          <MaterialCommunityIcons color={primary} size={RFValue(20)} name={item.icon}/>
            </View>
            <Text numberOfLines={1} style={styles.itemBtnText}>{item.name}</Text>
        </TouchableOpacity>
       
      )
     })
    }

   </View>






       </View>

        




//Overview start here//
<View style={{width:'100%'}}  onLayout={(event) => setOverviewY(event.nativeEvent.layout.y)}>


<View style={[styles.overViewAddressLine,{borderTopColor:greyText}]}>
  <MaterialCommunityIcons color={primary} size={RFValue(20)} name='map-marker'/>
  <View style={styles.addressContainer}>
   <Text  style={{color:textColor,fontSize:RFValue(13),fontFamily:'Poppins-Regular'}}>
           {business?.address?.street}, {business?.address?.city}, {business?.address?.postalCode}
   </Text>
  

  </View>

   <ImageBackground style={styles.smallMap} source={{uri:business?.image[0]?.url}}/>
</View>



<View style={[styles.overOperationLine,{borderTopColor:greyText}]}>
  <MaterialCommunityIcons color={primary} size={RFValue(20)} name='clock-outline'/>
  <Text style={[styles.imageText,{color:isOpen?'green':'red',fontFamily:"Poppins-Bold",marginHorizontal:'3%'}]}>{isOpen?'OPEN':'CLOSE'} </Text>
   <Text style={[styles.lineText,{color:textColor}]}>{isOpen?`. Closes ${gottenDay?.closeTime}`:``}.</Text>
           
</View>


<View style={[styles.overOperationLine,{borderTopColor:greyText}]}>
  <MaterialCommunityIcons color={primary} size={RFValue(20)} name='phone'/>

   <Text style={[styles.lineText,{color:textColor,marginLeft:10}]}>{business?.prefix} {business?.telephone.slice(1,business?.telephone.length)}</Text>
           
</View>

<View style={[styles.recommendLine,{borderTopColor:greyText}]}>
  <Text style={[styles.lineText,{textAlign:'center',fontFamily:'Poppins-Bold',fontSize:RFValue(18)}]}>Do you recommend this business</Text>

  <View style={styles.recommendBtnContainer}>
       <Pressable style={[styles.recommendBtn,{borderColor:textColor}]}>
          <Text style={styles.lineText}>Yes</Text>
       </Pressable> 
       <Pressable style={[styles.recommendBtn,{borderColor:textColor,}]}>
          <Text style={styles.lineText}>No</Text>
       </Pressable> 

       <Pressable style={[styles.recommendBtn,{borderColor:textColor}]}>
          <Text style={styles.lineText}>Maybe</Text>
       </Pressable> 
  </View>


</View>

<ImageBackground style={styles.largeMap} source={{uri:business?.image[0]?.url}}/>

<View style={[styles.textKmLine,{borderBottomColor:greyText}]}>

    <View style={styles.textLogoContainer}>
    <Text style={[styles.lineText,]}>{business?.address?.street}, {business?.address?.city}, {business?.address?.postalCode}</Text>
    </View>

      <View style={[styles.textLogoContainer,{alignItems:'flex-end'}]}>
          <Text style={[styles.lineText,]}>17km</Text>
    </View>
  
  

</View>


<View style={[styles.textLogoLine,{borderBottomColor:greyText}]}>

    <View style={styles.textLogoContainer}>
    <Text style={[styles.lineText,]}>Get Directions</Text>
    </View>

      <View style={[styles.textLogoContainer,{alignItems:'flex-end'}]}>
          <MaterialCommunityIcons  color={textColor} size={RFValue(20)} name='arrow-right-circle-outline'/>
    </View>
  
  

</View>

<View style={[{width:'100%',padding:percentagePadding}]}>
  <Text style={[styles.lineHeader,{color:textColor}]}>Business Information</Text>

</View>

<View style={[styles.textLogoLine,{borderBottomColor:greyText}]}>

    <View style={[styles.textLogoContainer,{flex:2}]}>
    <Text style={[styles.lineText,]}>Call {user?.prefix} {business?.telephone.slice(1,business?.telephone.length)}</Text>
    </View>

      <View style={[styles.textLogoContainer,{alignItems:'flex-end',flex:1}]}>
          <MaterialCommunityIcons  color={textColor} size={RFValue(20)} name='phone'/>
    </View>
  
  

</View>

<View style={[styles.textLogoLine,{borderBottomColor:greyText}]}>

    <View style={styles.textLogoContainer}>
    <Text style={[styles.lineText,]} numberOfLines={2}>{business?.website}</Text>
    </View>

      <View style={[styles.textLogoContainer,{alignItems:'flex-end'}]}>
          <MaterialCommunityIcons  color={textColor} size={RFValue(20)} name='web'/>
    </View>
  
  

</View>













</View>

//Services start here//
<View style={{width:'100%'}}  onLayout={(event) => setServiceY(event.nativeEvent.layout.y)}>

  <View style={[styles.servicesContainer,{borderBottomColor:greyText}]}>
 <Text style={[styles.lineHeader,{color:textColor,marginVertical:RFValue(15)}]}>Services</Text>
 <Text style={[styles.lineText,{color:textColor,}]}>{business?.categories?.categoryOne?.name}</Text>
</View>



<View style={[styles.servicesContainer,{borderBottomColor:greyText}]}>
 <Text style={[styles.lineHeader,{color:textColor,marginVertical:RFValue(15)}]}>From this business</Text>
 <Text numberOfLines={showFullDescription?0:3} style={[styles.lineText,{color:textColor,textAlign:"justify"}]}>{business?.description}</Text>

 <Pressable   onPress={()=>setShowFullDescription(!showFullDescription)} style={[styles.lineBtn,{borderColor:textColor}]}>
   <Text style={[styles.lineText,{color:textColor}]}> {!showFullDescription? 'Read More':"Read Less"}</Text>
</Pressable>
</View>


</View>


//Review start here//
   <View style={styles.reviewContainer} onLayout={(event) => setReviewY(event.nativeEvent.layout.y)}>
    <Text style={[styles.lineHeader,{color:textColor}]}>Rate and Review</Text>
    
  <View style={styles.largeStarContainer}>
  {
    Array.from({length:5}).map((star,index)=>{
      return (
        <TouchableOpacity key={index}   onPress={async()=>{

          
            if (ratingNo===index+1){
              setRatingNo(0)
            } else{
              setRatingNo(index+1)
          
            }
        }}>
       <MaterialCommunityIcons size={RFValue(35)} color={ratingNo>=index+1 ?primary : textColor} name={ ratingNo>=index+1? 'star' :'star-outline'}/>

        </TouchableOpacity>
      )
    })
  }
  </View>
  <View style={{width:'100%',marginVertical:RFValue(20)}}>
     <DescriptionField placeholder='Write your review' setText={setReviewText}  text={reviewText} isSubmitClicked={isSubmitClicked}/>
   

  </View>
     <TextCounter text={reviewText} maxLength={250} onValid={()=>setIsActive(true)} onExceed={()=>setIsActive(false)}/>
 
  <View style={{width:'100%',marginVertical:RFValue(10)}}>

    <SubmitBtn isActive={isActive}  trigger={postReview} text='Submit' type='normal' />

  </View>
   
   <View style={{width:'100%',marginVertical:RFValue(50)}}>

{
   reviews?.map((item,index)=>{
    return (
     <ReviewModal  item={item}   key={index}/> 
    )
   })
}
   </View>
  


   </View>




        </View>

     

     </ScrollView>





   </SafeAreaView>
   </>
   
  )
}


const imagePadding='3%'

const styles= StyleSheet.create({

swipeContainer:{
   width:"100%",
    height:RFValue(400),
},


 image:{
  width:"100%",
 
  height:'100%',
  justifyContent:'space-between'
 
 },

 imageLinkFirstLine:{
  width:'100%',
  height:'20%',
  flexDirection:"row",
  justifyContent:'space-between',
  alignItems:'flex-end',
  paddingHorizontal:imagePadding
 
 },
 iconWrapper:{
  height:imageWrapperSize,
  width:imageWrapperSize,
  borderRadius:imageWrapperSize,
  justifyContent:'center',
  alignItems:'center',
  backgroundColor:"black"
 },
 bottomLine:{

    width:'100%',

 paddingHorizontal:imagePadding,
 backgroundColor:'hsla(210, 50%, 50%, 0.3)',
 paddingBottom:'3%',
 paddingTop:'1%'
 },

 circleContainer:{
   flexDirection:"row"
 },
 circle:{
  width:RFValue(15),
  height:RFValue(15),
  borderRadius:RFValue(15),
  marginRight:RFValue(10)
 },
 nameHeader:{
  fontSize:RFValue(30),
  color:'white',
  fontFamily:'Poppins-Bold',
  marginVertical:RFValue(5)
 },

 ratingLine:{
  width:'100%',
  flexDirection:'row'

 },

 starsContainer:{
  flexDirection:'row'

 },

 starContainer:{
  height:RFValue(30),
  width:RFValue(30),
  justifyContent:"center",
  alignItems:'center',
  backgroundColor:"white",
  borderRadius:RFValue(5),
  marginRight:'5%'
 },
 imageText:{
  fontSize:RFValue(15),
  fontFamily:'Poppins-Regular',
  color:'white'
 },
 tabContainer:{
  width:"100%",
  flexDirection:"row",
  justifyContent:"flex-start",
  alignItems:"center",

 },



 tabBtn:{
    flex:1,
    height:RFValue(40),
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:primary,
    marginRight:2,
    borderRadius:RFValue(20),
   
 },
 tabBtnText:{
  fontSize:RFValue(15),
  fontFamily:'Poppins-bold',
  color:'white'
 },
 claimBtn:{
  width:'90%',
  alignSelf:'center',
  backgroundColor:primary,
  justifyContent:"center",
  alignItems:'center',
  height:RFValue(50)
 },


secondTabContainer:{
 flexDirection:"row",
 justifyContent:'space-between',
 alignItems:'center',
 width:'100%',
 
},

secondTab:{
 flex:1,


},

secondTabBtn:{
 borderRadius:RFValue(17),
 marginHorizontal: RFValue(5),
 justifyContent:"center",
 alignItems:'center',
  height:RFValue(30),
   borderColor:primary,
 borderWidth:1,
},
itemBtnText:{
 color:primary,
 fontSize:RFValue(10),
 fontFamily:"Poppins-Regular",
 textAlign:'center',
 marginTop:3
},


overViewAddressLine:{
  width:'100%',
  flexDirection:'row',
  justifyContent:"space-between",
  alignItems:'center',
  borderTopWidth:1,
  paddingHorizontal:percentagePadding,
  
},
addressContainer:{
  flex: 3,              // take available space
  marginHorizontal: 20, 
},

smallMap:{
  
  aspectRatio:1,
  flex: 1, 
},

overOperationLine:{
  width:'100%',
  flexDirection:'row',

  alignItems:'center',
  borderTopWidth:1,
  padding:percentagePadding,
  
},

lineText:{
  fontSize:RFValue(15),
  fontFamily:'Poppins-Regular',
  
 },

 recommendLine:{
  width:"100%",
    borderTopWidth:1,
    justifyContent:'center',
    alignItems:'center',
    minHeight:RFValue(120),
    padding:RFValue(20)

 },

 recommendBtnContainer:{
  width:"100%",
  flexDirection:"row",
  marginVertical:RFValue(10),
  justifyContent:"space-around",
  paddingHorizontal:'10%'
 },
  recommendBtn:{
   justifyContent:'center',
   alignItems:'center',
   borderWidth:1,
   borderRadius:RFValue(6),
   
   padding:RFValue(10)

 },
 largeMap:{

  width:'100%',
  height:RFValue(300),

 },
 textLogoLine:{
  width:'100%',
  padding:percentagePadding,
  flexDirection:"row",
  justifyContent:'space-between',
  alignItems:'center',
  borderBottomWidth:1

 },
textKmLine:{
  width:'100%',
  padding:percentagePadding,
  flexDirection:"row",
  justifyContent:'space-between',
  alignItems:'flex-start',
  borderBottomWidth:1
 },

 textLogoContainer:{
flex:1,
alignItems:'flex-start'
 },

 servicesContainer:{
  width:'100%',
  borderBottomWidth:1,
  padding:percentagePadding
 },
 lineHeader:{
fontFamily:'Poppins-Bold',fontSize:RFValue(22),
 },

lineBtn:{
  width:'100%',
  justifyContent:'center',
  alignItems:'center',
  height:standardHeight,
  borderRadius:standardBorderRadius,
  borderWidth:1,
  marginVertical:RFValue(8)
},

largeStarContainer:{
  width:'100%',
  flexDirection:"row",
  justifyContent:'space-between',
  alignItems:'center'

},

reviewContainer:{
  width:'100%',
  padding:percentagePadding
},

reviewInput:{
  width:"100%",
  height:RFValue(200),
  borderRadius:standardBorderRadius,
  borderWidth:1,
  marginVertical:RFValue(40)
}

})

export default index