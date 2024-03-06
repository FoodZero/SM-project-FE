/*
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Splash = () => {

  const navigation = useNavigation();

  return (
    <SafeAreaView style={Styles.container}>      
      <Text style={Styles.HomeText}>스플래시 화면</Text>
      <TouchableOpacity
          onPress={() => navigation.navigate("Login", { screen: 'Login' })}
          style={Styles.NextBottom}
        >
          <Text style={Styles.BottomText}>로그인 화면으로</Text>
        </TouchableOpacity>
    </SafeAreaView>
  )
}

export default Splash;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  HomeText: {
    fontSize: 30,
    textAlign: "center",
  },
  NextBottom: {
    backgroundColor: "purple",
    padding: 10,
    marginTop: "20%",
    width: "50%",
    alignSelf: "center",
    borderRadius: 10,
  },
  BottomText: {
    fontSize: 15,
    color: 'white',
    textAlign: "center",
  }
})
*/
import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  View,
  Image,
  Text
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Splashimage from '../../assets/Images/splashimg.png';
import { useNavigation } from "@react-navigation/native";
import styles from './splashstyles';

const SplashScreen = ({navigation}) => {
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      //Check if user_id is set or not
      //If not then send for Authentication
      //else send to Home Screen
      AsyncStorage.getItem('user_id').then((value) =>
        navigation.replace(value === null ? 'Login' : 'Home'),
      );
    }, 3000);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
        <Image
          source={Splashimage}
        />
    </SafeAreaView>
  );
};
export default SplashScreen;

/*
 background-color: #caf6ff;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;

  & .div {
    background-color: var(--point-color);
    height: 844px;
    position: relative;
    width: 390px;

    & .text-wrapper {
      color: #000000;
      font-family: "Actor-Regular", Helvetica;
      font-size: 24px;
      font-weight: 400;
      left: 68px;
      letter-spacing: 0;
      line-height: normal;
      position: absolute;
      text-align: center;
      top: 544px;
    }

    & .text-wrapper-2 {
      color: #000000;
      font-family: var(--h1-font-family);
      font-size: var(--h1-font-size);
      font-style: var(--h1-font-style);
      font-weight: var(--h1-font-weight);
      left: 71px;
      letter-spacing: var(--h1-letter-spacing);
      line-height: var(--h1-line-height);
      position: absolute;
      top: 479px;
      white-space: nowrap;
      width: 248px;
    }

    & .overlap-group {
      background-color: var(--point-color);
      border-radius: 20px;
      height: 181px;
      left: 111px;
      position: absolute;
      top: 268px;
      width: 176px;

      & .image {
        height: 177px;
        left: 21px;
        object-fit: cover;
        position: absolute;
        top: 2px;
        width: 125px;
      }
    }

    & .button-iphone-x-or-instance {
      left: 0 !important;
      position: absolute !important;
      top: 0 !important;
    }
  }
*/