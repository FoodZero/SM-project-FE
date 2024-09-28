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
    Share,
  } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from 'axios';
import useTabBarVisibility from "../useTabBarVisibility";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { useNavigation } from "@react-navigation/native";

import Bookmark from '../../assets/Icons/Bookmark.svg';
import BookmarkOn from '../../assets/Icons/BookmarkOn.svg';
import Recommend from '../../assets/Icons/recommend.svg';
import RecommendOn from '../../assets/Icons/recommendOn.svg';
import Back from '../../assets/Icons/back.svg';

const RecipeDetail = () => {
    const navigation = useNavigation();
    useTabBarVisibility(false);
    const [recipe, setRecipe] = useState(null);
    const [bookmark, setBookmark] = useState(false);
    const [recommend, setRecommend] = useState(false);
    const [recipeId, setRecipeId] = useState(null); // recipeId 상태 추가
    const [recommendCount, setRecommendCount] = useState(null);


    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                // AsyncStorage에서 RecipeId 가져오기
                const storedRecipeId = await AsyncStorage.getItem('RecipeId');
                setRecipeId(storedRecipeId); // 가져온 RecipeId를 상태로 설정

                const TOKEN = await AsyncStorage.getItem('userAccessToken');
                
                // API 호출: recipeId를 사용
                const response = await axios.get(`http://www.sm-project-refrigerator.store/api/recipe/${storedRecipeId}`, {
                    headers: { Authorization: `Bearer ${TOKEN}` }
                });

                if (response.status === 200) {
                    console.log('Received data:', response.data.result);
                    setRecipe(response.data.result);
                    setBookmark(response.data.result.bookmark);
                    setRecommend(response.data.result.recommend);
                    setRecommendCount(response.data.result.recommendCount);
                } else {
                    console.error('Server returned non-200 status code:', response.status);
                }
            } catch (error) {
                console.error('Error fetching recipe:', error);
            }
        };

        fetchRecipe();
    }, [recipeId]); // recipeId가 변경될 때마다 호출

    if (!recipe) {
        return  <ActivityIndicator size="large" />;
    }

    const { description, ingredient, recipeName} = recipe;
    // 북마크 기능
    const Bookmarking = async () => {
        try {
            const TOKEN = await AsyncStorage.getItem('userAccessToken');
            const response = await axios.post(
                `http://www.sm-project-refrigerator.store/api/bookmark/recipe/${recipeId}`, 
                {},  // 빈 객체를 데이터로 전달
                {
                    headers: { Authorization: `Bearer ${TOKEN}` }
                }
            );
    
            if (response.status === 200) {
                console.log('Successfully bookmarked recipe:', response.data);
                setBookmark(true);
            } else {
                console.error('Server returned non-200 status code:', response.status);
            }
        } catch (error) {
            console.error('Error bookmarking recipe:', error.response?.data || error.message);
        }
    };
    
    // 북마크 취소 기능
    const UndoBookmarking = async () => {
        try {
            const TOKEN = await AsyncStorage.getItem('userAccessToken');
            const response = await axios.delete(
                `http://www.sm-project-refrigerator.store/api/bookmark/recipe/${recipeId}`, 
                {
                    headers: { Authorization: `Bearer ${TOKEN}` },
                    data: { recipeId: recipeId }  // recipeId를 data로 전달
                }
            );
    
            if (response.status === 200) {
                console.log('Successfully deleted bookmark:', response.data);
                setBookmark(false);
            } else {
                console.error('Server returned non-200 status code:', response.status);
            }
        } catch (error) {
            console.error('Error while deleting bookmark:', error.response?.data || error.message);
        }
    };

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
    
    // 북마크 취소 기능
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

      const gotoFridge = async () => {
        try {
            // AsyncStorage에서 fridgeID 가져오기
            const fridgeId = await AsyncStorage.getItem('userRefId');
            console.log('storedfridgeId:', fridgeId);
            
            if (fridgeId) {
                navigation.navigate('홈', {
                    screen: 'Ingredient', 
                    params: { Id: fridgeId }
                });
                await AsyncStorage.removeItem('selectedFoodNames');
                navigation.reset({
                    index: 1, // 두 번째 화면이 포커스되도록 설정
                    routes: [
                        { name: '레시피' }, // Top2 스택을 초기화하여 '레시피'의 초기 화면으로 만듦
                        { name: '홈', params: { screen: 'Ingredient', params: { Id: fridgeId } } }
                    ],
                });
            } else {
                console.log('fridgeId is not available');
            }
        } catch (error) {
            console.error('Error fetching fridgeId:', error);
        }
    };
    

    // 북마크 on/off 기능
    const bookmarkONOFF = () => {
        if (bookmark == true) {
            UndoBookmarking();
            showToast('책갈피를 취소하였습니다.');
        } else {
            Bookmarking();
            showToast('책갈피에 저장하였습니다.');
        }
    };

    const recommendONOFF = () => {
        if (recommend == true) {
            UndoRecommending();
        } else {
            Recommending();
        }
    };

    const toastConfig = {
        'bookmark': ({ text1 }) => (
          <View style={Styles.toastContainer}>
            <Text style={{color:"#FFFFFF"}}>{text1}</Text> 
          </View>
        ),
      };
    
      const showToast = (text) => {
        Toast.show({
          type: 'bookmark',
          position: 'bottom',
          bottomOffset: BasicHeight*402,
          text1: text,  // text1으로 텍스트 전달
          visibilityTime: 2000,
        });
      }
      

    return (
        <SafeAreaView style={Styles.container}>
            <View style={Styles.TopContainer}>
            <Text style={Styles.HeaderText}>레시피</Text>
                <TouchableOpacity onPress={() => { if (navigation.canGoBack()) {
                        navigation.goBack();
                        console.log('뒤로가기');
                    } else {
                        navigation.navigate('레시피'); // 처음 화면으로 이동하도록 처리
                        console.log('처음 화면으로 이동');
                    }}}>
                    <Back style={{marginLeft: BasicWidth*127, marginTop: BasicHeight*15}}/>
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
            <Toast config={toastConfig}/>
        </SafeAreaView>
    );
};

export default RecipeDetail;

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
    },
    HeaderText: {
        fontSize: 16,
        marginLeft: BasicWidth * 172,
        marginTop: BasicHeight * 16,
        includeFontPadding: false,
        fontFamily: 'NotoSansKR-Bold',
        color: '#000000',
    },
    Bookmark: {
        position: 'absolute',
        marginLeft: BasicWidth * 273,
    },
    recipeContainer: {
        width: BasicWidth * 330,
        height: BasicHeight * 585,
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
        marginBottom: BasicHeight * 31,
        flexDirection: 'row',
    },
    recipeName: {
        fontSize: 20,
        color: '#000000',
        includeFontPadding: false,
        fontFamily: 'NotoSansKR-Bold',
    },
    ingredienttitle: {
        marginLeft: BasicWidth * 16,
        color: '#000000',
        includeFontPadding: false,
        fontFamily: 'NotoSansKR-Regular',
        fontSize: 16,
    },
    ingredient: {
        fontSize: 16,
        color: '#000000',
        includeFontPadding: false,
        fontFamily: 'NotoSansKR-Regular',
        flexWrap: 'wrap',
    },
    description: {
        fontSize: 16,
        color: '#000000',
        includeFontPadding: false,
        fontFamily: 'NotoSansKR-Regular',
    },
    recommendContainer: {
        position: 'absolute',
        left: BasicWidth * 22,
        bottom: BasicHeight * 27,
        justifyContent: 'center',
    },
    recommendContainer2: {
        flexDirection: 'row',
        width: BasicWidth * 100,
        height: BasicHeight * 30,
    },
    
    
    question: {
        fontSize: 16,
        color: '#000000',
        includeFontPadding: false,
        fontFamily: 'NotoSansKR-Regular',
        
    },
    Line: {
        width: BasicHeight * 700,
        height: BasicHeight * 0.5,
        marginTop: BasicHeight * 25,
        backgroundColor: '#E2E2E2',
        alignSelf: 'center',
    },
    ButtonArea: {
        flexDirection: 'row',
        marginTop: BasicHeight * 21,
        marginLeft: BasicWidth * 10,
    },
    Button: {
        width: BasicWidth * 155,
        height: BasicHeight * 60,
        marginLeft: BasicWidth * 20,
        borderColor: '#3873EA',
        borderWidth: 2,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ButtonText: {
        fontSize: 16,
        color: '#3873EA',
    },
    scrollDescription: {
        maxHeight: BasicHeight * 240,
        width: BasicWidth * 277,
        marginLeft: BasicWidth * 31,
        color: '#000000',
    },
    scrollIngredient: {
        maxHeight: BasicHeight * 95,
        width: BasicWidth * 277,
        marginLeft: BasicWidth * 31,
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
