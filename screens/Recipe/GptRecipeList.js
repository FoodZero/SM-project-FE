import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import useTabBarVisibility from "../useTabBarVisibility";
import { useNavigation } from "@react-navigation/native";

import Back from '../../assets/Icons/back.svg';
import Recommend from '../../assets/Icons/recommend.svg';

const GptRecipeList = () => {
  useTabBarVisibility(true);
  const navigation = useNavigation();

  const [recipes, setRecipes] = useState([]);  // 레시피 데이터를 저장할 상태
  const [count, setCount] = useState(0);  // 검색 결과 개수
  const [loading, setLoading] = useState(false);  // 로딩 상태 관리

  useEffect(() => {
    const LoadList = async () => {
      setLoading(true);  // 데이터를 불러오는 중 로딩 표시
      try {
        const TOKEN = await AsyncStorage.getItem('userAccessToken');
        const response = await axios.get('http://www.sm-project-refrigerator.store/api/gpt/recipe-list', {
          headers: { Authorization:  `Bearer ${TOKEN}` }
        });

        if (response.status === 200) {
          console.log('Recipe list:', response.data.result.recipeDtoList);
          setRecipes(response.data.result.recipeDtoList);  // 레시피 데이터를 상태에 저장
          setCount(response.data.result.recipeCount);  // 검색 결과 개수 저장
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
<<<<<<< HEAD
        <Text style={{marginLeft : BasicWidth*3, color: '#AFAFAF', fontFamily: 'NotoSansKR-Light', color: '#000000', includeFontPadding: false,}}>{item.recommendCount}</Text>
=======
        <Text style={{marginLeft : BasicWidth*3, color: '#AFAFAF'}}>{item.recommendCount}</Text>
>>>>>>> origin-flit/cli
      </View>
      <Text style={Styles.recipeName}>{item.recipeName}</Text>
      <Text style={Styles.recipeIngredient}> 필요한 재료: {item.ingredient}</Text>
    </TouchableOpacity>
  );

  const Reset = async() =>{
    try {
      const TOKEN = await AsyncStorage.getItem('userAccessToken');
      const response = await axios.delete('http://www.sm-project-refrigerator.store/api/gpt/recipe', {
        headers: { Authorization:  `Bearer ${TOKEN}` }
      });

      if (response.status === 200) {
        console.log('Reset log:', response);
        navigation.navigate('RecipeMain');
      } else {
        console.error('Server returned non-200 status code:', response.status);
      }
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  }

  return (
    <SafeAreaView style={Styles.container}>
      <View style={Styles.header}>
        <Text style={Styles.HomeText}>AI 추천 레시피</Text>
        <TouchableOpacity
          style={Styles.Back}
          onPress={Reset}>
          <Back />
        </TouchableOpacity>
      </View>
      <View style={Styles.findstyle}>
<<<<<<< HEAD
        <Text style={{fontFamily: 'NotoSansKR-Light', color: '#000000',includeFontPadding: false,}}>총 {count}개 검색결과</Text>
=======
        <Text>총 {count}개 검색결과</Text>
>>>>>>> origin-flit/cli
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

export default GptRecipeList;

const AllWidth = Dimensions.get("window").width;
const AllHeight = Dimensions.get("window").height;

const FigmaWidth = 390;
const FigmaHeight = 844;

const BasicWidth = (AllWidth / FigmaWidth).toFixed(2);
const BasicHeight = (AllHeight / FigmaHeight).toFixed(2);

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 59 * BasicHeight,
    width: AllWidth,
    flexDirection: 'row',
<<<<<<< HEAD
=======
    justifyContent: 'center',
>>>>>>> origin-flit/cli
  },
  HomeText: {
    marginTop: BasicHeight * 12,
    marginLeft: BasicWidth * 149,
    fontSize: 15,
<<<<<<< HEAD
    fontFamily: 'NotoSansKR-Bold',
    color: '#000000',
    includeFontPadding: false,
  },
  Back: {
    marginTop: BasicHeight * 13,
    marginLeft: BasicWidth * 107,
=======
  },
  Back: {
    marginTop: BasicHeight * 13,
    marginLeft: BasicWidth * 119,
>>>>>>> origin-flit/cli
  },
  findstyle: {
    flexDirection: 'row',
    marginLeft: BasicWidth * 33,
    marginTop: BasicHeight * 13,
    marginBottom: BasicHeight * 40,
    width: BasicWidth * 301,
  },
  recipeContainer: {
    width: BasicWidth * 330,
    marginBottom: BasicHeight * 30,
    borderColor: "#E2E2E2",
    padding: 15,
    borderWidth: 1,
    borderRadius: 10,
  },
  recipeName: {
    fontSize: 16,
<<<<<<< HEAD
    fontFamily: 'NotoSansKR-SemiBold',
    color: '#000000',
    includeFontPadding: false,
  },
  recipeIngredient: {
    fontSize: 14,
    fontFamily: 'NotoSansKR-Regular',
    color: '#000000',
    includeFontPadding: false,
=======
    fontWeight: 'bold',
  },
  recipeIngredient: {
    fontSize: 14,
    color: '#555',
>>>>>>> origin-flit/cli
  },
  recipeList: {
    paddingBottom: BasicHeight * 20,
    paddingHorizontal: BasicWidth * 33,
  },
  recommendContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    marginLeft: BasicWidth*275,
    marginTop: BasicHeight*10,
  },
});