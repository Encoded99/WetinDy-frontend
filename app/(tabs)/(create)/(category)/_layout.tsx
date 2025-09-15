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
           name="[id]"
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: 'white',
          },
        }}
      />
    </Stack>

    
  );
}

export default Layout;
