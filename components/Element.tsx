
import { StyleSheet, TouchableOpacity,Text,View,TextInput,Modal,FlatList,Dimensions} from 'react-native';
import { primary } from '@/custom';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { RFValue } from 'react-native-responsive-fontsize';
import { useGlobal } from '@/app/context';
import { ComponentProps, useState } from 'react';
import React,{Dispatch,SetStateAction} from 'react';
import { title } from '@/custom';
import country from '../data/countries_with_flags.json'
import { useRegister } from '@/store/auth';

const {height}=Dimensions.get('window')




type IconComponentType = ComponentProps<typeof MaterialCommunityIcons>["name"];



export const SubmitBtn=({text,trigger,type,icon}:{text:string,trigger:()=>void,type:"normal"|"white",icon?:IconComponentType})=>{
const {background}= useGlobal()

  const btnColor=type==='normal'?'white' : 'black'
  const btnBackGround=type==='normal'?primary:background



  return (
    <>

    <TouchableOpacity style={[styles.submitBtn,{backgroundColor:btnBackGround,}]} onPress={trigger}>

      <MaterialCommunityIcons size={RFValue(20)} color={btnColor} name={icon}/>
          <Text style={[styles.btnText,{color:btnColor}]}>
            {text}
          </Text>
    </TouchableOpacity>
    
    </>
  )

}


export const Slogan=({text}:{text:string})=>{

  const  {textColor,greyText}=useGlobal()

  return (
    <>
    <View style={styles.sloganHeader}>
         <Text style={[styles.sloganText,{color:textColor}]}>{text}</Text>
    </View>
    </>
  )
}

export type InputType={
  label:string,
  text:string,
  setText:(value:string)=>void,
  icon:IconComponentType,
 isPassword?:boolean

}

export const InputField=React.memo((params:InputType)=>{
  const {textColor,greyText,darkGreyText}= useGlobal()
  const {text,label,setText,icon,isPassword}=params
  const [showPassword,setShowPassword]=useState<boolean>(false)
  return(
    <>

    <View style={styles.inputContainer}>
      <Text style={[styles.inputLabel,{color:darkGreyText}]}>{label}</Text>
       <View style={{width:"100%",position:"relative"}}>

       

        {
          isPassword===undefined ? (
            <>
           <TextInput style={[styles.textInput,{borderColor:greyText}]}
           value={text}
           onChangeText={(value)=>{setText(value);}}/> 
            </>
          ):(
            <>
            <TextInput style={[styles.textInput,{borderColor:greyText}]}
           value={text}
           secureTextEntry={!showPassword}
           onChangeText={(value)=>{setText(value);}}/> 
            
            </>
          )
        }


      {
        isPassword===undefined ? (
          <>
         <MaterialCommunityIcons style={styles.inputLogo} size={RFValue(25)} color={textColor}  name={icon}/>  
          </>
        ):(
          <>
          <MaterialCommunityIcons style={styles.inputLogo} size={RFValue(25)} color={textColor} onPress={()=>setShowPassword(!showPassword)}  name={showPassword?'eye-off-outline':"eye-outline"}/>  
          </>
        )
      }

     
       </View>
      

    </View>
    </>
  )
})




export  type CountryType={
  name:string,
  code:string,
  flag:string,
  dial_code:string,


}


type CountryPickerType = {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  selectedCountry: CountryType;
  setSelectedCountry: Dispatch<SetStateAction<CountryType>>;
};

const CountryPicker=(param:CountryPickerType)=>{
  const {setRegisterData}=useRegister()
    const {background,textColor,}= useGlobal()
    const [countryData, setCountryData] = useState<CountryType[]>(country)

  const {isVisible,selectedCountry,setSelectedCountry,setIsVisible}=param


  const handlePress=(item:CountryType)=>{


    setSelectedCountry(item)
    setRegisterData({prefix:item.dial_code})
    

  }


const RenderItem=({item}:{item:CountryType})=>{
  

  return (
    <>
    <TouchableOpacity style={styles.countryLine} onPress={()=>handlePress(item)}>
      <View style={{width:'100%',flexDirection:'row',justifyContent:"flex-start",alignItems:'center'}}>
        <Text style={styles.countryText}>{item.flag}</Text>
      <Text style={[styles.countryText,{color:textColor}]}>{item.name}</Text>
         <Text style={[styles.countryText,{color:textColor}]}>{item.dial_code}</Text>



    {
      selectedCountry.name===item.name && (
        <>
          <MaterialCommunityIcons name='check-bold' size={RFValue(25)} color={primary}/>
        </>
      )
    }
    

      </View>

    
    
      
    </TouchableOpacity>
    
    </>
  )
}



  return (
    <>
    <Modal
     visible={isVisible}
     animationType='slide'
     transparent={true}
    >

<View style={styles.modalBackground}>

   <View style={[styles.modalContainer,{backgroundColor:background}]}>

    <View style={{flex:1,width:"100%",padding:"6%"}}>
<View style={styles.countryHeader}>
             <Text style={{fontSize:RFValue(20),color:textColor,fontFamily:'Poppins-Bold'}}>Select Country Code</Text>
          </View>


      <FlatList
        keyExtractor={item => item.name}
        data={countryData}
        renderItem={RenderItem}
        showsVerticalScrollIndicator={false}
      />
      <View style={styles.countryBottom}>
             <Text style={{fontSize:RFValue(18),color:primary,fontFamily:'Poppins-Bold'}}  onPress={()=>setIsVisible(false)}>Okay</Text>
          </View>
      
    </View>
    
   </View>
</View>

     

    </Modal>
    </>
  )
}



export const initialCountrySelected={
  name:"Canada",
  code:'CA',
  flag:'🇨🇦',
  dial_code:"+1",

}

export const SelectInput=React.memo((params:InputType)=>{
  const {greyText,darkGreyText,textColor}= useGlobal()
  const {text,label,setText,}=params
 
   const [isVisible,setIsVisible]=useState<boolean>(false)
const [selectedCountry,setSelectedCountry]=useState<CountryType>(initialCountrySelected)

const selectorParams={
    isVisible,
    setIsVisible,
    selectedCountry,
    setSelectedCountry,

}
  
  return(
    <>
    <CountryPicker {...selectorParams}/>
    <View style={styles. inputContainer}>
      <Text style={[styles.inputLabel,{color:darkGreyText}]}>{label}</Text>
       <View style={styles.selectInputContainer}>
        <View style={[styles.selectField,{borderColor:greyText}]}>
          <View style={styles.numberFlagContainer}>
             <Text  style={{marginRight:10,fontSize:RFValue(16)}}>{selectedCountry.flag}</Text>
               <Text style={{color:darkGreyText,fontSize:RFValue(16)}}>{selectedCountry.dial_code}</Text>
          </View>
         
               <MaterialCommunityIcons size={RFValue(25)} color={darkGreyText} name={'chevron-down'} onPress={()=>setIsVisible(true)}/>


        </View>
           <TextInput style={[styles.smallTextInput,{borderColor:greyText}]}
           value={text}
           onChangeText={(value)=>{setText(value);}}/> 
      
       </View>
      

    </View>
    </>
  )
})




export const Terms=()=>{
  const {textColor}=useGlobal()
  return (
    <>
    <View style={{width:'90%',marginVertical:RFValue(30),alignSelf:'center'}}>
    <Text style={[styles.termText,{color:textColor}]}>{`By continuing, you agree to ${title}`}
    
    <Text style={{color:primary,fontFamily:'Poppins-Bold'}}> Terms & Condition </Text>
      and <Text style={{color:primary,fontFamily:'Poppins-Bold'}}> Privacy Policy</Text>
    </Text>
    </View>

    </>
  )
}


export const AccountStatus=({link}:{link:'sign-in'|'sign-up'})=>{
  const {textColor}=useGlobal()
  return (
    <>
    <View style={{width:'100%',marginVertical:RFValue(30)}}>
      {
        link==='sign-in' && (
          <>
           <Text style={[styles.termText,{color:textColor}]}>Already have an account? 
    
    <Text style={{color:primary,fontFamily:'Poppins-Bold'}}> Sign in </Text>
    </Text>
          </>
        )
      }

       {
        link==='sign-up' && (
          <>
           <Text style={[styles.termText,{color:textColor}]}>Don’t have an account? 
    
    <Text style={{color:primary,fontFamily:'Poppins-Bold'}}> Sign up for {title}</Text>
    </Text>
          </>
        )
      }
   
    </View>

    </>
  )
}

const wantedHeight=RFValue(55)

const styles = StyleSheet.create({
  submitBtn:{
    width:"90%",
    height:wantedHeight,
    backgroundColor:primary,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,
    flexDirection:"row",
    borderWidth:2,
    borderColor:primary

  },

 whiteBtn:{
    width:"90%",
    height:wantedHeight,
    backgroundColor:primary,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,
    flexDirection:"row"

  },



  btnText:{
    color:'white',
    fontFamily:'Poppins-Bold',
    fontSize:RFValue(18),
    marginLeft:4

  },

  sloganHeader:{
    
     width:'100%',
    flexDirection:'row',
    justifyContent:'flex-start',
    paddingLeft:"4%"

  },

  sloganText:{
  fontFamily:'Poppins-Regular',
  fontSize:RFValue(13)

  },
  inputContainer:{
    width:'100%',
    alignSelf:"center",
    paddingHorizontal:"4%",
   
  },
  inputLabel:{
    fontSize:RFValue(14),
    marginBottom:10,
  },
  textInput:{
    width:"100%",
    borderRadius:6,
    borderWidth:2,
       height:wantedHeight,
       padding:8,
       fontSize:RFValue(18)

  },

  inputLogo:{
    position:'absolute',
    right:"2%",
    top:"25%"

  },
  termText:{
    fontSize:RFValue(13),
  
    textAlign:"center",
    fontFamily:'Poppins-Regular'
  },

  selectInputContainer:{
        width:'100%',
      flexDirection:'row',
      justifyContent:"space-between",
      alignItems:'center',

  },
  smallTextInput:{
    width:"63%",
    borderRadius:6,
    borderWidth:2,
       height:wantedHeight,
       padding:8,
       fontSize:RFValue(18)

  },
  selectField:{
   width:"35%",
     borderRadius:6,
    borderWidth:2,
       height:wantedHeight,
       padding:8,
       fontSize:RFValue(18),
       flexDirection:'row',
       alignItems:'center',
       justifyContent:"space-between"
  },
  numberFlagContainer:{
    flexDirection:'row',
       alignItems:'center',
  },
   modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', 
  },

  modalContainer: {
    width: '90%',
    height:height*0.85,
    borderRadius: 10,
    alignItems: 'center',

  },

  countryLine:{
    width:"100%",
    height:50,
    flexDirection:'row',
    justifyContent:"space-between",
    alignItems:'center'
   
    
  },
  countryHeader:{
    width:"100%",
    height:50,
  },

   countryBottom:{
    width:"100%",
    height:50,
    flexDirection:"row",
    justifyContent:'flex-end',
    alignItems:'center',
  
  },

  countryText:{
    fontSize:RFValue(17),
    marginRight:8,

  }
});
