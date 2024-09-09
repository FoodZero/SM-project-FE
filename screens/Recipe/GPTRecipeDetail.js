import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Button,
    ScrollView,
    ActivityIndicator,
  } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from 'axios';
import useTabBarVisibility from "../useTabBarVisibility";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import { useNavigation } from "@react-navigation/native";

import Reload from '../../assets/Icons/Reload.svg';
import Bookmark from '../../assets/Icons/Bookmark.svg';
import BookmarkOn from '../../assets/Icons/BookmarkOn.svg';
import Recommend from '../../assets/Icons/recommend.svg';
import RecommendOn from '../../assets/Icons/recommendOn.svg';


const GPTRecipeDetail = () => {
    const navigation = useNavigation();
    useTabBarVisibility(false);
    const [bookmark, setBookmark] = useState(false);
    const [recommend, setRecommend] = useState(false);
    const [recipe, setRecipe] = useState(null);
    const [recipeId, setRecipeId] = useState(null);
    const [recommendCount, setRecommendCount] = useState(null);
    

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                // AsyncStorage에서 데이터 가져오기
                const storedRecipe = await AsyncStorage.getItem('selectedRecipe');
                if (storedRecipe) {
                    const parsedRecipe = JSON.parse(storedRecipe);
                    
                    // recipeId가 존재하는지 로그로 확인
                    if (parsedRecipe.recipeId) {
                        setRecipe(parsedRecipe);
                        console.log('Stored recipe:', parsedRecipe);
                        setBookmark(parsedRecipe.bookmark);
                        setRecommend(parsedRecipe.recommend);
                        setRecommendCount(parsedRecipe.recommendCount);
                        setRecipeId(parsedRecipe.recipeId); // recipeId 설정
                        console.log('Recipe ID:', parsedRecipe.recipeId); // 로그로 recipeId 확인
                    } else {
                        console.error('recipeId is missing from the stored recipe');
                    }

                    if(recommendCount == null){
                        setRecommendCount(0);
                    }
                }
            } catch (error) {
                console.error('Failed to load the recipe data.', error);
            }
        };
    
        fetchRecipe();
    }, []);
    

    if (!recipe) {
        return  (<ActivityIndicator size="large" />);
    }

    const { description, ingredient, recipeName } = recipe;

    //GPT로 응답 재생성하기
    const GPTReload = async () => {
        try {
          showToast('잠깐만요, AI가 냉장고 속 재료를 분석하여\n맛있는 요리 레시피를 찾아드리고 있습니다.');
          const TOKEN = await AsyncStorage.getItem('userAccessToken');
          const response = await axios.get('http://www.sm-project-refrigerator.store/api/gpt/recipe', // body로 보낼 데이터
            {
              headers: { Authorization: `Bearer ${TOKEN}` }
            }
          );
          // 전체 응답 구조를 출력하여 데이터가 어디에 있는지 확인
          console.log('Full Server Response:', response.data);
    
          if (response.status === 200) {
            await AsyncStorage.setItem('selectedRecipe', JSON.stringify(response.data.result));
            setRecipe(response.data.result);
            setBookmark(response.data.result.bookmark);
            setRecommendCount(response.data.result.recommendCount);
            // 데이터가 예상한 형식인지 확인
            
          } else {
            console.error('Server returned non-200 status code:', response.status);
          }

          if(response.data.result.recommendCount == null){
            setRecommendCount(0);
        }
        } catch (error) {
          console.error('Error fetching ingredients:', error);
          showToast('현재 제공할 수 있는 레시피는 여기까지입니다.\n더 알고 싶은 것이 있으면 다른 재료를 알려주세요.');
        }
    };

    //재생성중 토스트 메시지 설정
    // toastConfig에 reload 타입 정의
    const toastConfig = {
        'error': ({ text1 }) => (
          <View style={Styles.toastContainer}>
            <Text style={{ color: '#000000' }}>{text1}</Text>
          </View>
        ),
        'bookmark': ({ text1 }) => (
          <View style={Styles.toastContainer}>
            <Text style={{ color: '#FFFFFF' }}>{text1}</Text>
          </View>
        ),
      };
      

      /*
    //재생성중 토스트 메시지 출력
    const showReloadToast = () => {
        Toast.show({
          type: 'reload', // 여기에 'reload'라는 타입이 맞는지 확인
          position: 'bottom',
          bottomOffset: BasicHeight*248,
          visibilityTime: 4500,
        });
      };
      */
      const showToast = (text) => {
        console.log("Toast 호출됨:", text); // 이 부분 추가
        Toast.show({
          type: 'error',
          position: 'bottom',
          bottomOffset: BasicHeight * 382,
          text1: text,
          visibilityTime: 2000,
        });
      };
      
      
      const showBookmarkToast = (text) => {
        Toast.show({
          type: 'bookmark',
          position: 'bottom',
          bottomOffset: BasicHeight * 402,
          text1: text,  // Use text1 here as well
          visibilityTime: 1000,
        });
      };
      
/*
      const showBookmarkOffToast = () => {
        Toast.show({
          type: 'bookmarkOFF', // 여기에 'bookmark' 타입이 맞는지 확인
          position: 'bottom',
          bottomOffset: BasicHeight*402,
          visibilityTime: 1000,
        });
      };
  */    
        

    //레시피 목록화면으로 이동
    const LoadList = () => {
        navigation.navigate("GptRecipeList");
    };

    //북마크 기능
    const Bookmarking = async() => {
        try {
            const TOKEN = await AsyncStorage.getItem('userAccessToken');
            console.log('Bookmarking recipeId:', recipeId);
            const response = await axios.post(`http://www.sm-project-refrigerator.store/api/bookmark/recipe/${recipeId}`, // body로 보낼 데이터
              {
                recipeId: recipeId
              },
              {
                headers: { Authorization: `Bearer ${TOKEN}` }
              }
            );
            // 전체 응답 구조를 출력하여 데이터가 어디에 있는지 확인
            console.log('Bookmark Response:', response.data);
      
            if (response.status === 200) {
              console.log('Bookmarking Success');
              setBookmark(true);
            } else {
              console.error('Server returned non-200 status code:', response.status);
            }
          } catch (error) {
            console.error('Error fetching ingredients:', error);
          }
    };

    //북마크 취소 기능
    const UndoBookmarking = async () => {
        try {
          const TOKEN = await AsyncStorage.getItem('userAccessToken');
          console.log('Bookmarking recipeId:', recipeId);
      
          const response = await axios.delete(
            `http://www.sm-project-refrigerator.store/api/bookmark/recipe/${recipeId}`, // API 엔드포인트
            {
              headers: { Authorization: `Bearer ${TOKEN}` }, // 헤더 설정
              data: { recipeId: recipeId } // 본문 데이터 전달
            }
          );
      
          // 전체 응답 구조를 출력하여 데이터가 어디에 있는지 확인
          console.log('Bookmark Response:', response.data);
      
          if (response.status === 200) {
            console.log('Bookmark Delete Success');
            setBookmark(false); // 성공 시 북마크 상태 변경
          } else {
            console.error('Server returned non-200 status code:', response.status);
          }
        } catch (error) {
          console.error('Error while deleting bookmark:', error);
        }
    };

    //추천 기능
    const Recommending = async () => {
        try {
            const TOKEN = await AsyncStorage.getItem('userAccessToken');
            const response = await axios.post(
                `http://www.sm-project-refrigerator.store/api/recommend/recipe/${recipeId}`, 
                {},  // 빈 객체를 데이터로 전달
                {
                    headers: { Authorization: `Bearer ${TOKEN}` }
                }
            );
    
            if (response.status === 200) {
                console.log('Successfully recommended recipe:', response.data);
                setRecommend(true);
                setRecommendCount(recommendCount+1);
            } else {
                console.error('Server returned non-200 status code:', response.status);
            }
        } catch (error) {
            console.error('Error recommending recipe:', error.response?.data || error.message);
        }
    };
    
    // 추천 취소 기능
    const UndoRecommending = async () => {
        try {
            const TOKEN = await AsyncStorage.getItem('userAccessToken');
            const response = await axios.delete(
                `http://www.sm-project-refrigerator.store/api/recommend/recipe/${recipeId}`, 
                {
                    headers: { Authorization: `Bearer ${TOKEN}` },
                    data: { recipeId: recipeId }  // recipeId를 data로 전달
                }
            );
    
            if (response.status === 200) {
                console.log('Successfully deleted recommend:', response.data);
                setRecommend(false);
                setRecommendCount(recommendCount-1);
            } else {
                console.error('Server returned non-200 status code:', response.status);
            }
        } catch (error) {
            console.error('Error while deleting recommend:', error.response?.data || error.message);
        }
    };

    //북마크 on/off
    const bookmarkONOFF = () => {
        if (bookmark == true) {
            UndoBookmarking();
        } else {
            Bookmarking();
        }
    };

    //추천 on/off
    const recommendONOFF = () => {
        if (recommend == true) {
            UndoRecommending();
            showBookmarkToast('추천을 취소하였습니다.');
        } else {
            Recommending();
            showBookmarkToast('추천하였습니다.');
        }
    };

    //아직 구현되지 않은 기능을 위한 임시 함수
    const onShare = async () => {
        try {
          const result = await Share.share({
            message:
              `${recipeName} \n\n필요한재료: ${ingredient} \n\n만드는 방법: ${description}`,
          });
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              // shared with activity type of result.activityType
            } else {
              // shared
            }
          } else if (result.action === Share.dismissedAction) {
            // dismissed
          }
        } catch (error) {
          Alert.alert(error.message);
        }
      };

    const gotoFridge = () => {
        navigation.navigate('커뮤니티', {screen: 'IngredientScreen'});
        navigation.reset({
            index: 1, // 두 번째 화면이 포커스되도록 설정
            routes: [
              { name: '레시피' }, // Top2 스택을 초기화하여 '레시피'의 초기 화면으로 만듦
              { name: '커뮤니티', params: { screen: 'IngredientScreen' } } // 화면을 'IngredientScreen'으로 유지
            ],
          });
          Reset();
    };
    const Reset = async() =>{
        try {
          const TOKEN = await AsyncStorage.getItem('userAccessToken');
          const response = await axios.delete('http://www.sm-project-refrigerator.store/api/gpt/recipe', {
            headers: { Authorization:  `Bearer ${TOKEN}` }
          });
    
          if (response.status === 200) {
            console.log('Reset log:', response);
          } else {
            console.error('Server returned non-200 status code:', response.status);
          }
        } catch (error) {
          console.error('Error fetching recipes:', error);
        }
      }

    
    return (
        <SafeAreaView style={Styles.container}>
            <View style={Styles.TopContainer}>
                <TouchableOpacity
                    onPress={GPTReload}
                    style={{marginLeft:BasicWidth*31, marginTop: BasicHeight*15}}>
                    <Reload/>
                </TouchableOpacity>
                <Text style={Styles.HeaderText}>레시피</Text>
                <TouchableOpacity
                    onPress={LoadList}>
                    <Text style={Styles.NavList}>목록</Text>
                </TouchableOpacity>
            </View>
            <View style={Styles.recipeContainer}>
                <View style={Styles.recipeContainer2}>
                    <Text style={Styles.recipeName}>{recipeName}</Text>
                    <TouchableOpacity style={Styles.Bookmark} onPress={bookmarkONOFF}>
                        {bookmark ? <BookmarkOn /> : <Bookmark />}
                    </TouchableOpacity>
                </View>
                <Text style={Styles.ingredienttitle}>필요한 재료</Text>
                <ScrollView style={Styles.scrollIngredient}>
                    <Text style={Styles.ingredient}>{ingredient}</Text>
                </ScrollView>
                <Text style={Styles.ingredienttitle}>준비 방법</Text>
                <ScrollView style={Styles.scrollDescription}>
                    <Text style={Styles.description}>{description}</Text>
                </ScrollView>
                <View style={Styles.recommendContainer}>
                    <Text style={Styles.question}>이 레시피를 다른 사용자에게 추천하고 싶나요?</Text>
                    <TouchableOpacity
                        style={Styles.recommendContainer2}
                        onPress={recommendONOFF}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            {recommend ? <RecommendOn /> : <Recommend />}
                            {recommend ? <Text style={{ marginLeft: 5, color: '#3873EA'}}>{recommendCount}</Text> : <Text style={{ marginLeft: 5, color: '#AFAFAF' }}>{recommendCount}</Text>}
                        </View>
                    </TouchableOpacity>

                </View>
            </View>
            <View style={Styles.Line} />
            <View style={Styles.ButtonArea}>
                <TouchableOpacity style={Styles.Button} onPress={onShare}>
                    <Text style={Styles.ButtonText}>공유하기</Text>
                </TouchableOpacity>
                <TouchableOpacity style={Styles.Button} onPress={gotoFridge}>
                    <Text style={Styles.ButtonText}>냉장고로 이동</Text>
                </TouchableOpacity>
            </View>
            <Toast config={toastConfig} />
        </SafeAreaView>
    )
}


export default GPTRecipeDetail;

const AllWidth = Dimensions.get("window").width;
const AllHeight = Dimensions.get("window").height;

const FigmaWidth = 390;
const FigmaHeight = 844;

const BasicWidth = (AllWidth / FigmaWidth).toFixed(2);
const BasicHeight = (AllHeight / FigmaHeight).toFixed(2);

const Styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
    },
    TopContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    HeaderText: {
        fontSize: 16,
        marginLeft: BasicWidth * 121,
        marginTop: BasicHeight * 16,
        includeFontPadding: false,
    },
    NavList:{
        fontSize: 16,
        marginLeft: BasicWidth * 116,
        marginTop: BasicHeight * 14,
    },
    Bookmark:{
        position: 'absolute',
        marginLeft: BasicWidth * 273,
    },
    recipeContainer: {
        width: BasicWidth * 330,
        height: BasicHeight* 585,
        marginLeft: BasicWidth * 30,
        marginTop: BasicHeight * 43,
        backgroundColor: '#fff',
        borderColor: '#3873EA',
        borderWidth: 1.5,
        borderRadius: 10,
    },
    recipeContainer2: {
        marginLeft: BasicWidth * 16,
        marginTop: BasicHeight * 21,
        marginBottom: BasicHeight*31,
        flexDirection: 'row',
    },
    recipeName: {
        fontSize: 20,
        color: '#000000',
    },
    ingredienttitle: {
        marginLeft: BasicWidth * 16,
        color: '#000000',
    },
    ingredient: {
        fontSize: 16,
        marginLeft: BasicWidth * 30,
        marginBottom: BasicHeight * 49,
        color: '#000000',
    },
    description: {
        fontSize: 16,
        marginLeft: BasicWidth * 31,
        marginRight: BasicWidth * 22,
        marginBottom: BasicHeight * 139,
        color: '#000000',
    },
    recommendContainer:{
        position: 'absolute',
        left: BasicWidth * 22,
        bottom: BasicHeight * 27,
    },
    recommendContainer2: {
        flexDirection: 'row',
        width: BasicWidth * 100,
        height: BasicHeight * 30,
    },
    
    question: {
        fontSize: 16,
        color: '#000000',
    },
    Line:{
        width:BasicHeight*700,
        height:BasicHeight*0.5,
        marginTop: BasicHeight*25,
        backgroundColor: '#E2E2E2',
        alignSelf:'center'
      },
    ButtonArea:{
        flexDirection:'row',
        marginTop: BasicHeight * 21,
        marginLeft: BasicWidth * 10,
    },
    Button:{
        width: BasicWidth * 155,
        height: BasicHeight * 60,
        marginLeft: BasicWidth * 20,
        borderColor: '#3873EA',
        borderWidth: 2,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ButtonText:{
        fontSize: 16,
        color: '#3873EA',
    },
    toastContainer: {
        backgroundColor: '#AFAFAF',
        height: BasicHeight * 39,
        width: BasicWidth * 190,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
      },
});
