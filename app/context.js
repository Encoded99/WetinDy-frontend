
import React, { useState,useContext} from 'react';






const AppContext=React.createContext()
// Create a provider component
  const  AppProvider = ({ children }) => {

  const [mode,setMode]=useState('light')



 
  const background=mode==='light'?'#FFFFFF':'#000000'
  
  const greyBackground=mode==='light'?'#E6E6E6':'#262626'

  const textColor=mode==='light'?'#000000':'#FFFFFF'
 const greyText=mode==='light'?'#E6E6E6':'#FFFFFF'
 const darkGreyText=mode==='light'?'grey':'#FFFFFF'






    return (
        <AppContext.Provider value={{ 
          background,
          greyBackground,
          textColor,
          setMode,
          greyText,
          darkGreyText
        }}>
            {children}
        </AppContext.Provider>
    );
};


export const useGlobal=()=>{
 return useContext(AppContext)
}

export default AppProvider