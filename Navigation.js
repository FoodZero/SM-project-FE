import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//로그인/회원가입 관련페이지
import Splash from './screens/Splash/splash';
import Login from './screens/Auth/Login';
import Register from './screens/Auth/Register';
import KaKaoLogin from './screens/Auth/KakaoScreen/KakaoLogin';
import FindEmail from './screens/Auth/EmailScreen/FindEmail';
import EmailNotice from './screens/Auth/EmailScreen/EmailNotice';
import FindPassword from './screens/Auth/PasswordScreen/FindPassword';
import PasswordReset from './screens/Auth/PasswordScreen/PasswordReset';
import Home from './screens/home';
import Terms from './screens/Auth/Terms';
import TermDetail from './screens/Auth/TermDetail';
import Term1 from './screens/Auth/Term1';
import Term2 from './screens/Auth/Term2';
import Term3 from './screens/Auth/Term3';

//홈 화면
import HomeScreen from './screens/Home/HomeScreen';
import SharingPeople from './screens/Home/SharingPeopleScreen';
import IngredientScreen from './screens/Home/IngredientScreen';
import DetailIngredientScreen from './screens/Home/DetailIngredientScreen';
import AlertPage from './screens/Home/AlertPage';

// 음식 입력 관련 페이지
import FoodInput from './screens/Food/FoodInput';
import FoodInputDetail from './screens/Food/FoodInputDetail';
import CameraScreen from './screens/Food/Camerascreen';
import ScanFoodCheck from './screens/Food/ScanFoodCheck';
import ScanFoodInput from './screens/Food/ScanFoodInput';

// 레시피 관련 페이지
import RecipeMain from './screens/Recipe/RecipeMain';
import GPTRecipeDetail from './screens/Recipe/GPTRecipeDetail';
import GptRecipeList from './screens/Recipe/GptRecipeList';
import RecipeDetail from './screens/Recipe/RecipeDetail';

// 커뮤니티 관련 페이지
import CommunityScreen from './screens/Community/CommunityScreen';
import CreatePostScreen from './screens/Community/CreatePostScreen';
import DetailCommunityScreen from './screens/Community/DetailCommunityScreen';
import LocationScreen from './screens/Community/LocationScreen';
import GeoLocationAPI from './screens/Community/GeoLocationAPI';
import LocationAuth from './screens/Community/LocationAuth';

// 마이페이지
import SettingScreen from './screens/Setting/SettingsScreen';
import SavedRecipe from './screens/Setting/SavedRecipe';
import DeleteUser from './screens/Setting/DeleteUser';
import DeleteComplete from './screens/Setting/DeleteComplete';

//Icons import
import HomeIcon from './assets/Icons/Home.svg';
import HomeOnIcon from './assets/Icons/HomeOn.svg';

import Recipe from './assets/Icons/Recipe.svg';
import RecipeOn from './assets/Icons/RecipeOn.svg';

import Community from './assets/Icons/Community.svg';
import CommunityOn from './assets/Icons/CommunityOn.svg';

import Setting from './assets/Icons/Setting.svg';
import SettingOn from './assets/Icons/SettingOn.svg';

const Stack = createStackNavigator();


function StackScreen() {
  return (
    <Stack.Navigator
      initialRouteName="Splash"

      screenOptions = {{ headerShown: false }}
    >
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="KaKaoLogin" component={KaKaoLogin} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Terms" component={Terms} />
      <Stack.Screen name="TermDetail" component={TermDetail} />
      <Stack.Screen name="Term1" component={Term1} />
      <Stack.Screen name="Term2" component={Term2} />
      <Stack.Screen name="Term3" component={Term3} />
      <Stack.Screen name="FindEmail" component={FindEmail} />
      <Stack.Screen name="EmailNotice" component={EmailNotice} />
      <Stack.Screen name="FindPassword" component={FindPassword} />
      <Stack.Screen name="PasswordReset" component={PasswordReset} />
      <Stack.Screen name="Home" component={BottomStack} />
    </Stack.Navigator>
  );
}

const TopTab = createMaterialTopTabNavigator();

function HomeTab() {
  return (
    <Stack.Navigator
      initialRouteName='HomeScreenRoute'
      screenOptions = {{ headerShown: false }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="SharingPeople" component={SharingPeople} />
      <Stack.Screen name="Ingredient" component={IngredientScreen} />
      <Stack.Screen name="DetailIngredient" component={DetailIngredientScreen} />
      <Stack.Screen name="FoodInput" component={FoodInput} />
      <Stack.Screen name="FoodInputDetail" component={FoodInputDetail} />
      <Stack.Screen name="CameraScreen" component={CameraScreen} />
      <Stack.Screen name="ScanFoodCheck" component={ScanFoodCheck} />
      <Stack.Screen name="ScanFoodInput" component={ScanFoodInput} />
      <Stack.Screen name="AlertPage" component={AlertPage} />
    </Stack.Navigator>
  )
}



function RecipeTab() {
  return (
    <Stack.Navigator
    initialRouteName="RecipeScreenRoute"
    screenOptions = {{ headerShown: false }}
  >
    <Stack.Screen name="RecipeMain" component={RecipeMain} />
    <Stack.Screen name="GPTRecipeDetail" component={GPTRecipeDetail} />
    <Stack.Screen name="GptRecipeList" component={GptRecipeList} />
    <Stack.Screen name="RecipeDetail" component={RecipeDetail} />
  </Stack.Navigator>
  )

}

function CommunityTab() {               
  return (
    <Stack.Navigator
      initialRouteName="CommunityScreenRoute"
      screenOptions = {{ headerShown: false }}
    >
      <Stack.Screen name="CommunityScreen" component={CommunityScreen} />
      <Stack.Screen name="GeoLocationAPI" component={GeoLocationAPI} />
      <Stack.Screen name="LocationScreen" component={LocationScreen} />
      <Stack.Screen name="LocationAuth" component={LocationAuth} />
      <Stack.Screen name="CreatePostScreen" component={CreatePostScreen} />
      <Stack.Screen name="DetailCommunityScreen" component={DetailCommunityScreen} />
    </Stack.Navigator>
  )
}

function SettingTab() {
  return (
    <Stack.Navigator
      initialRouteName="SettingScreenRoute"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="SettingScreen" component={SettingScreen} />
      <Stack.Screen name="SavedRecipe" component={SavedRecipe} />
      <Stack.Screen name ="RecipeDetail" component ={RecipeDetail} />
      <Stack.Screen name="GeoLocationAPI" component={GeoLocationAPI} />
      <Stack.Screen name="LocationScreen" component={LocationScreen} />
      <Stack.Screen name="LocationAuth" component={LocationAuth} />
      <Stack.Screen name="DeleteUser" component={DeleteUser} />
      <Stack.Screen name="DeleteComplete" component={DeleteComplete} />
    </Stack.Navigator>
  );
}
/*

      <Stack.Screen name="DetailCommunityScreen" component={DetailCommunityScreen} />
      <Stack.Screen name="LocationScreen" component={LocationScreen} />
*/


const BottomTab = createBottomTabNavigator();

function BottomStack() {
  return (
    <BottomTab.Navigator
      active
      screenOptions = {{ headerShown: false, tabBarStyle:{backgroundColor: '#F6F6F6'}, tabBarLabelStyle:{fontFamily: "NotoSansKR-Regular", includeFontPadding:false} }}
    >
      <BottomTab.Screen
        name="홈"
        component={HomeTab}
        options={{
          tabBarIcon: ({ focused }) => (focused ? <HomeOnIcon /> : <HomeIcon />),
        }}
      />
      <BottomTab.Screen
        name="레시피"
        component={RecipeTab}
        options={{
          tabBarIcon: ({ focused }) => (focused ? <RecipeOn /> : <Recipe />),
        }}
      />
      <BottomTab.Screen
        name="커뮤니티"
        component={CommunityTab}
        options={{
          tabBarIcon: ({ focused }) => (focused ? <CommunityOn /> : <Community />),
        }}
      />
      <BottomTab.Screen
        name="설정"
        component={SettingTab}
        options={{
          tabBarIcon: ({ focused }) => (focused ? <SettingOn /> : <Setting />),
        }}
      />
    </BottomTab.Navigator>
  );
}

function Navigation() {
  return (
    <NavigationContainer>
      <StackScreen>
        <BottomStack />
      </StackScreen>
    </NavigationContainer>
  );
}

export default Navigation;