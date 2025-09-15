import React, { useEffect } from 'react';
import { StyleSheet,Platform } from 'react-native';
import  AppProvider  from './context';
import { Slot } from 'expo-router';
import { ResponseModal } from '@/components/ui/reponse';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';








const _layout = () => {


const queryClient = new QueryClient();

  return (

   <QueryClientProvider client={queryClient}>
 <AppProvider>
           <ResponseModal/>
          <Slot />
  
      </AppProvider>


   </QueryClientProvider>
             
        
 
 
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
});

export default _layout;
