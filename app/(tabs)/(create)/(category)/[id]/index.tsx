import { View, FlatList,StyleSheet,Dimensions,ActivityIndicator } from 'react-native'
import React,{useState, useEffect} from 'react'
import { CategoryType, } from '@/store/business'
import { useGlobal } from '@/app/context'
import { primary } from '@/custom'
import { useInfiniteQuery } from '@tanstack/react-query'
import { apiUrl,api } from '@/functions/axios'
import { ErrorComponent } from '@/components/Error'
import { Paths } from '@/data/paths'
import { SearchField, } from '@/components/Element'
import { useLocalSearchParams, } from 'expo-router'
import { InnerLayOutWithOutScroll } from '@/components/LayOut'
import { LightHeader } from '@/components/Header'
import { CategoryRenderItem } from '@/components/category'





const {height}=Dimensions.get('window')

// Precompute all paths into a flat array
//const allPaths = country.flatMap((cat) => buildPaths(cat));






 







type PaginatedResponse = {
  data: CategoryType[];
  hasMore: boolean;
  page: number;
  pageSize: number;
  totalCount: number;

};










export const CategoryPicker=()=>{

 const {id}=useLocalSearchParams()
       const {textColor,}= useGlobal()
      const [text,setText]=useState<string>('')
    const [searchData,setSearchData]=useState<CategoryType[]>([])
      const [currentPage,setCurrentPage]=useState<number>(1)
      
 

  const handleSearch=async()=>{
 let resultText = text.replace(/\s+/g, "");
  const foundData= cleanedData.filter((item)=>item.name.toUpperCase().includes(resultText.toUpperCase()))
 
  if (foundData.length>0){
 
   setSearchData(foundData)
   return
  }
 
 
  try{
 
    const url = `${apiUrl}/categories/search-categories?query=${encodeURIComponent(text)}&parent=${id}`;
    const response = await api.get(url);
 
    setSearchData(response.data)
  }
 
  catch(err){
 
  }
   
    
  
   }
 


const fetchData = async ({
  pageParam,
 
}: {
  pageParam: number;


}): Promise<PaginatedResponse> => {



if (typeof(id)==='string' && id){






  const subCategoryUrl=`${apiUrl}/categories/get-sub-categories/${id}?page=${pageParam}`
    const response = await api.get(subCategoryUrl);
  setCurrentPage((prev)=>prev+1)

 
  return response.data;


}
 else{

   const mainUrl=`${apiUrl}/categories/get-categories/?page=${pageParam}`

    const response = await api.get(mainUrl);
  setCurrentPage((prev)=>prev+1)

 
  return response.data;

 }



};







 
const {
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  isLoading,
  isError:isServerError,
  refetch,
} = useInfiniteQuery<PaginatedResponse, Error>({
  queryKey: ['sub-category-data',id ],
  queryFn: ({ pageParam = 1 }) =>
    fetchData({
      pageParam:pageParam as number,
  
    }),
  getNextPageParam: (lastPage) =>
    lastPage.hasMore ? lastPage.page + 1 : undefined,
  initialPageParam: 1,
  staleTime: 1000 * 60 * 5,
  
});


const handleCancel=()=>{
    setText('')
   
  
  }

  useEffect(()=>{
 
    if (text){
  handleSearch()
    }
  },[text])


  const params={
      text,
      setText,
      handleCancel,
      handleSearch,

  }

const cleanedData = data?.pages.flatMap((page) => page.data) || [];







  return (
    <>
 


     
    <InnerLayOutWithOutScroll>

  
     <LightHeader text={'List Business'}/>
       <View style={styles.categoryHeader}>
         <SearchField  {...params}/>
      </View>
      <FlatList
         keyExtractor={(item, index) => item._id.toString()}
           data={text===''?cleanedData:searchData}
       renderItem={({ item }) => (
    <CategoryRenderItem item={item} textColor={textColor}  
    />
)}

 onEndReached={() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }}




   ListFooterComponent={()=>{
    return (
      <>
      {
        isLoading &&  (
        
        <>
     
      {
        currentPage>1?(
          <>
          <View style={{width:'100%',flex:1,justifyContent:'center',alignItems:"center",backgroundColor:"red",}}>
       
           <ActivityIndicator size="large" color={primary} />
         
        
        </View>
          </>
        ):(
          <>
          <View style={{width:'100%',flex:1,justifyContent:'center',alignItems:"center",height:height*0.7}}>
       
           <ActivityIndicator size={60} color={primary} />
         
        
        </View>
          
          </>
        )
      }

         
        
        </>
        )
      }

       {
        !isLoading && isServerError &&  (<>
        <ErrorComponent errorMessage='Error fetching data'  onRetry={()=>refetch()}/>
        </>)
      }
      
      </>
    )
   }}
   


         showsVerticalScrollIndicator={false}
      initialNumToRender={20} // 🟢 
      maxToRenderPerBatch={20} // 🟢 
      windowSize={10} // 🟢 
      removeClippedSubviews // 🟢 
      
      />
    
    




    </InnerLayOutWithOutScroll>
  
    </>
  )
}















const styles= StyleSheet.create({


categoryHeader:{
    width:"100%",
    marginTop:0,

     
  },




})

export default CategoryPicker