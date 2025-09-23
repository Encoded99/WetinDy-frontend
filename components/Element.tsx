
import { StyleSheet, TouchableOpacity,Text,View,TextInput,Modal,FlatList,Dimensions, Pressable} from 'react-native';
import { primary,lightPrimary } from '@/custom';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { RFValue } from 'react-native-responsive-fontsize';
import { useGlobal } from '@/app/context';
import { ComponentProps, useState } from 'react';
import React,{Dispatch,SetStateAction} from 'react';
import { title } from '@/custom';
import country from '../data/countries_with_flags.json'
import { useRegister } from '@/store/auth';
import { useRouter } from 'expo-router';
import { CategoryInstanceType, useBusiness,useCategory } from '@/store/business';



const {height,width}=Dimensions.get('window')




type IconComponentType = ComponentProps<typeof MaterialCommunityIcons>["name"];



export const SubmitBtn=({text,trigger,type,icon,isActive}:{text:string,trigger:()=>void,type:"normal"|"white",icon?:IconComponentType,isActive:boolean})=>{
const {background}= useGlobal()

  const btnColor=type==='normal'?'white' : 'black'
  const btnBackGround=type==='normal'?primary:background

  const handlePress=()=>{
    
    trigger()
  }


  return (
    <>

    <TouchableOpacity style={[styles.submitBtn,{backgroundColor:isActive? btnBackGround:lightPrimary,borderColor:isActive?primary:lightPrimary}]} onPress={handlePress}>
         
         {
          icon && (
            <>
             <MaterialCommunityIcons size={RFValue(20)} color={btnColor} name={icon}/>
            </>
          )
         }
     
          <Text style={[styles.btnText,{color:btnColor}]}>
            {text}
          </Text>
    </TouchableOpacity>
    
    </>
  )

}


export const Slogan=({text}:{text:string})=>{

  const  {textColor}=useGlobal()

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
  icon?:IconComponentType,
 isSubmitClicked:boolean,
 type:"email"|"password"|"text"|"telephone",
 instance:"registeration"|"normal",
 isOptional?:boolean
 

}

export   const emailRegex = /^\S+@\S+\.\S+$/;
 export  const passwordRegex = /^(?=.*[A-Za-z])(?=.*[\d@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/;

export const phoneRegex = /^\d+$/;

export const InputField=React.memo((params:InputType)=>{
  const {textColor,greyText,darkGreyText}= useGlobal()
  const {text,label,setText,icon,type,isSubmitClicked,instance,isOptional}=params
  const [showPassword,setShowPassword]=useState<boolean>(false)

  const isEmailFormat=emailRegex.test(text);
 
 const isPasswordFormat=passwordRegex.test(text);
  

  return(
    <>

    <View style={styles.inputContainer}>
      <Text style={[styles.inputLabel,{color:darkGreyText}]}>{label}</Text>
       <View style={{width:"100%",position:"relative"}}>

       

        {
          type!=='password' ? (
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
  icon && (
    <>
    
     {
                 type!=='password' ? (
          <>
         <MaterialCommunityIcons style={styles.inputLogo} size={RFValue(25)} color={textColor}  name={icon}/>  
          </>
        ):(
          <>
          <MaterialCommunityIcons style={styles.inputLogo} size={RFValue(25)} color={textColor} onPress={()=>setShowPassword(!showPassword)}  name={showPassword?'eye-off-outline':"eye-outline"}/>  
          </>
        )
      }


    
    </>
  )
}
     

    
      

     
       </View>
      
   

        {
               isSubmitClicked && text==='' &&  !isOptional  && (
                <>
                 <View style={styles.emptyFieldContainer}>
      <MaterialCommunityIcons color='red' size={RFValue(18)} name='alert-circle-outline'/>
     <Text style={styles.warningText}>This field can not be empty</Text>
       </View>
                </>
               )
            }



             {
               isSubmitClicked && type==='email' && text!=='' && !isEmailFormat &&  instance==='registeration' &&    (
                <>
                 <View style={styles.emptyFieldContainer}>
      <MaterialCommunityIcons color='red' size={RFValue(18)} name='alert-circle-outline'/>
     <Text style={styles.warningText}>Please enter a valid email address</Text>
       </View>
                </>
               )
            }



               {
               isSubmitClicked && type==='password' && text!=='' && !isPasswordFormat && instance==='registeration' && (
                <>
                 <View style={styles.emptyFieldContainer}>
     <Text style={styles.warningText}>Password must be at least 8 characters long and include at least one letter (uppercase or lowercase) and at least one number or special character. 
Allowed special characters are: @, $, !, %, *, ?, &, and .</Text>
       </View>
                </>
               )
            }

    </View>
    </>
  )
})

type DescriptionType={
  placeholder:string,
  text:string,
  setText:(value:string)=>void,
 isSubmitClicked:boolean,

}

export const DescriptionField=React.memo((params:DescriptionType)=>{
  const {textColor,greyText,darkGreyText}= useGlobal()
  const {text,setText,placeholder,isSubmitClicked}=params
  


  return(
    <>

    <View style={styles.inputContainer}>
     
        <TextInput style={[styles.largeInput,{borderColor:greyText,color:textColor}]}
           value={text}
            multiline={true}
            numberOfLines={4}
           onChangeText={(value)=>{setText(value);}}
            textAlignVertical='top'
 placeholderTextColor={darkGreyText}
   placeholder={placeholder}
           /> 
            {
               isSubmitClicked && text==='' && (
                <>
                 <View style={styles.emptyFieldContainer}>
      <MaterialCommunityIcons color='red' size={RFValue(18)} name='alert-circle-outline'/>
     <Text style={styles.warningText}>This field can not be empty</Text>
       </View>
                </>
               )
            }

      </View>
    </>
  )
})




export const SmallInputField=React.memo((params:InputType)=>{
  const {textColor,greyText,darkGreyText}= useGlobal()
  const {text,label,setText,icon,type,isSubmitClicked,}=params
  

 

  return(
    <>

    <View style={styles.smallInputContainer}>
      <Text numberOfLines={1} style={[styles.inputLabel,{color:darkGreyText}]}>{label}</Text>
     

       

         <TextInput style={[styles.textInput,{borderColor:greyText,color:textColor}]}
           value={text}
           onChangeText={(value)=>{setText(value);}}/> 

    
      

     
      
   

        {
               isSubmitClicked && text==='' && (
                <>
                 <View style={styles.emptyFieldContainer}>
      <MaterialCommunityIcons color='red' size={RFValue(18)} name='alert-circle-outline'/>
     <Text style={styles.warningText}>This field can not be empty</Text>
       </View>
                </>
               )
            }

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
    setRegisterData({prefix:item.dial_code,country:item.name})
    

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
  const {greyText,darkGreyText,}= useGlobal()
  const {text,label,setText,isSubmitClicked,instance,type}=params
 const [isVisible,setIsVisible]=useState<boolean>(false)
const [selectedCountry,setSelectedCountry]=useState<CountryType>(initialCountrySelected)
const isPhoneFormat=phoneRegex.test(text);



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
           <TextInput style={[styles.midTextInput,{borderColor:greyText}]}
           value={text}
           keyboardType="numeric" 
           onChangeText={(value)=>{setText(value);}}/> 
          
       </View>
      
   
             {
               isSubmitClicked && type==='telephone' && text!=='' && !isPhoneFormat &&  instance==='registeration' && (
                <>
                 <View style={styles.emptyFieldContainer}>
      <MaterialCommunityIcons color='red' size={RFValue(18)} name='alert-circle-outline'/>
     <Text style={{fontFamily:"Poppins-Bold",color:'red',fontSize:RFValue(14),marginLeft:5}}>Please enter a valid phone number</Text>
       </View>
                </>
               )
            }
    </View>
    </>
  )
})







export const HalfInputField=React.memo((params:InputType)=>{
  const {greyText,darkGreyText}= useGlobal()
  const {text,label,setText,type,isSubmitClicked,instance}=params


  const isEmailFormat=emailRegex.test(text);
 
 const isPasswordFormat=passwordRegex.test(text);
  

  return(
    <>

    <View style={styles.inputContainer}>
      <Text style={[styles.inputLabel,{color:darkGreyText}]}>{label}</Text>
       <View style={{width:"100%",position:"relative"}}>

       
  <TextInput style={[styles.textInput,{borderColor:greyText}]}
           value={text}
           onChangeText={(value)=>{setText(value);}}/> 


    
      

     
       </View>
      
   

        {
               isSubmitClicked && text==='' && (
                <>
                 <View style={styles.emptyFieldContainer}>
      <MaterialCommunityIcons color='red' size={RFValue(18)} name='alert-circle-outline'/>
     <Text style={styles.warningText}>This field can not be empty</Text>
       </View>
                </>
               )
            }



             {
               isSubmitClicked && type==='email' && text!=='' && !isEmailFormat &&  instance==='registeration' && (
                <>
                 <View style={styles.emptyFieldContainer}>
      <MaterialCommunityIcons color='red' size={RFValue(18)} name='alert-circle-outline'/>
     <Text style={styles.warningText}>Please enter a valid email address</Text>
       </View>
                </>
               )
            }



               {
               isSubmitClicked && type==='password' && text!=='' && !isPasswordFormat && instance==='registeration' && (
                <>
                 <View style={styles.emptyFieldContainer}>
     <Text style={styles.warningText}>Password must be at least 8 characters long and include at least one letter (uppercase or lowercase) and at least one number or special character. 
Allowed special characters are: @, $, !, %, *, ?, &, and .</Text>
       </View>
                </>
               )
            }

    </View>
    </>
  )
})



type ImageFieldType={

  isSubmitClicked:boolean,
  onPick:()=>void
}

export const ImageField=React.memo((param:ImageFieldType)=>{
  const {textColor,greyText,darkGreyText}= useGlobal()
  const {isSubmitClicked,onPick} =param

  


  return(
    <>

    <View style={styles.inputContainer}>
   
       
           <View  style={[styles.imageContainer,{borderColor:greyText,backgroundColor:greyText,}]}>

            <MaterialCommunityIcons color={textColor} size={RFValue(45)} name='camera-outline'  onPress={onPick}/>
            <Text style={{color:textColor,fontSize:RFValue(16),fontFamily:'Poppins-Regular'}}  onPress={onPick}>Add Photos</Text>
           </View>
      
        


           



             

    </View>
    </>
  )
})



export const ButtonWithSkip=({skipFunction,continueFunction,isActive}:{skipFunction:()=>void,continueFunction:()=>void,isActive:boolean})=>{


  return (
    <>

   
    <View style={styles.skipContainer}>

       <Text style={styles.skipText} onPress={skipFunction}>Skip</Text>


       <TouchableOpacity style={[styles.skipBtn,{backgroundColor:isActive?primary:lightPrimary}]} onPress={continueFunction}>
          <Text style={styles.skipBtnText}>Continue</Text>
       </TouchableOpacity>

    </View>
    
    </>
  )
}





interface SearchSelectFieldType{

  text:string,
  setText:Dispatch<SetStateAction<string>>,

  label:string,
  setShowModal:Dispatch<SetStateAction<boolean>>,
}


export const SearchSelectField=React.memo((params:SearchSelectFieldType)=>{
  const {textColor,greyText,darkGreyText}= useGlobal()
  const {label,setShowModal,setText,text}=params

  

  return(
    <>

    <View style={styles.inputContainer}>


      <Text style={[styles.inputLabel,{color:darkGreyText}]}>{label}</Text>
       <View style={[styles.searchSelectFieldContainer,{borderColor:greyText}]}>

       



        <TextInput style={[styles.searchSelectInput]}
           value={text}
           onChangeText={(value)=>{setText(value);}}
             placeholder='Search for categories'
           
           
           /> 

 
         <Pressable style={styles.dropDownContainer}  onPress={()=>setShowModal(true)}>
           <MaterialCommunityIcons  size={RFValue(25)} color={textColor}  name={'chevron-down'}/>
         </Pressable>
         
       </View>
    </View>
    </>
  )
})








export const DropDown=React.memo(({label,value}:{label:string,value:CategoryInstanceType})=>{
  const {tempCategoriesName,claimMode}=useBusiness()
  const {textColor,greyText,darkGreyText}= useGlobal()
  const {setCategoryInstance,selectedCategoryData}=useCategory()
  const router= useRouter()

  const isInstanceSelected= selectedCategoryData.find((item)=>item.instance===value)
  
const handleClick=()=>{

 


setCategoryInstance(value)
 router.push('/(tabs)/(create)/(category)/main')
}

const placeHolderOne= claimMode && tempCategoriesName.categoryOne?tempCategoriesName.categoryOne:'e.g Food'
const placeHolderTwo= claimMode && tempCategoriesName.categoryTwo?tempCategoriesName.categoryTwo:'e.g Food'
const placeHolderThree= claimMode && tempCategoriesName.categoryThree?tempCategoriesName.categoryThree:'e.g Food'

const finalPlaceHolder=value==='category-1'?placeHolderOne:value==='category-2'?placeHolderTwo:placeHolderThree
  

  return(
    <>

    <View style={styles.inputContainer}>
      <Text style={[styles.inputLabel,{color:darkGreyText}]}>{label}</Text>
       <TouchableOpacity style={[styles.dropDownFieldContainer,{borderColor:greyText}]}
       onPress={handleClick}
       >
        <Text style={{color:isInstanceSelected?textColor:darkGreyText,fontSize:RFValue(14),fontFamily:'Poppins-Regular'}}> {!isInstanceSelected?finalPlaceHolder:isInstanceSelected.name}</Text>

        <MaterialCommunityIcons name='chevron-right' size={RFValue(30)} color={textColor}/>

       </TouchableOpacity>
    </View>
    </>
  )
})


interface SearchFieldType{

  text:string,
  setText:Dispatch<SetStateAction<string>>;
  handleCancel:()=>void,
  handleSearch:()=>void,
  placeholder:string
}






export const SearchField=React.memo((params:SearchFieldType)=>{
  const {textColor,greyText,}= useGlobal()
  const {text,setText,handleCancel,handleSearch,placeholder}=params
  
  

  return(
    <>

    <View style={styles.inputContainer}>
       <View style={[styles.searchSelectFieldContainer,{borderColor:greyText}]}>

       
        <TextInput style={[styles.searchInput,{width:'100%',paddingHorizontal:'15%'}]}
           value={text}
           onChangeText={(value)=>{setText(value);}}
         placeholder={placeholder}
           /> 

           <MaterialCommunityIcons style={styles.searchLogo} size={RFValue(25)} color={textColor}  name={'magnify'}
                 onPress={handleSearch}
                 />
 
             
             {
              text && (
                <>
                 <MaterialCommunityIcons style={styles.inputLogo} size={RFValue(25)} color={textColor}  name={'close-circle'}
                 onPress={handleCancel}
                 />
                </>
              )
             }
          
        
         
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
  const router=useRouter()
  return (
    <>
    <View style={{width:'100%',marginVertical:RFValue(30)}}>
      {
        link==='sign-in' && (
          <>
           <Text style={[styles.termText,{color:textColor}]}>Already have an account? 
    
    <Text style={{color:primary,fontFamily:'Poppins-Bold'}} onPress={()=>router.push('/(auth)/(sign-in)')}> Sign in </Text>
    </Text>
          </>
        )
      }

       {
        link==='sign-up' && (
          <>
           <Text style={[styles.termText,{color:textColor}]}>Don’t have an account? 
    
    <Text style={{color:primary,fontFamily:'Poppins-Bold'}}
    
    onPress={()=>router.push('/(auth)/(register)')}
    > Sign up for {title}</Text>
    </Text>
          </>
        )
      }
   
    </View>

    </>
  )
}





interface TextCounterProps {
  text: string;
  maxLength: number;
  onExceed: () => void;
  onValid: () => void;
}

export const TextCounter: React.FC<TextCounterProps> = ({ text, maxLength, onExceed, onValid }) => {
  const {textColor}=useGlobal()


  React.useEffect(() => {
    if (text.length > maxLength) {
      onExceed();
    } else {
      onValid();
    }
  }, [text, maxLength, onExceed, onValid]);

  return (
    <Text style={[styles.counter,   { color:text.length>maxLength? "red":textColor }]}>
      {text.length}/{maxLength}
    </Text>
  );
};









export const standardHeight=RFValue(50)
export const percentagePadding='4%'
export const standardBorderRadius=10
export const standardPaddingTop=30

const styles = StyleSheet.create({


 counter: {
    textAlign: "right",
    fontFamily:"Poppins-Bold",
    fontSize:RFValue(13)
    
  },



  submitBtn:{
    width:"100%",
   
    height:standardHeight,
    backgroundColor:primary,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:standardBorderRadius,
    flexDirection:"row",
    borderWidth:2,
    
  },

 whiteBtn:{
    width:"100%",
    height:standardHeight,
    backgroundColor:primary,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:standardBorderRadius,
    flexDirection:"row"

  },



  btnText:{
    color:'white',
    fontFamily:'Poppins-Bold',
    fontSize:RFValue(16),
    marginLeft:4

  },

  sloganHeader:{
    
     width:'100%',
    flexDirection:'row',
    justifyContent:'flex-start',
   
   

  },

  sloganText:{
  fontFamily:'Poppins-Regular',
  fontSize:RFValue(13)

  },
  inputContainer:{
    width:'100%',
    alignSelf:"center",
   
  },

   
   smallInputContainer:{
    width:'50%',
    paddingHorizontal:percentagePadding,
   
  },
  inputLabel:{
    fontSize:RFValue(14),
    marginBottom:10,
  },
  textInput:{
    width:"100%",
    borderRadius:6,
    borderWidth:2,
       height:standardHeight,
       padding:8,
       fontSize:RFValue(16),
       fontFamily:'Poppins-Regular',
       textAlignVertical: "center", 
      
       
  },

   largeInput:{
    width:"100%",
    borderRadius:standardBorderRadius,
    borderWidth:2,
       height:standardHeight*4,
       padding:8,
       fontSize:RFValue(16),
       fontFamily:'Poppins-Regular',
       textAlignVertical: "center", 
      
       
  },


 

   imageContainer:{
    width:"100%",
    borderRadius:standardBorderRadius,
    borderWidth:2,
       padding:8,
       fontSize:RFValue(16),
       fontFamily:'Poppins-Regular',
      height:300,

      justifyContent:'center',
      alignItems:'center'
     
  },

  inputLogo:{
    position:'absolute',
    right:percentagePadding,
    top:"25%"

  },



   searchLogo:{
    position:'absolute',
    left:percentagePadding,
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
  
   midTextInput:{
    width:"63%",
    borderRadius:standardBorderRadius,
    borderWidth:2,
       height:standardHeight,
       padding:8,
       fontSize:RFValue(16),
 fontFamily:'Poppins-Regular',
  textAlignVertical: "center", 

  },
  selectField:{
   width:"35%",
     borderRadius:6,
    borderWidth:2,
       height:standardHeight,
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

  },
  emptyFieldContainer:{
    width:'100%',
    flexDirection:'row',
    alignItems:"center",
    marginTop:6
  },
  warningText:{
    fontFamily:"Poppins-Bold",color:'red',fontSize:RFValue(11),marginLeft:5
  },

  skipContainer:{
    width:"100%",
    height:standardHeight,
    flexDirection:"row",
    justifyContent:'space-between',
    alignItems:'center',
  },
  skipText:{
    fontSize:RFValue(18),
    color:primary,
    fontFamily:"Poppins-Bold",
  },
  skipBtn:{
    width:'40%',
    height:'100%',
    backgroundColor:primary,
    borderRadius:0.2*width,
    justifyContent:'center',
    alignItems:'center'

  },
  skipBtnText:{
    color:'white',
    fontFamily:"Poppins-Bold",
    fontSize:RFValue(17)
  },

  searchSelectFieldContainer:{
    width:'100%',
    alignSelf:"center",
    justifyContent:"center",
    flexDirection:"row",
   borderRadius:6,
 borderWidth:2,
  },


   searchSelectInput:{
    width:"80%",
       height:standardHeight,
       padding:8,
       fontSize:RFValue(16),
       fontFamily:'Poppins-Regular',
       textAlignVertical: "center", 
  
      
  },
   searchInput:{
    width:"100%",
       height:standardHeight,
       padding:8,
       fontSize:RFValue(16),
       fontFamily:'Poppins-Regular',
       textAlignVertical: "center", 
  
      
  },

  dropDownContainer:{
    width:'20%',
    justifyContent:"center",
    alignItems:"center",
  
      height:standardHeight,
   
  },

  dropDownFieldContainer:{
    width:'100%',
     padding:'2%',
      borderRadius:standardBorderRadius,
      height:standardHeight,
      justifyContent:'space-between',
      alignItems:'center',
    borderWidth:2,
    flexDirection:'row'
  },

  


});
