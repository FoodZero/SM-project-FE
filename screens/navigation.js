import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { AntDesign } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';
import CommunityScreen from './screens/CommunityScreen';
import SettingsScreen from './screens/SettingsScreen';
import RecipeScreen from './screens/RecipeScreen';
import DetailIngredientScreen from './screens/DetailIngredientScreen';
import Splash from './screens/splash';
import signin from './screens/signin';
import signup from './screens/signup';
import KaKaoLogin from './screens/kakaologin';
import SharingPeople from './screens/SharingPeopleScreen';
import Ingredient from './screens/IngredientScreen';
import CreatePostScreen from './screens/CreatePostScreen';
import DetailCommunityScreen from './screens/DetailCommunityScreen';
import LocationScreen from './screens/LocationScreen';
import AddIngredientScreen from './screens/AddIngrediantscreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Signin" component={signin} />
      <Stack.Screen name="KaKaoLogin" component={KaKaoLogin} />
      <Stack.Screen name="Signup" component={signup} />
      <Stack.Screen name="HomeMain" component={HomeScreen} options={{ title: 'Home' }} />
      <Stack.Screen name="DetailIngredient" component={DetailIngredientScreen} />
      <Stack.Screen name="SharingPeople" component={SharingPeople} />
      <Stack.Screen name="Ingredient" component={Ingredient} />
      <Stack.Screen name="CreatePostScreen" component={CreatePostScreen} />
      <Stack.Screen name="CommunityScreen" component={CommunityScreen} />
      <Stack.Screen name="DetailCommunityScreen" component={DetailCommunityScreen} />
      <Stack.Screen name="LocationScreen" component={LocationScreen} />
      <Stack.Screen name="AddIngredientScreen" component={AddIngredientScreen} />
    </Stack.Navigator>
  );
};

const BottomTabNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'HomeTab') {
              iconName = 'home';
            } else if (route.name === 'SettingsTab') {
              iconName = 'setting';
            } else if (route.name === 'CommunityTab') {
              iconName = 'message1';
            } else if (route.name === 'RecipeTab') {
              iconName = 'form';
            }

            return <AntDesign name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#3873EA',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="HomeTab" component={HomeStack} options={{ title: 'Home' }} />
        <Tab.Screen name="RecipeTab" component={RecipeScreen} options={{ title: 'Recipe' }} />
        <Tab.Screen name="CommunityTab" component={CommunityScreen} options={{ title: 'Community' }} />
        <Tab.Screen name="SettingsTab" component={SettingsScreen} options={{ title: 'Settings' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default BottomTabNavigator;