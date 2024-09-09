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
import DropDownPicker from 'react-native-dropdown-picker';
import Toast from 'react-native-toast-message';
import { useNavigation } from "@react-navigation/native";
import useTabBarVisibility from "../useTabBarVisibility";

import GPTIcon from '../../assets/Icons/GPT.svg';
import X from '../../assets/Icons/X.svg';
import Magnifier from '../../assets/Icons/Magnifier.svg';
import Recommend from '../../assets/Icons/recommend.svg';

const RecipeMain = () => {
  useTabBarVisibility(true);
  const navigation = useNavigation();

  const [UserQuestion, setUserQuestion] = useState("");
  const [resMsg, setResMsg] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [closeingredients, setCloseIngredients] = useState([]);
  const [lastIndex, setLastIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchPerformed, setSearchPerformed] = useState(false); // 검색 여부 상태 변수
  const [loadingGPT, setLoadingGPT] = useState(false);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: '냉장고 재료 우선', value: 'ingredientfirst'},
    {label: '추천 순', value: 'recommendfirst'}
  ]);

  useEffect(() => {
    getIngredients();
    getCloseIngredients();
  }, []);

  const getIngredients = async () => {
    try {
      const TOKEN = await AsyncStorage.getItem('userAccessToken');
      const refrigeratorID = 125;

      const response = await axios.get(`http://www.sm-project-refrigerator.store/api/food/${refrigeratorID}`, {
        headers: { Authorization: `Bearer ${TOKEN}` }
      });

      if (response.status === 200) {
        const foodList = response.data.result.foodList || [];
        console.log('foodList:', foodList);
        const names = foodList.map(item => item?.name ? { name: item.name } : { name: 'Unknown' });
        setIngredients(names);
      }
    } catch (error) {
      console.error('Error fetching ingredients:', error);
    }
  };

  const getCloseIngredients = async () => {
    try {
      const TOKEN = await AsyncStorage.getItem('userAccessToken');
      const refrigeratorID = 125;
  
      const response = await axios.get(`http://www.sm-project-refrigerator.store/api/food/${refrigeratorID}`, {
        headers: { Authorization: `Bearer ${TOKEN}` }
      });
  
      if (response.status === 200) {
        const foodList = response.data.result.foodList || [];
        const today = new Date();
  
        // 유통기한이 14일 이내로 남은 재료 필터링
        const closeToExpireIngredients = foodList.filter(item => {
          if (item?.expire) {
            const expireDate = new Date(item.expire);
            const diffTime = expireDate.getTime() - today.getTime();
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return diffDays <= 14 && diffDays >= 0;  // 유통기한이 14일 이내인 재료만 반환
          }
          return false;
        });
  
        const formattedIngredients = closeToExpireIngredients.map(item => ({
          name: item.name || 'Unknown',
          expire: item.expire ? new Date(item.expire).toLocaleDateString() : '정보 없음'  // 유통기한 날짜 포맷
        }));
  
        setCloseIngredients(formattedIngredients);
      }
    } catch (error) {
      console.error('Error fetching close ingredients:', error);
    }
  };
  
  
  

  const FindRecipe = async (newSearch = false, ingredientName = UserQuestion) => {
    if (loading) return; 
    if (newSearch) {
      setResMsg([]); // 새로운 검색 시 결과 초기화
      setLastIndex(0); 
      setHasMore(true); 
    }
    if (!hasMore) return;
  
    setLoading(true);
    try {
      const TOKEN = await AsyncStorage.getItem('userAccessToken');
      const response = await axios.get('http://www.sm-project-refrigerator.store/api/recipe/ingredient', {
        params: { ingredient: ingredientName, lastIndex: lastIndex },
        headers: { Authorization: `Bearer ${TOKEN}` }
      });
  
      if (response.status === 200) {
        console.log('response:', response.data.result.content);
        const newResults = response.data.result.content;
        setResMsg(prevResults => [...prevResults, ...newResults]);
        setLastIndex(prevIndex => prevIndex + newResults.length);
        if (newResults.length < 5) {
          setHasMore(false);
        }
      }
    } catch (error) {
      console.error('Error fetching recipes:', error);
    } finally {
      setLoading(false);
    }
  };
  

  const handleSearch = () => {
    setSearchPerformed(true); 
    FindRecipe(true); // 새로운 검색 실행
  };

  const GPTRecipe = async () => {
    try {
      setLoadingGPT(true);
      showToast();
      const TOKEN = await AsyncStorage.getItem('userAccessToken');
      const response = await axios.get('http://www.sm-project-refrigerator.store/api/gpt/recipe', {
        headers: { Authorization: `Bearer ${TOKEN}` }
      });

      if (response.status === 200) {
        console.log('GPT response:', response.data.result);
         await AsyncStorage.setItem('selectedRecipe', JSON.stringify(response.data.result));
         navigation.navigate('GPTRecipeDetail');
      }
    } catch (error) {
      console.error('Error fetching GPT recipes:', error);
    } finally {
      setLoadingGPT(false); // End loading indicator
    }
  };

  const DetailRecipe = useCallback(async (recipeId) => {
    try {
      console.log('Selected Recipe ID:', recipeId);
      await AsyncStorage.setItem('RecipeId', recipeId.toString());
      navigation.navigate('RecipeDetail', { recipeId });
    } catch (error) {
      console.error('Error saving recipeId:', error);
    }
  }, [navigation]);
  
  // renderRecipe 함수에서 item.id를 DetailRecipe로 전달
  const renderRecipe = ({ item }) => (
    <TouchableOpacity
      onPress={() => DetailRecipe(item.id)}  // Use memoized DetailRecipe
      style={Styles.recipeContainer}>
        <View style={Styles.recommendContainer}>
        <Recommend />
        <Text style={{marginLeft : BasicWidth*3, color: '#AFAFAF'}}>{item.recommendCount}</Text>
      </View>
      <Text style={Styles.recipeName}>{item.name}</Text>
      <Text style={Styles.recipeIngredient}> 필요한 재료: {item.ingredient}</Text>
    </TouchableOpacity>
  );

  const renderIngredient = ({ item }) => (
    <TouchableOpacity onPress={() => {
        setUserQuestion(item.name); // 재료를 검색어로 설정
        setSearchPerformed(true); // 검색 상태로 변경
        FindRecipe(true, item.name); // 재료명을 직접 전달하여 검색 실행
    }}>
      <View style={Styles.ingredientContainer}>
        <Text style={Styles.ingredientText}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderCloseIngredient = ({ item }) => (
    <TouchableOpacity
    onPress={() => {
      setUserQuestion(item.name); // 재료를 검색어로 설정
      setSearchPerformed(true); // 검색 상태로 변경
      FindRecipe(true, item.name); // 재료명을 직접 전달하여 검색 실행
  }}>
      <View style={Styles.ingredientContainer}>
        <Text style={Styles.ingredientText}>
          {item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
  
  const toastConfig = {
    'errortoast': ({errtext}) => (
        <View 
        style={{
            backgroundColor: '#BECFF3',
            flexDirection: 'column',
            alignItems: 'center',
            alignContent: 'center',
            height: BasicWidth* 80,
            width: BasicHeight* 300,
            borderRadius: 10, 
            marginBottom: BasicHeight* 166,
        }}>
        <Text
            style={{
            color: '#000000',
            marginTop: BasicHeight* 17,
            }}
        >
            잠깐만요, AI가 냉장고 속 재료를 분석하여
        </Text>
        <Text
            style={{
            color: '#000000',
            }}
        >
            맛있는 요리 레시피를 찾아드리고 있습니다!
        </Text>
        </View>
    ),
    };

  const showToast = () => {
    Toast.show({
      type: 'errortoast',
      position: 'bottom',
      bottomOffset: BasicHeight*125,
      visibilityTime: 5000,
    });
  }

  return (
    <SafeAreaView style={Styles.container}>
      <View style={Styles.header}>
        <Text style={Styles.HomeText}>레시피</Text>
        <TouchableOpacity onPress={() => alert('뒤로가기')}>
          <X style={{marginLeft: BasicWidth*128, marginTop: BasicHeight * 12,}}/>
        </TouchableOpacity>
      </View>

      <View style={Styles.TextForm}>
        <Magnifier style={{ alignSelf: "center" }} />
        <TextInput
          style={Styles.Text}
          placeholder="검색어를 입력해주세요"
          onChangeText={(text) => setUserQuestion(text)}
          onSubmitEditing={handleSearch} 
        />
      </View>

      {searchPerformed ? (
        <>
          <View style={Styles.findstyle}>
            <Text>총 <Text style={{ color: '#3873EA' }}>{lastIndex}</Text>개 검색결과</Text>
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              placeholder="냉장고 재료 우선"
              style={Styles.dropdown}
            />
          </View>
          <FlatList
            data={resMsg}
            renderItem={renderRecipe}
            keyExtractor={(item, index) => index.toString()}
            onEndReached={() => FindRecipe()}
            onEndReachedThreshold={0.5}
            ListFooterComponent={loading && <ActivityIndicator size="large" />}
            contentContainerStyle={Styles.recipeList}
          />
        </>
      ) : (
        <>
          <Text style={Styles.ingredient}>내가 가져온 재료</Text>
          <FlatList
            data={ingredients}
            renderItem={renderIngredient}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={Styles.ingredientList}
            style={{height: BasicHeight*33, flexGrow: 0, marginTop: BasicHeight*10}}
          />
          <Text style={Styles.ingredient}>유통기한 임박한 재료</Text>
          <FlatList
              data={closeingredients}  // 유통기한 임박 재료
              renderItem={renderCloseIngredient}  // 필터링된 재료를 렌더링
              keyExtractor={(item, index) => index.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={Styles.ingredientList}
              style={{ height: BasicHeight * 33, flexGrow: 0, marginTop: BasicHeight * 10 }}
          />
          {loadingGPT && (
          <ActivityIndicator size="medium" color="#3873EA" />
        )}
          <View style={Styles.Icon}>
            <TouchableOpacity onPress={GPTRecipe}>
              <GPTIcon />
            </TouchableOpacity>
          </View>
        </>
      )}
      
      <Toast config={toastConfig} />
    </SafeAreaView>
  );
};

export default RecipeMain;

const AllWidth = Dimensions.get("window").width;
const AllHeight = Dimensions.get("window").height;

const FigmaWidth = 390;
const FigmaHeight = 844;

const BasicWidth = (AllWidth / FigmaWidth).toFixed(2);
const BasicHeight = (AllHeight / FigmaHeight).toFixed(2);

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
  header: {
    height: 59 * BasicHeight,
    width: AllWidth,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  HomeText: {
    marginTop: BasicHeight * 12,
    marginLeft: BasicWidth * 174,
    fontSize: 15,
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
    fontWeight: 'bold',
  },
  recipeIngredient: {
    fontSize: 14,
    color: '#555',
    width: BasicWidth * 299,
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
