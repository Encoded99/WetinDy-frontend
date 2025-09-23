import {create} from 'zustand'


export type RegisterDataType={
 email:string,
 password:string,

 telephone:string,
 firstName:string,
 lastName:string,
 prefix:string,
 country:string,
}

export const  intialData:RegisterDataType={
 email:"",
 password:"",
 telephone:"",
 firstName:"",
 lastName:"",
 prefix:"+1",
 country:"Canada",
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
  setResetEmail:(value:string)=>void,
  isLoggedIn:boolean,
  setIsLoggedIn:(value:boolean)=>void
}


export const initialLoginData={
  email:'',
  password:''
}


export const useLogin=create<UseLoginType>((set)=>({

  loginData:initialLoginData,
  setLoginData:(value)=>set((state)=>({loginData:{...state.loginData,...value}})),
  resetEmail:'',
 setResetEmail:(value)=>set({resetEmail:value}),
 isLoggedIn:false,
 setIsLoggedIn:(value)=>set({isLoggedIn:value})

}))




type UserType={
  _id:string,
  firstName:string,
  lastName:string,
  premium:boolean,
  isTelephoneVerified:boolean,
  country:string,
  image:{
    url:string,
  },
  prefix:string,
}



type UseAuthType={
  responseMessage:string,
   setResponseMessage:(param:string)=>void,
   isError:boolean,
   setIsError:(param:boolean)=>void,
   user:UserType,
   setUser:(value:UserType)=>void,
   
}





const initialUser={
  _id:'',
  firstName:'',
  lastName:"",
  premium:false,
  isTelephoneVerified:false,
  image:{
    url:''
  },
  country:"",
  prefix:''
}






export const useAuth=create<UseAuthType>((set)=>({
  responseMessage:'',
  setResponseMessage:(value)=>set({responseMessage:value}),
  isError:false,
   setIsError:(value)=>set({isError:value}),
   user:initialUser,
   setUser:(value)=>set({user:value})
}))





