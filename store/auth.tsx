import {create} from 'zustand'


export type RegisterDataType={
 email:string,
 password:string,
 secondPassword:string,
 telephone:string,
 firstName:string,
 lastName:string,
 prefix:string,
}

export const  intialData:RegisterDataType={
 email:"",
 password:"",
 secondPassword:"",
 telephone:"",
 firstName:"",
 lastName:"",
 prefix:""
}


type UseRegisterType={
 registerData:RegisterDataType,
  setRegisterData:(value:Partial<RegisterDataType>)=>void,
  
}

export  const useRegister= create<UseRegisterType>((set)=>({

 registerData:intialData,
 setRegisterData:(value)=>set((state)=>({registerData:{...state.registerData,...value}})),
 


}))




type LoginDataType={
  email:string,
  password:string
}


type UseLoginType={
  loginData:LoginDataType,
  setLoginData:(params:Partial<LoginDataType>)=>void,
  resetEmail:string,
  setResetEmail:(value:string)=>void
}


export const initialLoginData={
  email:'',
  password:''
}


export const useLogin=create<UseLoginType>((set)=>({

  loginData:initialLoginData,
  setLoginData:(value)=>set((state)=>({loginData:{...state.loginData,...value}})),
  resetEmail:'',
 setResetEmail:(value)=>set({resetEmail:value})

}))