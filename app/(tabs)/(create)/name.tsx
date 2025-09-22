import { View, Text,StyleSheet,Dimensions,KeyboardAvoidingView,ScrollView,Platform } from 'react-native'
import React,{useState,useEffect} from 'react'
import { InnerLayOut } from '@/components/LayOut'
import { LightHeader,ColoredHeader, } from '@/components/Header'
import { SubmitBtn,InputField,InputType, percentagePadding } from '@/components/Element'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { RFValue } from 'react-native-responsive-fontsize'
import { useBusiness } from '@/store/business'
import { useRouter } from 'expo-router'

const {width}=Dimensions.get('window')


const index = () => {

  const router=useRouter()
  const {business,setBusiness}=useBusiness()
  const [isSubmitClicked,setIsSubmitClicked]= useState<boolean>(false)
  const [isActive,setIsActive]=useState<boolean>(false)
 
const handleSubmit=()=>{
  setIsSubmitClicked(true)

   if (!isActive) return
 router.push('/(tabs)/(create)/(category)')

}








const params:InputType={
 label:'Name',
  text:business.name,
  setText:(value:string)=>setBusiness({...business,name:value}), 
   isSubmitClicked, 
   type:"text",
   instance:'registeration'
    }



useEffect(()=>{

if (business.name.length>3){
  setIsActive(true)
}

else{
  setIsActive(false)
}
   
},[business.name])



  return (
   
   <InnerLayOut>

          <View style={{width:'100%',marginVertical:RFValue(10)}}>
<LightHeader text={'List Business'} />
          </View>
          
          <InputField {...params} />

          <View style={styles.contentContainer}>

           <View style={{width:'100%'}}>
<View style={styles.modal}>
              <View style={{ justifyContent: 'flex-start', marginRight: 0, width: '15%' }}>
                <MaterialCommunityIcons color={'#FEAA34'} size={0.08 * width} name='alert-circle-outline' />
              </View>

              <View style={{ justifyContent: 'flex-start', width: '75%' }}>
                <Text style={styles.modalText}>
                  Please only suggest business that you know exist. All submissions are subject to reviews before appearing on the app. Business owners may later claim their business and provide official details. False or misleading submission will be removed.
                </Text>
              </View>
            </View>
           </View>

          

            <View style={styles.btnContainer}>
              <SubmitBtn isActive={isActive} type='normal' trigger={handleSubmit} text='Continue' />
            </View>
          </View>
       
   </InnerLayOut>
    


   
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
   
    justifyContent: 'flex-end',
    
  },
  btnContainer: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 20,
   
    
  },
  modal: {
    width: '100%',
    paddingHorizontal: '2%',
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#FEAA341A',
    marginBottom: 30,
    flexDirection: 'row',
    borderRadius: 10,
  },
  modalText: {
    fontFamily: 'Poppins-Regular',
    textAlign: 'justify',
    fontSize: RFValue(10)
  }
});
export default index