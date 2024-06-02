import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";


import Splash from './screens/splash';
import signin from './screens/Signin';
import signup from './screens/signup';
import KaKaoLogin from './screens/kakaologin';
import Home from './screens/home';

import Screen1 from './screens/screen1';
import Screen2 from './screens/screen2';
import Screen3 from './screens/screen3';
import Screen4 from './screens/screen4';
import Screen5 from './screens/screen5';
import Screen6 from './screens/screen6';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (

    <NavigationContainer>   
      <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Signin" component={signin} />
      <Stack.Screen name="KaKaoLogin" component={KaKaoLogin} />
      <Stack.Screen name="Signup" component={signup} />
      <Stack.Screen name="screen1" component={Screen1} />
      <Stack.Screen name="screen2" component={Screen2} />
      <Stack.Screen name="screen3" component={Screen3} />
    </Stack.Navigator>
    </NavigationContainer>

  );
};



export default AppNavigator;