import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  FlatList,
  ActivityIndicator,
} from "react-native";
import axios from 'axios';
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { useNavigation, useRoute } from "@react-navigation/native";
import useTabBarVisibility from "../useTabBarVisibility";

import GPTIcon from '../../assets/Icons/GPT.svg';
import X from '../../assets/Icons/X.svg';
import Magnifier from '../../assets/Icons/Magnifier.svg';
import Recommend from '../../assets/Icons/recommend.svg';
const SavedRecipe = () => {
    useTabBarVisibility(true);
  const navigation = useNavigation();
  const route = useRoute();
  
  // 전달된 음식 이름 배열
  const selectedFoodNames = route.params?.selectedFoodNames || [];

  const [recipes, setRecipes] = useState([]);  // 레시피 데이터를 저장할 상태
  const [count, setCount] = useState(0);  // 검색 결과 개수
  const [loading, setLoading] = useState(false);  // 로딩 상태 관리

  useEffect(() => {
    const LoadList = async () => {
      setLoading(true);  // 데이터를 불러오는 중 로딩 표시
      try {
        const count = 0;
        const TOKEN = await AsyncStorage.getItem('userAccessToken');
        const response = await axios.get('http://www.sm-project-refrigerator.store/api/recipe/bookmark', {
          params: { page: count },
          headers: { Authorization: `Bearer ${TOKEN}` }
        });
        

        if (response.status === 200) {
          console.log('Recipe list:', response.data.result.bookmarkedRecipeDtoList);
          setRecipes(response.data.result.bookmarkedRecipeDtoList);  // 레시피 데이터를 상태에 저장
          //setCount(response.data.result.recipeCount);  // 검색 결과 개수 저장
        } else {
          console.error('Server returned non-200 status code:', response.status);
        }
      } catch (error) {
        console.error('Error fetching recipes:', error);
      } finally {
        setLoading(false);  // 데이터 불러오기가 끝나면 로딩 상태 해제
      }
    };
    
    LoadList();  // 컴포넌트가 마운트될 때 리스트를 불러옴
    console.log(count);
  }, []);


  const DetailRecipe = useCallback(async (recipeId) => {
    try {
      console.log('Selected Recipe ID:', recipeId);
      await AsyncStorage.setItem('RecipeId', recipeId.toString());
      navigation.navigate('RecipeDetail', { recipeId });
    } catch (error) {
      console.error('Error saving recipeId:', error);
    }
  }, [navigation]);

      const renderRecipe = ({ item }) => (
        <TouchableOpacity
          onPress={() => DetailRecipe(item.recipeId)}  // Use memoized DetailRecipe
          style={Styles.recipeContainer}>
            <View style={Styles.recommendContainer}>
            <Recommend />
            <Text style={{marginLeft : BasicWidth*3, color: '#AFAFAF'}}>{item.recommendCount}</Text>
          </View>
          <Text style={Styles.recipeName}>{item.recipeName}</Text>
          <Text style={Styles.recipeIngredient}> 필요한 재료: {item.ingredient}</Text>
        </TouchableOpacity>
      );
    
      

    return (
        <SafeAreaView style={Styles.container}>
          <View style={Styles.header}>
            <Text style={Styles.HomeText}>북마크 레시피</Text>
            <X style={{marginLeft:BasicWidth*95, marginTop:BasicHeight*13}}/>
          </View>
            <View style={Styles.findstyle}>
            <Text>총 <Text style={{ color: '#3873EA' }}>{recipes.length}</Text>개</Text>
          </View>
       
          {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={recipes}  // 상태에 저장된 레시피 리스트를 렌더링
          renderItem={renderRecipe}
          keyExtractor={(item, index) => item.recipeId.toString()}  // recipeId를 key로 사용
          contentContainerStyle={Styles.recipeList}
        />
      )}
      
        </SafeAreaView>
    );
};

export default SavedRecipe;

const AllWidth = Dimensions.get("window").width;
const AllHeight = Dimensions.get("window").height;

const FigmaWidth = 390;
const FigmaHeight = 844;

const BasicWidth = (AllWidth / FigmaWidth).toFixed(2);
const BasicHeight = (AllHeight / FigmaHeight).toFixed(2);

const Styles = StyleSheet.create({
    container: {
      flex: 1,
      //backgroundColor: '#F6F6F6',
    },
    header: {
      flexDirection: 'row',
    },
    HomeText: {
      marginTop: BasicHeight * 16,
      marginLeft: BasicWidth * 140,
      fontSize: 19,
      fontFamily: 'NotoSansKR-Bold',
      includeFontPadding: false,
      color: '#000000',
    },
    TextForm: {
      width: BasicWidth * 330,
      height: BasicHeight * 56,
      borderColor: "#E2E2E2",
      backgroundColor: '#FFFFFF',
      borderWidth: 1,
      borderRadius: 15,
      paddingHorizontal: 10,
      marginLeft: BasicWidth * 30,
      flexDirection: 'row',
    },
    Text: {
      marginLeft: BasicWidth * 17,
      width: BasicWidth * 276,
      
    },
    ingredient: {
      marginLeft: BasicWidth * 33,
      marginTop: BasicHeight * 25,
    },
    Icon: {
      alignSelf: 'center',
      marginTop: BasicHeight * 344,
    },
    ingredientContainer: {
      marginRight: BasicWidth * 10,
      height: BasicHeight * 32,
      borderColor: '#3873EA',
      borderWidth: 1,
      borderRadius: 20,
      justifyContent: 'center',
  
    },
    ingredientText: {
      marginLeft: BasicWidth * 10,
      marginRight: BasicHeight * 10,
      fontSize: 13,
      color: '#3873EA',
      fontFamily: 'NotoSansKR-Regular',
    },
    recipeContainer: {
      width: BasicWidth * 330,
      borderColor: "#E2E2E2",
      backgroundColor: '#FFFFFF',
      padding: 15,
      borderWidth: 1,
      borderRadius: 10,
      marginBottom: BasicHeight * 30,
    },
    recipeName: {
      fontSize: 16,
      fontFamily: 'NotoSansKR-Regular',
      includeFontPadding: false,
      color: '#000000',
    },
    recipeIngredient: {
      fontSize: 14,
      fontFamily: 'NotoSansKR-Regular',
      includeFontPadding: false,
      color: '#000000',
    },
    ingredientList: {
      height: BasicHeight * 32,
      marginLeft: BasicWidth * 33,
    },
    recipeList: {
      paddingBottom: BasicHeight * 20,
      paddingHorizontal: BasicWidth * 33,
    },
    findstyle: {
      flexDirection: 'row',
      marginLeft: BasicWidth * 33,
      marginTop: BasicHeight * 13,
      marginBottom: BasicHeight * 40,
      width: BasicWidth * 301,
    },
    dropdown: {
      backgroundColor: '#FFFFFF',
      width: BasicWidth * 160,
      height: BasicHeight * 22,
      marginLeft: BasicWidth * 96,
    },
    toastContainer: {
      backgroundColor: '#BECFF3',
      height: BasicHeight * 80,
      width: BasicWidth * 300,
      borderRadius: 10,
      marginBottom: BasicHeight * 166,
      alignItems: 'center',
      justifyContent: 'center',
    },
    recommendContainer:{
      flexDirection: 'row',
      alignItems: 'center',
      position: 'absolute',
      marginLeft: BasicWidth*275,
      marginTop: BasicHeight*10,
    },
});
