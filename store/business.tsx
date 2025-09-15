import {create} from 'zustand'




interface DayInfo{
  isOpen:boolean,
  openTime:string| null,
  closeTime:string|null,
}




export interface CategoryType {
  _id: string;
  name: string;
  pluralName: string;
  shortName: string;
  path:string,
  subcategories:string[]
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
    categoryOne?:string,
    categoryTwo?:string,
    categoryThree?:string,
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




export const initialCategory={
  _id:"",
  name:"",
  pluralName:"",
  shortName:"",
   subcategories:[],
   path:''
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
    categoryOne:'',
    categoryTwo:'',
    categoryThree:'',
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

export type CategoryInstanceType='category-1'|'category-2'|'category-3'


export type UseBusinessType={
  business:BusinessType,
  setBusiness:(value:Partial<BusinessType>)=>void,
  
categoryData:CategoryType[],
setCategoryData:(value:CategoryType[])=>void,
 categoryInstance:CategoryInstanceType,
 setCategoryInstance:(value:Partial<CategoryInstanceType>)=>void,
 selectedCategory:CategoryType,
 setSelectedCategory:(value:CategoryType)=>void,
selectedCategoryData:CategoryType[],
setSelectedCategoryData:(value:CategoryType)=>void,
  
}





export const useBusiness=create<UseBusinessType>((set)=>({

  business:initialBusiness,
  setBusiness:(value)=>set((state)=>({business:{...state.business,...value}})),
   categoryData:[],
   setCategoryData:(value)=>set({categoryData:value}),
   categoryInstance:'category-1',
   setCategoryInstance:(value)=>set({categoryInstance:value}),
   selectedCategory:initialCategory,
   setSelectedCategory:(value)=>set({selectedCategory:value}),
   selectedCategoryData:[],
   setSelectedCategoryData:(value)=>set((state)=>({selectedCategoryData:{...state.selectedCategoryData,value}}))


}))


