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
        name="screen-2"
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: 'white',
          },
        }}
      />

<Stack.Screen
      name="screen-3"
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: 'white',
          },
        }}
      />

      
<Stack.Screen
           name="screen-4"
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: 'white',
          },
        }}
      />



<Stack.Screen
           name="screen-5"
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: 'white',
          },
        }}
      />

      <Stack.Screen
           name="screen-6"
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: 'white',
          },
        }}
      />

        <Stack.Screen
           name="screen-7"
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: 'white',
          },
        }}
      />




        <Stack.Screen
           name="(category)"
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
