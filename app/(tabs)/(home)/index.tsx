import { View, Text,StyleSheet,FlatList,Dimensions,SafeAreaView,StatusBar } from 'react-native'

import { primary,lightPrimary } from '@/custom'
import { standardHeight,standardBorderRadius,standardPaddingTop } from '@/components/Element'
import React, { useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { RFValue } from 'react-native-responsive-fontsize'
import { useGlobal } from '@/app/context'
import { SearchField } from '@/components/Element'
import { useCategory } from '@/store/business'
import { apiUrl,api } from '@/functions/axios'
import { useQuery,useInfiniteQuery  } from '@tanstack/react-query'
import { FieldSubCategoryComponent } from '@/components/category'
import { ActivityIndicator } from 'react-native'
import { ErrorComponent } from '@/components/Error'
import { FinalBusinessType } from '@/store/business'

import { BusinessRenderItem } from '@/components/Business'
import { percentagePadding } from '@/components/Element'
import { BusinessSkeletonLoader } from '@/components/ui/Loader'








const {height}=Dimensions.get('window')

type PaginatedResponse = {
  data: FinalBusinessType[];
  hasMore: boolean;
  page: number;
  pageSize: number;
  totalCount: number;

};






const index = () => {
   const  {popularCategories,setPopularCategories} =useCategory()
  const  {textColor,darkGreyText,background} =useGlobal()
   const [text,setText]=useState<string>('')
   const [currentPage,setCurrentPage]=useState<number>(1)

   const handleCancel=()=>{

   }

   const handleSearch=()=>{

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




const url=`${apiUrl}/categories/get-popular-categories`

    const response = await api.get(url);
 
 
  return response.data;



};







 const {
    data: gottenSubCategory ,
    isLoading:isSubCategoryLoading,
    isError:isPopularError,
    refetch:subCategoryRefetch,
    
  } = useQuery({
    queryKey: ['popular-categries'],
    queryFn: () => fetchPopularCategory(),
  });


















const fetchData = async ({
  pageParam,
 
}: {
  pageParam: number;


}): Promise<PaginatedResponse> => {

  const url=`${apiUrl}/business/get-business?page=${pageParam}`
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
} = useInfiniteQuery<PaginatedResponse, Error>({
  queryKey: ['all-business-data', ],
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













  return (
    <SafeAreaView  style={{backgroundColor:background,paddingTop:standardPaddingTop,flex:1,padding:percentagePadding}}>
     <StatusBar
        barStyle="dark-content" // or 'light-content'
        backgroundColor={background}  // Android only
      />
  
      <View style={styles.headingContainer}>
     

        <View style={styles.locationIndicator}>
   <MaterialCommunityIcons size={RFValue(20)} color={primary} name='map-marker'/>
   <Text style={styles.locationText} numberOfLines={1}>No 14, komeji street, sawmill</Text>
        </View>
      
       <MaterialCommunityIcons color={textColor} size={RFValue(25)} name='bell-outline'/>

      </View>

 






 <FlatList

    keyExtractor={(item, index) => item._id.toString()}
           data={cleanedData}
       renderItem={({ item }) => (
    <BusinessRenderItem item={item} textColor={textColor}  
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
     <SearchField {...searchParam}/>
<FieldSubCategoryComponent refetch={subCategoryRefetch}  isError={isPopularError}  isLoading={isSubCategoryLoading} title={'Category'} data={gottenSubCategory}/> 
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
    height:standardHeight*0.9,
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