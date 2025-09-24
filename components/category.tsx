import { Text,StyleSheet,Dimensions, TouchableOpacity,View,FlatList,Modal,ActivityIndicator, Pressable } from 'react-native'
import React,{useState,useEffect} from 'react'
import { CategoryType, } from '@/store/business'
import { RFValue } from 'react-native-responsive-fontsize'
import { useGlobal } from '@/app/context'
import { percentagePadding, standardHeight } from './Element'
import {  useRouter } from 'expo-router'
import { useCategory,useBusiness } from '@/store/business'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { InnerLayOutWithOutScroll } from './LayOut'
import { useLocalSearchParams } from 'expo-router'
import { apiUrl,api } from '@/functions/axios'
import { useInfiniteQuery } from '@tanstack/react-query'
import { SearchField } from './Element'
import { primary } from '@/custom'
import { ErrorComponent } from './Error'
import { LightHeader } from './Header'
import { CategorySkeletonLoader } from './ui/Loader'


const {height}=Dimensions.get('window')

// Precompute all paths into a flat array
//const allPaths = country.flatMap((cat) => buildPaths(cat));






  export const CategoryRenderItem=({item,textColor,}:{item:CategoryType,textColor:string})=>{
   const {greyText}=useGlobal()
   const {categoryInstance,setSelectedCategoryData,selectedCategoryData,}=useCategory()
  const {setBusiness,business}=useBusiness()
  const router=useRouter()
 



 const handlePress=async()=>{



if (item.subcategories.length===0){





  switch(categoryInstance){



    case  'category-2':


  setBusiness({categories:{...business.categories,categoryTwo:item._id}})
      break;
    case 'category-3':
       setBusiness({categories:{...business.categories,categoryThree:item._id}})
      break;
    default :


       setBusiness({categories:{...business.categories,categoryOne:item._id}})
          

      break;
  }




  


  const filteredSelected= selectedCategoryData.filter((item)=>item.instance!==categoryInstance)

 const object={...item,instance:categoryInstance}
 setSelectedCategoryData([...filteredSelected,object])





  router.push('/(tabs)/(create)/(category)')
}

else{


 
 router.push(`/(tabs)/(create)/(category)/${item._id}`)
   
}
 }
 
 
     return (
       <>
        <TouchableOpacity style={[styles.categoryLine,{borderBottomColor:greyText}]}
        onPress={handlePress}
        >
         

          <View style={styles.textContainer}>
            <Text
       numberOfLines={1}
       
       style={[styles.lineText, { color: textColor }]}>{item.name}</Text>
          </View>
      <View style={{width:"15%",height:"100%",justifyContent:"center",alignItems:"center"}}>
       <MaterialCommunityIcons size={RFValue(30)} color={textColor} name='chevron-right'/>
      </View>
      
     </TouchableOpacity>
       
       </>
     )
   }
 







type SubCategoryParamType={
  showModal:boolean,
  setShowModal:React.Dispatch<React.SetStateAction<boolean>>
}


export const SubCategoryLinkModal=(param:SubCategoryParamType)=>{
 const {showModal,setShowModal} =param
const {background}=useGlobal()





  return (
    <>
      <Modal
           visible={showModal}
           animationType='slide'
           transparent={true}
          >
     <View style={{flex:1,backgroundColor:background}}>
        

     </View>


          </Modal>
    
    
    </>
  )
}
















type PaginatedResponse = {
  data: CategoryType[];
  hasMore: boolean;
  page: number;
  pageSize: number;
  totalCount: number;

};




  export const CategoryPickerRenderItem=({item,textColor,closeModal}:{item:CategoryType,textColor:string,closeModal:()=>void})=>{
   const {greyText}=useGlobal()


  const router=useRouter()
 



 const handlePress=async()=>{

//router.push(`/(tabs)/(create)/(category)/${item._id}`)
closeModal()
router.push(`/(tabs)/(home)/(category)/${item._id}`)

 }
 
 
     return (
       <>
        <TouchableOpacity style={[styles.categoryLine,{borderBottomColor:greyText}]}
        onPress={handlePress}
        >
         

          <View style={styles.textContainer}>
            <Text
       numberOfLines={1}
       
       style={[styles.lineText, { color: textColor }]}>{item.name}</Text>
          </View>
    
      
     </TouchableOpacity>
       
       </>
     )
   }
 


export const CategoryPicker=({setIsModal}:{setIsModal:React.Dispatch<React.SetStateAction<boolean>>})=>{

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







const closeModal=()=>{
  setIsModal(false)
}


 
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
      placeholder :'Find Category'
  }

const cleanedData = data?.pages.flatMap((page) => page.data) || [];







  return (
    <>
 


     
    <InnerLayOutWithOutScroll>

         <LightHeader text={''}/>
       
       <View style={styles.categoryHeader}>
         <SearchField  {...params}/>
      </View>
      <FlatList
         keyExtractor={(item, index) => item._id.toString()}
           data={text===''?cleanedData:searchData}
       renderItem={({ item }) => (
    < CategoryPickerRenderItem  closeModal={closeModal} item={item} textColor={textColor} 
      
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
















   export const FieldSubCategoryComponent=({data,title,isLoading,isError,refetch}:{data:CategoryType[],title:string,isLoading:boolean,isError:boolean,refetch:()=>void})=>{

  

const router= useRouter()
const {darkGreyText,greyText,textColor}=useGlobal()
const [isModal,setIsModal] =useState<boolean>(false)




const handlePress=async(item:string)=>{


router.push(`/(tabs)/(home)/(category)/${item}`)

 }
 


const renderItem=({item}:{item:CategoryType})=>{
  return (
    <>
    <Pressable style={[styles.subCategoryButton,{borderColor:greyText}]}
    
     onPress={()=>handlePress(item._id)}
    >
         <Text style={styles.subBtnText}>{item.name}</Text>
    </Pressable>
    </>
  )
}




    return (
      <>
      <Modal
         visible={isModal}
       animationType='slide'
       transparent={true}
      >
       <CategoryPicker  setIsModal={setIsModal}/>
      </Modal>
         

           {
            isLoading  && (
              <>
              <View style={{width:'100%',marginVertical:RFValue(10)}}>
              <CategorySkeletonLoader/>

              </View>
              </>
            )
           }

          
           {
            isError && !isLoading && (
              <>

                <>
            <View style={{width:'100%',paddingVertical:RFValue(20),backgroundColor:'',justifyContent:'center',alignItems:"center"}}>
              <Text style={{color:textColor,fontSize:RFValue(14),fontFamily:"Poppins-Regular",marginBottom:RFValue(10)}}>An Error Occured</Text>

              <Pressable style={{height:standardHeight*0.8,justifyContent:"center",alignItems:"center",backgroundColor:primary,borderRadius:RFValue(50),padding:3,width:RFValue(100)}}
              onPress={refetch}
              
              
              >
                 <Text style={{color:"white",fontSize:RFValue(15),fontFamily:"Poppins-Bold"}}>Retry</Text>
              </Pressable>

            </View>
            
            </>
              
              </>
            )
           }


     
     {
      !isError  && !isLoading  && (
        <>
          <View style={styles.subCategoryHeadingContainer}>
          
          <Text style={styles.subCategoryHeader}>
  {title.length > 20 ? `${title.slice(0, 20)}...` : title}
</Text>

          {
            data?.length>0 && (
              <>
               <Text style={[styles.subCategoryHeader,{color:darkGreyText,fontSize:RFValue(14)}]}
          
           onPress={()=>setIsModal(true)}
          >
            View All
          </Text>
        
              </>
            )
          }
         
         
      
      
         </View>

       {
        data?.length > 0 && (
          <>
          <FlatList
        data={data}
 keyExtractor={(item, index) => item._id.toString()}
      initialNumToRender={20} // 🟢 
      maxToRenderPerBatch={20} // 🟢 
      windowSize={10} // 🟢 
      removeClippedSubviews // 🟢 
      horizontal={true}
      renderItem={renderItem}
      showsHorizontalScrollIndicator={false}
      />
          
          </>
        )
       }

        
        </>
      )
     }


           
      



        
      
     
      
      </>
    )
   }





   



  













const styles= StyleSheet.create({



subCategoryHeadingContainer:{
    width:'100%',
    justifyContent:"space-between",
    alignItems:'center',
    flexDirection:'row',
    marginVertical:RFValue(15),
   
   },
   subCategoryHeader:{
    fontSize:RFValue(17),
    fontFamily:"Poppins-Bold",
    color:primary,
    padding:'1%'

   },









  categoryLine:{
   width:"100%",
   borderBottomWidth:1,
   justifyContent:"space-between",
   flexDirection:'row',
   alignItems:'center',
   height:RFValue(70)
 
 
  },
  lineText:{
   fontSize:RFValue(15),
   fontFamily:'Poppins-Regular',
   marginVertical:20,
   minHeight:30,
     
  },

  textContainer:{
    width:'85%',
    height:'100%',
    justifyContent:"center",
    alignItems:"flex-start",

  },



categoryHeader:{
    width:"100%",
    marginTop:0,

     
  },

  
  modalContainer: {
    width: '100%',
    height:height,
   
    flex:1,
 
 

  },

subCategoryButton:{
  borderWidth:1,
  justifyContent:'center',
  alignItems:'center',
  borderRadius:10,
 height:RFValue(40),
  padding:RFValue(8),
  marginRight:RFValue(8),

 
},
subBtnText:{
  fontSize:RFValue(10),
  fontFamily:"Poppins-Bold",
},


})









