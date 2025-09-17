import { View, Text,ScrollView,StyleSheet, Pressable,FlatList } from 'react-native'
import React, { useState } from 'react'
import { InnerLayOut } from '@/components/LayOut'
import { LightHeader,ColoredHeader, } from '@/components/Header'
import { Slogan, } from '@/components/Element'
import { useGlobal } from '@/app/context'
import { RFValue } from 'react-native-responsive-fontsize'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useBusiness } from '@/store/business'
import { DayInfo } from '@/store/business'







const RenderItem=(item:DayInfo)=>{
    const {greyText,darkGreyText,textColor}=useGlobal()
  const [isOpenSelected,setIsOpenSelected]=useState<boolean>(false)
    const [iscloseSelected,setIsCloseSelected]=useState<boolean>(false)


  const timeMap=[
  "12:00 AM", "1:00 AM", "2:00 AM", "3:00 AM", "4:00 AM", "5:00 AM",
  "6:00 AM", "7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM"
]

  return (
    <>

    <View style={[styles.line,{borderBottomColor:greyText}]} key={item.name}>

 <View style={[styles.firstLine,]}>
  <Text style={styles.daysText}>
     {item.name}
  </Text>

  <View style={styles.toggleContainer}>

    <Text style={[styles.status,{color:item.isOpen?"green":"red"}]}>{item.isOpen?'Open':'Closed'}</Text>


{
  item.isOpen ? (
    <>
    <MaterialCommunityIcons size={RFValue(40)} color={darkGreyText} name={'toggle-switch-off'}/>

    </>
  ):(
    <>
       <MaterialCommunityIcons size={RFValue(40)} color={darkGreyText} name={'toggle-switch'}/>

    </>
  )
}
    
  </View>

 </View>

 <View style={styles.secondLine}>

  <View  style={styles.timeSelectContainer}>
    <Text style={[styles.timeHeader,{color:textColor}]}>Open</Text>
 <Text style={[styles.timeHeader,{color:darkGreyText}]} onPress={()=>setIsOpenSelected(true)}>Select Time</Text>

{
  !isOpenSelected  && (
    <>
    
    <View style={styles.scrollDateContainer}>

<ScrollView style={styles.dateContainer}>

    {
      timeMap.map((item)=>{
        return (
          

          <Pressable style={styles.timeLine}  key={item}>

            <Text style={{color:'white',fontSize:RFValue(10)}}>{item}</Text>

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
 onPress={()=>setIsCloseSelected(true)}
 
 >Select Time</Text>


 {
  iscloseSelected  && (
    <>

    <View style={styles.scrollDateContainer}>
 <ScrollView style={styles.dateContainer}>

    {
      timeMap.map((item)=>{
        return (
          

          <Pressable style={styles.timeLine}  key={item}>

            <Text style={{color:'white',fontSize:RFValue(10)}}>{item}</Text>

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

 </View>  
    
    </>
  )
}








const operation = () => {
  const {greyText,textColor,darkGreyText}=useGlobal()
   const {business}=useBusiness()





const timeMap=[
  "12:00 AM", "1:00 AM", "2:00 AM", "3:00 AM", "4:00 AM", "5:00 AM",
  "6:00 AM", "7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM"
]





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

   business.operatingDays.map((item)=>{


    return (
  
      
   <>
    <RenderItem {...item} key={item.name}/>
   </>


      
      
    
    )
   })


  }

  

</View>
 



    </ScrollView>
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

  timeSelectContainer:{
position:"relative",
  },

  dateContainer:{
    width:'100%',
    height:'100%',
    backgroundColor:'black',
    borderRadius:10,
  
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
 top:'90%',
 zIndex:1,


}
})

export default operation