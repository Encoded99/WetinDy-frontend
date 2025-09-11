import React, { useEffect } from 'react';
import { StyleSheet,Platform } from 'react-native';
import  AppProvider  from './context';
import { Slot } from 'expo-router';

import { useRouter, useRootNavigationState } from "expo-router";








const _layout = () => {




  return (

  
    
         <AppProvider>
   
          <Slot />
  
      </AppProvider>

 
 
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
});

export default _layout;
