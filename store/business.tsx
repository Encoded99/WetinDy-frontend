import {create} from 'zustand'

type DaysType = 
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday';


export interface DayInfo{
  name:DaysType,
  isOpen:boolean,
  openTime:string| null,
  closeTime:string|null,
}

const initialDays: DayInfo[] = [
  { name: 'Monday', isOpen: true, openTime: '9:00AM', closeTime: '5:00PM' },
  { name: 'Tuesday', isOpen: true, openTime: '9:00AM', closeTime: '5:00PM' },
  { name: 'Wednesday', isOpen: true, openTime: '9:00AM', closeTime: '5:00PM' },
  { name: 'Thursday', isOpen: true, openTime: '9:00AM', closeTime: '5:00PM' },
  { name: 'Friday', isOpen: true, openTime: '9:00AM', closeTime: '5:00PM' },
  { name: 'Saturday', isOpen: false, openTime: null, closeTime: null },
  { name: 'Sunday', isOpen: false, openTime: null, closeTime: null }
];




export interface CategoryType {
  _id: string;
  name: string;
  pluralName: string;
  shortName: string;
  path:string,
  subcategories:string[]
}



export interface ImageType{

    url:string,
    cloudId:string,

  }



type BusinessType={
  name:string,
  email?:string,
  telephone:string,
    
  social?:{
    facebook?:string,
    x?:string,
    instagram?:string,
  },
  
  description:string,
  categories:{
    categoryOne?:string,
    categoryTwo?:string,
    categoryThree?:string,
  },
  operatingDays:DayInfo[],

  image:ImageType[],

  address:{
    street:string,
    city:string,
    stateOrRegion:string,
    postalCode:string
  }
  showFullAddress:boolean,
  firstPoster:string,
isPostedByOwner:boolean,
website?:string,
owner?:string

}




export const initialCategory={
  _id:"",
  name:"",
  pluralName:"",
  shortName:"",
   subcategories:[],
   path:''
}

export const initialBusiness={
  name:'',
  telephone:'',
  
  description:'',
  categories:{
    categoryOne:'',
    categoryTwo:'',
    categoryThree:'',
  },

 operatingDays:initialDays,
  address:{
    street:"",
    city:'',
    stateOrRegion:'',
    postalCode:''
  },
  showFullAddress:true,
  image:[],
  firstPoster:'',
  isPostedByOwner:true,
 
  
}

export type CategoryInstanceType='category-1'|'category-2'|'category-3'

type InstanceType={
  instance:CategoryInstanceType
}




type SelectedCategoryType= CategoryType & InstanceType



export type UseBusinessType={
  business:BusinessType,
  setBusiness:(value:Partial<BusinessType>)=>void,
  setBusinessOperatingTime:(value:DayInfo,indexSent:number)=>void
 

  
}




export const useBusiness=create<UseBusinessType>((set)=>({

  business:initialBusiness,
  setBusiness:(value)=>set((state)=>({business:{...state.business,...value}})),
 setBusinessOperatingTime: (value: DayInfo, indexSent: number) =>
  set((state) => ({
    business: {
      ...state.business,
      operatingDays: state.business.operatingDays.map((item, index) =>
        index === indexSent ? value : item
      ),
    },
  })),
  


}))



type UseCategoryType={
categoryData:CategoryType[],
setCategoryData:(value:CategoryType[])=>void,
 categoryInstance:CategoryInstanceType,
 setCategoryInstance:(value:Partial<CategoryInstanceType>)=>void,
  selectedCategoryData:SelectedCategoryType[],
  setSelectedCategoryData:(value:SelectedCategoryType[])=>void
}


export const useCategory=create<UseCategoryType>((set)=>(
  {
    categoryData:[],
   setCategoryData:(value)=>set({categoryData:value}),
   categoryInstance:'category-1',
   setCategoryInstance:(value)=>set({categoryInstance:value}),
 
   selectedCategoryData:[],
   setSelectedCategoryData:(value)=>set({selectedCategoryData:value}) 
  }
))


