import React from 'react';
import Navigation from './Navigation';
import Toast from 'react-native-toast-message';
import {AlertBox} from 'react-native-alertbox';

export default function App() {
  return (
    <>
    <Navigation />
    <AlertBox />
    <Toast/>
    </>
  );
}