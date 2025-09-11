import { Stack } from "expo-router";

import React from 'react';




const RegisterLayout = () => {
 
  return (



<>




<Stack>



<Stack.Screen
  name="partTwo"
  
  options={{
   headerShown: false, 
   
  }}
/>
<Stack.Screen
  name="index"
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
</Stack>

</>
   
  );
}

export default RegisterLayout;
