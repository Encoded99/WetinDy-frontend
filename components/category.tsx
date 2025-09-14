import { View, Text,FlatList,StyleSheet } from 'react-native'
import React,{useState} from 'react'
import country from '../data/taxonomy.json'
import { CategoryType } from '@/store/business'
import { RFValue } from 'react-native-responsive-fontsize'
import { useGlobal } from '@/app/context'
import { percentagePadding } from './Element'
import {Paths} from '../data/paths'


// Utility to build paths outside renderItem
const buildPaths = (category: CategoryType, parentPath = ""): string[] => {
  const currentPath = parentPath ? `${parentPath}  >  ${category.name}` : category.name;

  if (!category.categories || category.categories.length === 0) {
    return [currentPath];
  }

  return category.categories.flatMap((sub) => buildPaths(sub, currentPath));
};

// Precompute all paths into a flat array
//const allPaths = country.flatMap((cat) => buildPaths(cat));


const Category = () => {
  const { textColor } = useGlobal();

  const renderItem = ({ item }: { item: string }) => (
    <View style={styles.categoryLine}>
      <Text style={[styles.lineText, { color: textColor }]}>{item}</Text>
    </View>
  );

  return (
    <FlatList
      data={Paths}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      showsVerticalScrollIndicator={false}
      initialNumToRender={20} // 🟢 Render fewer at first
      maxToRenderPerBatch={20} // 🟢 Batch rendering
      windowSize={10} // 🟢 Reduce memory usage
      removeClippedSubviews // 🟢 Unmount off-screen items
     
    />
  );
};


const styles= StyleSheet.create({
  categoryLine:{
   width:"100%",
   paddingHorizontal:percentagePadding
  },
  lineText:{
   fontSize:RFValue(11),
   fontFamily:'Poppins-Regular',
   marginVertical:20,
   flexWrap:"wrap"
  }
})

export default Category