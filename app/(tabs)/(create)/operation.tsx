import { View, Text,ScrollView,StyleSheet, Pressable,FlatList } from 'react-native'
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





const RenderItem=({item,index}:{item:DayInfo,index:number})=>{

 
  const {setBusinessOperatingTime,business,setBusiness}=useBusiness()
    const {greyText,darkGreyText,textColor}=useGlobal()
  const [isOpenSelected,setIsOpenSelected]=useState<boolean>(false)
    const [iscloseSelected,setIsCloseSelected]=useState<boolean>(false)
 const [hideTimeSelector,setHideTimeSelector]=useState<boolean>(false)
 const [openTime,setOpenTime]=useState<string|null>(item.openTime)
 const [closeTime,setCloseTime]=useState<string|null>(item.closeTime)

const onPress=(param:'open'|'close',value:string)=>{


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
  "12:00 AM", "12:30 AM", "1:00 AM", "1:30 AM", "2:00 AM", "2:30 AM",
  "3:00 AM", "3:30 AM", "4:00 AM", "4:30 AM", "5:00 AM", "5:30 AM",
  "6:00 AM", "6:30 AM", "7:00 AM", "7:30 AM", "8:00 AM", "8:30 AM",
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
  "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM",
  "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM",
  "9:00 PM", "9:30 PM", "10:00 PM", "10:30 PM", "11:00 PM", "11:30 PM"
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




const timeMap=[
  "12:00 AM", "1:00 AM", "2:00 AM", "3:00 AM", "4:00 AM", "5:00 AM",
  "6:00 AM", "7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM"
]



const skip=()=>{

 router.push('/(tabs)/(create)/description')

}

const forward=()=>{
   router.push('/(tabs)/(create)/description')
   console.log(business.operatingDays,'operation days')
}


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
   <>
    <RenderItem item={item}  index={index}    key={item.name}/>
   </>


      
      
    
    )
   })


  }

</View>
 


    </ScrollView>
    <View style={{borderTopColor:greyText,borderTopWidth:1,paddingVertical:10}}>
    <ButtonWithSkip  skipFunction={skip}  continueFunction={forward} />
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
    width:'100%',
    height:'100%',
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