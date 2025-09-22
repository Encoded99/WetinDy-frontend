import React, { useEffect, useRef } from 'react';
import { Animated, Easing, View, StyleSheet,Modal,Dimensions } from 'react-native';
import { lightPrimary } from '@/custom';
const {height,width}=Dimensions.get('window')
import { useGlobal } from '@/app/context';
import { FlatList } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { styles as businessStyles } from '../Business';





export const CircleLoader = ({isLoading}:{isLoading:boolean}) => {

  const {background,greyText}=useGlobal()
  const spin = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spin, {
        toValue: 1,
        duration: 1000, // 1 rotation per second
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [spin]);

  const rotate = spin.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  // Circle radius
  const radius = 20;
  const r1=200
  const r2=180
  const r3=160
  

  return (

    <Modal 
    visible={isLoading}
    transparent={true}
    
    >


<View style={styles.circleOverlay}>


  <View style={[styles.animationBackground,{backgroundColor:background,borderColor:greyText}]}>
    <View style={[styles.innerCircle,{height:r1,width:r1,borderRadius:r1,borderColor:greyText}]}>


<View style={[styles.innerCircle,{height:r2,width:r2,borderRadius:r2,borderColor:greyText}]}>


  <View style={[styles.innerCircle,{height:r3,width:r3,borderRadius:r3,borderColor:greyText}]}>


<Animated.View
        style={[
          styles.orbit,
          { transform: [{ rotate }] },
        ]}
      >


        {/* First ball */}
        <View style={[styles.ball, { backgroundColor: '#FF0050', left: radius }]} />
        {/* Second ball */}
        <View style={[styles.ball, { backgroundColor: '#00F2FF', left: -radius }]} />
      </Animated.View>




    </View>
 </View>

    </View>
 
 
  </View>
 
</View>


    </Modal>

   
  );
};










export const CategorySkeletonLoader = () => {

 const  {darkGreyText,greyText} =useGlobal()
  const opacity = useRef(new Animated.Value(0.3)).current;

  // Fake data to show placeholders
  const skeletonData = Array(5).fill({});


 useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 700,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [opacity]);











  const renderSkeleton = () => {
    return (
      <Animated.View style={[styles.subCategoryButton,{backgroundColor:greyText,opacity}]}>
        
      </Animated.View>
    );
  };

  return (
    <FlatList
      data={skeletonData}
      keyExtractor={(_, index) => index.toString()}
      horizontal
      renderItem={renderSkeleton}
      showsHorizontalScrollIndicator={false}
    />
  );
};






export const BusinessSkeletonLoader = () => {

 const  {darkGreyText,greyText} =useGlobal()
  const opacity = useRef(new Animated.Value(0.3)).current;


  const skeletonData = Array(5).fill({});


 useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 700,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [opacity]);











  const renderSkeleton = () => {
    return (
      <Animated.View style={[businessStyles.feedModalContainer,{backgroundColor:greyText,opacity}]}>
        
      </Animated.View>
    );
  };

  return (
    <FlatList
      data={skeletonData}
      keyExtractor={(_, index) => index.toString()}
     
      renderItem={renderSkeleton}
      
    />
  );
};














const styles = StyleSheet.create({
 
orbit: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ball: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    position: 'absolute',
  },
   circleOverlay:{
  width:width,
   justifyContent:"center",
   alignItems:'center',
  height:height,
  backgroundColor:lightPrimary

 },

 animationBackground:{
width:240,
  height:240,
  justifyContent:'center',
  alignItems:'center',
  borderRadius:20,
  borderWidth:1,

  
 },

  innerCircle :{
 
  justifyContent:'center',
  alignItems:'center',

  borderWidth:1,
 
 },






subCategoryButton: {
 
  justifyContent:'center',
  alignItems:'center',
  borderRadius:10,
 height:RFValue(45),
  padding:RFValue(8),
  marginRight:RFValue(8),
  width:RFValue(100)
  },






});

