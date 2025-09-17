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
        name="address"
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: 'white',
          },
        }}
      />

<Stack.Screen
      name="description"
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: 'white',
          },
        }}
      />

      
<Stack.Screen
           name="photo"
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: 'white',
          },
        }}
      />





      <Stack.Screen
           name="contact"
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: 'white',
          },
        }}
      />


       <Stack.Screen
           name="website"
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: 'white',
          },
        }}
      />

        <Stack.Screen
           name="operation"
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: 'white',
          },
        }}
      />
  <Stack.Screen
           name="social"
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: 'white',
          },
        }}
      />

       <Stack.Screen
           name="name"
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
