import React from "react";
import {createRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import Styles from './Pwstyles';
import { SafeAreaView } from "react-native-safe-area-context";

const Password = () => {

    const navigation = useNavigation();
  return (
    //로그인
    <SafeAreaView>
      <View>
        <Text>이메일</Text>
        <TextInput 
            textColor= {"#AFAFAF"}
            placeholder={"이메일을 입력해 주세요."}/>
      </View>
    </SafeAreaView>
  );
}

export default Password;