import React from 'react';
import BottomTabNavigator from './navigation';
import {AlertBox} from 'react-native-alertbox';

export default function App() {
  return (
      
      <BottomTabNavigator>
          <AlertBox />
      </BottomTabNavigator>
  );
}