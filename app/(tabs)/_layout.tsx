import React,{useEffect,} from 'react';
import {  StyleSheet,BackHandler } from "react-native";
import { RFValue } from 'react-native-responsive-fontsize';
import { Tabs, } from "expo-router";
import { useGlobal } from "@/app/context";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { primary } from '@/custom';
import { usePathname } from 'expo-router';






const Layout = () => {
  const { background, textColor,} = useGlobal();


const pathname=usePathname()




 useEffect(() => {
    
    const isNeededPath = pathname === '/notifications' || pathname === '/post' || pathname === '/';

    const backAction = () => {
      if (isNeededPath) {
        BackHandler.exitApp();
        return true; 
      }
      return false; 
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

  
    return () => backHandler.remove();
  }, [pathname]); 















  

  const indicatorColor = 'white'
  const noIndicator = "grey";

  return (
    <>
     <Tabs
      screenOptions={{
        tabBarStyle: { backgroundColor:background, },

 tabBarItemStyle: {
    borderRadius: 8,
    marginHorizontal: 5, 
    overflow: 'hidden',
    
  },


        tabBarLabelStyle: { fontSize: RFValue(10), fontWeight: "bold" },
        tabBarActiveTintColor: indicatorColor,
        tabBarInactiveTintColor: noIndicator,
        animation: "none",
        headerShown: false,
        tabBarActiveBackgroundColor:primary,
        
      }}
    >
      {tabRoutes.map((item) => (
        <Tabs.Screen
          key={item.name} // Ensure unique key
          name={item.name}
          options={{
            tabBarLabel: item.label,
            tabBarIcon: ({ color, size }) => (
              <>
              
              <MaterialCommunityIcons 
                name={item.icon as keyof typeof MaterialCommunityIcons.glyphMap}
               color={textColor} 
               size={RFValue(25)}/>
  
              
              
              </>
             
              
              
            ),

           
            
            headerShown: false,
          }}
        />
      ))}
    </Tabs>

   
    </>
   
  );
};



const tabRoutes = [
  { name: "(home)", icon: 'home', label:'Home' },
  { name: "(search)", icon: "magnify", label:'Search' },
  
  { name: "(create)", icon: "plus", label:"Create" },
  { name: "(business)", icon: "briefcase",  label:"Business" },
  { name: "(profile)", icon: "account",label:'Profile' },
];
const styles = StyleSheet.create({
  counterContainer: {
    height: 19,
    width: 19,
    borderRadius: 19,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: 13,
    top: -6,
  },
  bellCount: {
    fontSize: RFValue(10),

  },
});

export default Layout;