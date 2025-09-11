import { Stack } from "expo-router";

import React from 'react';

const Layout = () => {


  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: 'white',
          },
        }}
      />


    
<Stack.Screen
  name="reset"
  options={{
    headerShown:false
  }}
/>

    
<Stack.Screen
  name="otp"
  options={{
    headerShown:false
  }}
/>



       <Stack.Screen
  name="(sign-in)"
  options={{
    headerShown:false
  }}
/>
      <Stack.Screen
  name="(register)"
  options={{
    headerShown:false
  }}
/>

<Stack.Screen
  name="terms"
  options={{
    headerShown:false,
  
  }}
/>

    </Stack>
  );
}

export default Layout;
