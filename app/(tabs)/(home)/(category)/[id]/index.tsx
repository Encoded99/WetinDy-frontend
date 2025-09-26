import { View, Text,StyleSheet,FlatList,SafeAreaView,StatusBar,ActivityIndicator } from 'react-native'
import { InnerLayOutWithOutScroll } from '@/components/LayOut'
import { primary,lightPrimary } from '@/custom'
import { standardHeight,standardBorderRadius } from '@/components/Element'
import React, { useState } from 'react'

import { RFValue } from 'react-native-responsive-fontsize'
import { useGlobal } from '@/app/context'
import { SearchField } from '@/components/Element'
import { useCategory } from '@/store/business'
import { apiUrl,api } from '@/functions/axios'
import { useQuery } from '@tanstack/react-query'
import { FieldSubCategoryComponent } from '@/components/category'
import { useLocalSearchParams } from 'expo-router'
import { LightHeader } from '@/components/Header'
import { BusinessPaginatedResponse } from '../..'
import { useInfiniteQuery } from '@tanstack/react-query'
import { standardPaddingTop,percentagePadding } from '@/components/Element'
import { BusinessSkeletonLoader } from '@/components/ui/Loader'
import { BusinessRenderItem } from '@/components/Business'
import { ErrorComponent } from '@/components/Error'
import { useBusinessSearch } from '@/functions/business'




const index = () => {

   const {id}=useLocalSearchParams()

      const {searchData,setSearchData,search}   =useBusinessSearch()

   const  {popularCategories,setPopularCategories} =useCategory()
  const  {textColor,darkGreyText,background} =useGlobal()
   const [text,setText]=useState<string>('')
 const [currentPage,setCurrentPage]=useState<number>(1)




   const handleCancel=()=>{
       setSearchData([])
       setText('')
   }




 
const handleSearch=async()=>{
  
   
     await search(text)
      
    
     }
   

const searchParam={
  text,
  setText,
  handleCancel,
  handleSearch,
  placeholder:'Search for Stores'
}




const fetchPopularCategory = async (
)=> {

const url=`${apiUrl}/categories/get-popular-sub-categories/${id}`

    const response = await api.get(url);
 

 
  return response.data



};



React.useEffect(()=>{
 
    if (text){
  handleSearch()
    }
  },[text])





 const {
    data:gottenSubCategory ,
    isLoading:isSubCategoryLoading,
    isError:isPopularError,
    refetch:subCategoryRefetch,
    
  } = useQuery({
    queryKey: ['popular-sub-categries',id],
    queryFn: () => fetchPopularCategory(),
  });




const fetchData = async ({
  pageParam,
 
}: {
  pageParam: number;


}): Promise<BusinessPaginatedResponse > => {




  const url=`${apiUrl}/business/get-category-business/${id}?page=${pageParam}`

    const response = await api.get(url);
  setCurrentPage((prev)=>prev+1)

 
  return response.data;
 


};







const {
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  isLoading,
  isError:isBusinessError,
  refetch,
} = useInfiniteQuery<BusinessPaginatedResponse, Error>({
  queryKey: ['category-business-data',id ],
  queryFn: ({ pageParam = 1 }) =>
    fetchData({
      pageParam:pageParam as number,
  
    }),
  getNextPageParam: (lastPage) =>
    lastPage.hasMore ? lastPage.page + 1 : undefined,
  initialPageParam: 1,
  staleTime: 1000 * 60 * 5,
  
});









const cleanedData = data?.pages.flatMap((page) => page.data) || [];




const globalValues = useGlobal();



  return (




    <>
    
  <SafeAreaView  style={{backgroundColor:background,paddingTop:standardPaddingTop,flex:1,padding:percentagePadding}}>


<StatusBar
        barStyle="dark-content" // or 'light-content'
        backgroundColor={background}  // Android only
      />
<LightHeader text={''}/>
  <SearchField {...searchParam}/>

<FlatList

    keyExtractor={(item, index) => item._id.toString()}
            data={ text?searchData : cleanedData}
       renderItem={({ item }) => (
    <BusinessRenderItem item={item} global={globalValues}  
    />
)}

 onEndReached={() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }}




 ListHeaderComponent={()=>{
 
   return (
   <>
   


{
gottenSubCategory?.subCategories?.length>0 &&(
  <>
  <FieldSubCategoryComponent refetch={subCategoryRefetch} isError={isPopularError} isLoading={isSubCategoryLoading} title={gottenSubCategory?.categoryInfo?.name} data={gottenSubCategory?.subCategories}/>
  </>
)
}

   



 <View style={{width:'100%',marginTop:RFValue(25)}}>
<Text style={{fontSize:RFValue(18),fontFamily:'Poppins-Bold',color:primary}}>Business Near You</Text>
 </View>
  

   </>
   
   )
 
 
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
          <View style={{width:'100%',flex:1,}}>
       
             <BusinessSkeletonLoader/>
         
        
        </View>
          
          </>
        )
      }

         
        
        </>
        )
      }

       {
        !isLoading && isBusinessError &&  (<>
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




  </SafeAreaView>

    </>
    
  )
}

const styles =  StyleSheet.create({
   headingContainer:{
    width:"100%",
    flexDirection:'row',
    justifyContent:'space-around',
    marginVertical:RFValue(20),
    alignItems:"center"
   },
   locationIndicator:{
    width:"75%",
    borderWidth:1,
    borderColor:primary,
    borderRadius:standardBorderRadius,
    height:standardHeight,
    backgroundColor:lightPrimary,
    flexDirection:'row',
    alignItems:'center',
    padding:'1%'

   },

   locationText:{
     fontSize: RFValue(13),
  fontFamily: "Poppins-Bold",
   flex: 1,          
   color:primary
 
   },

   
})


export default index