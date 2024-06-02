import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Splash from './screens/Splash/splash';
import Login from './screens/Auth/Login';
import Terms from './screens/Auth/Terms';
import Register from './screens/Auth/Register';
import KaKaoLogin from './screens/Auth/KakaoLogin';
import Signin from './screens/Auth/KakaoScreen/Signin';
import FindEmail from './screens/Auth/EmailScreen/FindEmail';
import EmailNotice from './screens/Auth/EmailScreen/EmailNotice';
import FindPassword from './screens/Auth/PasswordScreen/FindPassword';
import PasswordReset from './screens/Auth/PasswordScreen/PasswordReset';
import Home from './screens/home';

import FoodInput from './screens/FoodInput';
import FoodDetail from './screens/FoodInputDetail';
import Screen3 from './screens/screen3';
import Screen4 from './screens/screen4';
import Screen5 from './screens/screen5';
import Screen6 from './screens/screen6';

import CameraScreen from './screens/Camerascreen';

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
      <Stack.Screen name="Signin" component={Signin} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Terms" component={Terms} />
      <Stack.Screen name="FindEmail" component={FindEmail} />
      <Stack.Screen name="EmailNotice" component={EmailNotice} />
      <Stack.Screen name="FindPassword" component={FindPassword} />
      <Stack.Screen name="PasswordReset" component={PasswordReset} />
      <Stack.Screen name= "CameraScreen" component={CameraScreen} />
      <Stack.Screen name="FoodInput" component={FoodInput} />
      <Stack.Screen name="FoodDetail" component={FoodDetail} />
      <Stack.Screen name="Home" component={BottomStack} />
    </Stack.Navigator>
  );
}

const TopTab = createMaterialTopTabNavigator();

function Top1() {
  return (
    <TopTab.Navigator>

    </TopTab.Navigator>
  )
}

function Top2() {
  return (
    <TopTab.Navigator>
      <TopTab.Screen name="Top2 Screen4" component={Screen4} />
      <TopTab.Screen name="Top2 Screen5" component={Screen5} />
      <TopTab.Screen name="Top2 Screen6" component={Screen6} />
    </TopTab.Navigator>
  )
}

const BottomTab = createBottomTabNavigator();

function BottomStack() {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen name="Top1" component={Top1} />
      <BottomTab.Screen name="Bottom" component={Screen3} />
      <BottomTab.Screen name="Top2" component={Top2} />
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