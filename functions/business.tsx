
import { useState } from "react";
import { apiUrl,api } from "./axios";
import { FinalBusinessType } from "@/store/business";










export const getShortTime = (duration:any) => {
 if (duration.days() > 0) {
   return `${duration.days()}d`; // For days
 } else if (duration.hours() > 0) {
   return `${duration.hours()}h`; // For hours
 } else if (duration.minutes() > 0) {
   return `${duration.minutes()}m`; // For minutes
 } else {
   return 'Now'; // If within a minute
 }
};



export const useBusinessSearch=()=>{

   const [searchData,setSearchData]=useState<FinalBusinessType[]>([])




  const search=async(text:string)=>{
  
  
    try{
   
      const url = `${apiUrl}/business/search-business?query=${encodeURIComponent(text)}`;

      const response = await api.get(url);
      setSearchData(response.data)
    }
   
    catch(err){
   
    }
     
      
    
     }
   







  return(

    {
      search,
      searchData,
      setSearchData,
    }

  )
}