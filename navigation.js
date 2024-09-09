import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";


import Splash from './screens/Splash/splash';
import Login from './screens/Auth/Login';
import Terms from './screens/Auth/Terms';
import Register from './screens/Auth/Register';
import KaKaoLogin from './screens/Auth/KakaoScreen/KakaoLogin';
import FindEmail from './screens/Auth/EmailScreen/FindEmail';
import EmailNotice from './screens/Auth/EmailScreen/EmailNotice';
import FindPassword from './screens/Auth/PasswordScreen/FindPassword';
import PasswordReset from './screens/Auth/PasswordScreen/PasswordReset';
import Home from './screens/home';


import HomeScreen from './screens/Home/HomeScreen';
import SharingPeople from './screens/Home/SharingPeopleScreen';

import IngredientScreen from './screens/Home/IngredientScreen';
import DetailIngredientScreen from './screens/Home/DetailIngredientScreen';

import FoodInput from './screens/Home/FoodInput';
import FoodInputDetail from './screens/Home/FoodInputDetail';
import CameraScreen from './screens/Home/Camerascreen';



import RecipeMain from './screens/Recipe/RecipeMain';
import GPTRecipeDetail from './screens/Recipe/GPTRecipeDetail';
import GptRecipeList from './screens/Recipe/GptRecipeList';
import RecipeDetail from './screens/Recipe/RecipeDetail';

import CommunityScreen from './screens/Community/CommunityScreen';
import CreatePostScreen from './screens/Community/CreatePostScreen';
import DetailCommunityScreen from './screens/Community/DetailCommunityScreen';
import LocationScreen from './screens/Community/LocationScreen';


import Screen1 from './screens/screen1';
import Screen2 from './screens/screen2';
import Screen3 from './screens/screen3';
import Screen4 from './screens/screen4';
import Screen5 from './screens/screen5';
import Screen6 from './screens/screen6';



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
      screenOptions = {{ headerShown: true }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="SharingPeople" component={SharingPeople} />
    </Stack.Navigator>
  )
}

function FoodInputTab(){
  return (
    <Stack.Navigator
      initialRouteName="FoodInputRoute"
      screenOptions = {{ headerShown: false }}
    >
      <Stack.Screen name="FoodInput" component={FoodInput} />
      <Stack.Screen name="FoodInputDetail" component={FoodInputDetail} />
      {/*<Stack.Screen name="CameraScreen" component={CameraScreen} />*/}
    </Stack.Navigator>
  )
}

function IngredientTab(){
  return (
    <Stack.Navigator
      initialRouteName="IngredientRoute"
      screenOptions = {{ headerShown: false }}
    >
       <Stack.Screen name="Ingredient" component={IngredientScreen} />
       <Stack.Screen name="DetailIngredient" component={DetailIngredientScreen} />
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
      <Stack.Screen name="CreatePostScreen" component={CreatePostScreen} />
      <Stack.Screen name="DetailCommunityScreen" component={DetailCommunityScreen} />
      <Stack.Screen name="LocationScreen" component={LocationScreen} />
    </Stack.Navigator>
  )
}

function SettingTab() {
  <Stack.Navigator
      initialRouteName="SettingScreenRoute"
      screenOptions = {{ headerShown: false }}
    >
      <Stack.Screen name="Top2 Screen6" component={Screen6} />
    </Stack.Navigator>
}

const BottomTab = createBottomTabNavigator();

function BottomStack() {
  return (
    <BottomTab.Navigator
      active
      screenOptions = {{ headerShown: false }}
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