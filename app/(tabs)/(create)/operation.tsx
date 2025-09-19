import { View, Text,ScrollView,StyleSheet, Pressable,Dimensions} from 'react-native'
import React, { useEffect, useState } from 'react'
import { InnerLayOut } from '@/components/LayOut'
import { LightHeader,ColoredHeader, } from '@/components/Header'
import { Slogan, } from '@/components/Element'
import { useGlobal } from '@/app/context'
import { RFValue } from 'react-native-responsive-fontsize'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useBusiness } from '@/store/business'
import { DayInfo } from '@/store/business'
import { primary } from '@/custom'
import { ButtonWithSkip } from '@/components/Element'
import { useRouter } from 'expo-router'


const {width}=Dimensions.get('window')


const RenderItem=({item,index,setIsActive}:{item:DayInfo,index:number,setIsActive: React.Dispatch<React.SetStateAction<boolean>>;})=>{

 
  const {setBusinessOperatingTime}=useBusiness()
    const {greyText,darkGreyText,textColor}=useGlobal()
  const [isOpenSelected,setIsOpenSelected]=useState<boolean>(false)
    const [iscloseSelected,setIsCloseSelected]=useState<boolean>(false)
 const [hideTimeSelector,setHideTimeSelector]=useState<boolean>(false)
 const [openTime,setOpenTime]=useState<string|null>(item.openTime)
 const [closeTime,setCloseTime]=useState<string|null>(item.closeTime)

const onPress=(param:'open'|'close',value:string)=>{
     setIsActive(true)

  if (param==='open'){
     const obj= {...item,openTime:value}

           setBusinessOperatingTime(obj,index)
           setIsOpenSelected(false)
           setOpenTime(value)
  } else{
     const obj= {...item,closeTime:value}

           setBusinessOperatingTime(obj,index)
           setIsCloseSelected(false)
           setCloseTime(value)
  }



}




const onToggle=(param:'open'|'close')=>{

  if (param==='open'){
     const obj= {...item,isOpen:false}
                   setBusinessOperatingTime(obj,index)
         
  } else{
     const obj= {...item,isOpen:true}

           setBusinessOperatingTime(obj,index)
      
  }


}





const timeMap = [
  "12:00AM", "12:30AM", "1:00AM", "1:30AM", "2:00AM", "2:30AM",
  "3:00AM", "3:30AM", "4:00AM", "4:30AM", "5:00AM", "5:30AM",
  "6:00AM", "6:30AM", "7:00AM", "7:30AM", "8:00AM", "8:30AM",
  "9:00AM", "9:30AM", "10:00AM", "10:30AM", "11:00AM", "11:30AM",
  "12:00PM", "12:30PM", "1:00PM", "1:30PM", "2:00PM", "2:30PM",
  "3:00PM", "3:30PM", "4:00PM", "4:30PM", "5:00PM", "5:30PM",
  "6:00PM", "6:30PM", "7:00PM", "7:30PM", "8:00PM", "8:30PM",
  "9:00PM", "9:30PM", "10:00PM", "10:30PM", "11:00PM", "11:30PM"
];


const reset=()=>{
  setHideTimeSelector(false)
  setIsCloseSelected(false)
  setIsOpenSelected(false)
}





  return (
    <>

    <Pressable style={[styles.line,{borderBottomColor:greyText}]} key={item.name} onPress={reset}>

 <View style={[styles.firstLine,]}>
  <Text style={styles.daysText}>
     {item.name}
  </Text>

  <View style={styles.toggleContainer}>

    <Text style={[styles.status,{color:item.isOpen?"green":"red"}]}>{item.isOpen?'Open':'Closed'}</Text>


{
  item.isOpen ? (
    <>
    <MaterialCommunityIcons size={RFValue(40)} color={darkGreyText} name={'toggle-switch-off'}  onPress={()=>onToggle('open')} />

    </>
  ):(
    <>
       <MaterialCommunityIcons size={RFValue(40)} color={darkGreyText} name={'toggle-switch'}
        onPress={()=>onToggle('close')}
       
       />

    </>
  )
}
    
  </View>

 </View>

{
  item.isOpen && (
    <>
    <View style={styles.secondLine}>

  <View  style={styles.timeSelectContainer}>
    <Text style={[styles.timeHeader,{color:textColor}]}>Open</Text>
 <Text style={[styles.timeHeader,{color:darkGreyText}]} >{openTime}</Text>

{
  isOpenSelected && !hideTimeSelector && (
    <>
    
    <View style={styles.scrollDateContainer}>

<ScrollView style={styles.dateContainer}>

    {
      timeMap.map((time)=>{
        return (
          

          <Pressable style={styles.timeLine}  key={time}
          
           onPress={()=>onPress('open',time)}
          >

            <Text style={{color:'white',fontSize:RFValue(10)}}>{time}</Text>

          </Pressable>
          
          
        )
      })
    }

   </ScrollView>
    </View>
     

    </>
  )
}


  
  </View>

    <View style={styles.timeSelectContainer}>
    <Text style={[styles.timeHeader,{color:textColor}]}>Close</Text>
 <Text style={[styles.timeHeader,{color:darkGreyText}]}
 >{closeTime}</Text>




 {
  iscloseSelected  && !hideTimeSelector && (
    <>

    <View style={styles.scrollDateContainer}>
 <ScrollView style={styles.dateContainer}>

    {
      timeMap.map((time)=>{
        return (
          

          <Pressable style={styles.timeLine}  key={time} onPress={()=>onPress('close',time)}>

            <Text style={{color:'white',fontSize:RFValue(10)}}>{time}</Text>

          </Pressable>
          
          
        )
      })
    }

   </ScrollView>
    </View>
    

    </>
  )
 }




  </View>






 </View>

 <View style={styles.secondLine}>

  <View  style={styles.timeSelectContainer}>
  
 <Text style={[styles.changeHeader,]} onPress={()=>{setIsOpenSelected(true);setHideTimeSelector(false)}}>{'Change'}</Text>



  
  </View>

    <View style={styles.timeSelectContainer}>
 <Text style={[styles.changeHeader,]}
 onPress={()=>{setIsCloseSelected(true);setHideTimeSelector(false)}}
 
 >{'Change'}</Text>









  </View>






 </View>
    </>
  )
}
 




 </Pressable>  
    
    </>
  )
}








const operation = () => {
   const {greyText}=useGlobal()
   const {business}=useBusiness()
 const router=useRouter()
 const [isActive,setIsActive]=useState<boolean>(false)






const skip=()=>{

 router.push('/(tabs)/(create)/description')

}

const forward=()=>{
    if (!isActive)return

   router.push('/(tabs)/(create)/description')
 
}


useEffect(()=>{



},[])


  return (
   <InnerLayOut>
    <ScrollView
     showsVerticalScrollIndicator={false}
    
    >
 <LightHeader text={'List Business'}/>
   <ColoredHeader text='What time and day do your business open?' type='black'/>
 <Slogan  text={'Create day and time your business open so client can know your availability.'}/>

<View style={{paddingHorizontal:"2%",width:'100%'}}>






  {

   business.operatingDays.map((item,index)=>{

    return (   
   
    <RenderItem setIsActive={setIsActive} item={item}  index={index}    key={item.name}/>
 


      
      
    
    )
   })


  }

</View>
 


    </ScrollView>
    <View style={{borderTopColor:greyText,borderTopWidth:1,paddingVertical:10}}>
    <ButtonWithSkip isActive={isActive}   skipFunction={skip}  continueFunction={forward} />
    </View>

   </InnerLayOut>
  )
}


const styles=StyleSheet.create({
  line:{
    width:"100%",
    borderBottomWidth:1,
    minHeight:RFValue(60),
    paddingHorizontal:'2%',
    justifyContent:"center"
  },
  firstLine:{
    width:"100%",
    flexDirection:"row",
    justifyContent:'space-between',
    alignItems:'center'
  },
  daysText:{
    fontSize:RFValue(20),
    fontFamily:'Poppins-Bold'
  },

  toggleContainer:{
    flexDirection:'row',
    alignItems:'center'
  },
  status:{
    fontSize:RFValue(13),
    fontFamily:'Poppins-Regular',
    marginRight:RFValue(10)
  },
  secondLine:{
    width:"100%",
    justifyContent:'space-between',
    alignItems:'center',
    
    flexDirection:'row'

  },
  timeHeader:{
    fontFamily:'Poppins-Regular',
    fontSize:RFValue(13),
    marginVertical:RFValue(4)

  },

   changeHeader:{
    fontFamily:'Poppins-Bold',
    fontSize:RFValue(13),
    marginVertical:RFValue(4),
    color:primary

  },

  timeSelectContainer:{
position:"relative",
  },

  dateContainer:{
    width:RFValue(70),
    height:RFValue(150),
    backgroundColor:'black',
    borderRadius:10,
    borderWidth:1,
    borderColor:'grey'
  
  },

  timeLine:{
    width:"100%",
    borderBottomColor:'white',
    borderBottomWidth:1,
    alignItems:'center',
    height:RFValue(30),
    justifyContent:'center',
  },
scrollDateContainer:{

   width:'100%',
 height:RFValue(150),
 position:"absolute",
 bottom:'10%',
 zIndex:1,


}
})

export default operation