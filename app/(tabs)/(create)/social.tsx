import { View, StyleSheet,ScrollView } from 'react-native'
import React,{useState,useEffect} from 'react'
import { InnerLayOut } from '@/components/LayOut'
import { LightHeader,ColoredHeader, } from '@/components/Header'
import { InputField,InputType,Slogan, ButtonWithSkip} from '@/components/Element'
import { api,apiUrl } from '@/functions/axios'
import { errorOne ,notFoundError} from '@/custom'
import { CircleLoader } from '@/components/ui/Loader'
import { RFValue } from 'react-native-responsive-fontsize'
import { useBusiness } from '@/store/business'
import { useRouter } from 'expo-router'
import { useAuth } from '@/store/auth'



const index = () => {
    const {setResponseMessage,setIsError,}=useAuth()
  const router=useRouter()
  const {business,setBusiness,claimMode}=useBusiness()
  const [isSubmitClicked,setIsSubmitClicked]= useState<boolean>(false)
  const [isActive,setIsActive]=useState<boolean>(false);
  const [isLoading,setIsLoading]=useState<boolean>(false)
  const instance='registeration'
 
const skipFunction=()=>{
  setIsSubmitClicked(true)

   
  router.push('/(tabs)/(create)/photo')

}





const handleSubmit=async()=>{

 if (claimMode){
     router.push('/(tabs)/(create)/photo')
    return
  }








  if (!isActive) return
setIsLoading(true)
  try{


     const data={
    x:business?.social?.x,
    facebook:business?.social?.facebook,
    instagram:business?.social?.instagram,

   }


   const url=`${apiUrl}/business/check-business-social`

  await api.post(url,data)


 
  router.push('/(tabs)/(create)/photo')



  }
catch(err:any){

   setIsError(true)


  if (err?.response?.status===404){
   
    setResponseMessage(notFoundError)
    setIsLoading(false)
    return
  }

    if (err?.response?.data){
     
    setResponseMessage(err?.response?.data)
    setIsLoading(false)
    return
    }
  
    setResponseMessage(errorOne)

}

finally{
  setIsLoading(false)
}
}










type InputArrayType={
  _id:number,
  params:InputType
}



const InputArray:InputArrayType[]=[



    {
    _id:1,
    params:{
 label:'Facebook Link',
  text:business?.social?.facebook ||  '',
  icon:"facebook",
  setText:(value:string)=>setBusiness({...business,social:{...business.social,facebook:value?value:undefined}}), 
   isSubmitClicked, 
   type:"text",
   instance
    }

  },


    {
    _id:2,
    params:{
 label:'X Link',
  text:business?.social?.x || '',
  icon:"alpha-x-box",
  setText:(value:string)=>setBusiness({...business,social:{...business.social,x:value?value:undefined}}), 
   isSubmitClicked, 
   type:"text",
   instance
    }

  },

  {
    _id:3,
    params:{
 label:'Instagram Link ',
  text:business?.social?.instagram || '',
  icon:"instagram",
  setText:(value:string)=>setBusiness({...business,social:{...business.social,instagram:value?value:undefined}}), 
   isSubmitClicked, 
   type:"text",
   instance
    }

  },
    

  

]





const params={
  skipFunction:skipFunction,
  continueFunction:handleSubmit,
 isActive
}




useEffect(()=>{

  if (business?.social?.facebook || business?.social?.x || business?.social?.instagram){
    setIsActive(true)
  }

  else{
    setIsActive(false)
  }

},[business?.social])






  return (
    <InnerLayOut>
  <CircleLoader isLoading={isLoading}/>
      <ScrollView style={{width:'100%'}}>

 <LightHeader text={'List Business'}/>
 <ColoredHeader text='Input your social media handles' type='black'/>
 <Slogan  text={'This will help user to further discover you across all social media.'}/>



{
      InputArray.map((item,index)=>{
        return (
        
       <View style={{marginTop:RFValue(20)}} key={index}>
      <InputField {...item.params}/> 
      </View>
      
        )
      })
    }







      </ScrollView>
  

<View style={styles.btnContainer}>
  <ButtonWithSkip {...params}/>
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
    marginVertical:RFValue(30)
   },
   modal:{
    width:'100%',
    paddingHorizontal:'2%',
    paddingVertical:20,
    justifyContent:'center',
    alignItems:'flex-start',
    backgroundColor:'#FEAA341A',
    marginBottom:30,
    flexDirection:'row',
     borderRadius:10,
     

   },
   modalText:{
    fontFamily:'Poppins-Regular',
    textAlign:'justify',
    fontSize:RFValue(10)
   

   },
   backSubCategoryHeader:{
    width:"100%",
    flexDirection:"row",
    marginVertical:RFValue(10),
    alignItems:"center"
   }
})

export default index