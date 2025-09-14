import {create} from 'zustand'




interface DayInfo{
  isOpen:boolean,
  openTime:string| null,
  closeTime:string|null,
}




export interface CategoryType {
  id: string;
  name: string;
  pluralName: string;
  shortName: string;
  categories?: CategoryType[]; 
}



interface ImageType{

    url:string,
    cloudId:string,

  }



type BusinessType={
  name:string,
  email:string,
  telephone:string,
    
  social:{
    facebook:string,
    x:string,
    instagram:string,
  },
  isVerified:boolean,
  description:string,
  categories:{
    categoryOne?:CategoryType,
    categoryTwo?:CategoryType,
    categoryThree?:CategoryType,
  },
  operatingDays:{
    monday:DayInfo,
    tuesday:DayInfo,
    wednesday:DayInfo,
    thursday:DayInfo,
    friday:DayInfo,
    saturday:DayInfo,
    sunday:DayInfo

  },

  image:ImageType[],

  address:{
    street:string,
    city:string,
    stateOrRegion:string,
    postalCode:string
  }
  showFullAddress:boolean,

}
const openDay={
    isOpen:true,
    openTime:'',
    closeTime:''
  }

  const closeDay={
    isOpen:false,
    openTime:'',
    closeTime:''
  }




const initialCategory={
  id:"",
  name:"",
  pluralName:"",
  shortName:"",
  categories:[]
}

const initialBusiness={
  name:'',
  email:'',
  telephone:'',
  social:{
    facebook:'',
    x:'',
    instagram:'',
  },
  isVerified:false,
  description:'',
  categories:{
    categoryOne:initialCategory,
    categoryTwo:initialCategory,
    categoryThree:initialCategory,
  },
 operatingDays:{
    monday:openDay,
    tuesday:openDay,
    wednesday:openDay,
    thursday:openDay,
    friday:openDay,
    saturday:closeDay,
    sunday:closeDay,
  },
  address:{
    street:"",
    city:'',
    stateOrRegion:'',
    postalCode:''
  },
  showFullAddress:true,
  image:[],

  
}


export type UseBusinessType={
  business:BusinessType,
  setBusiness:(value:Partial<BusinessType>)=>void
}



export const useBusiness=create<UseBusinessType>((set)=>({

  business:initialBusiness,
  setBusiness:(value)=>set((state)=>({business:{...state.business,...value}}))

}))