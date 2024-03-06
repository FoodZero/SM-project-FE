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
import Styles from './Emailstyles';
import { SafeAreaView } from "react-native-safe-area-context";

const Email = () => {
  const navigation = useNavigation();

  return (
    //로그인
    <SafeAreaView>
      <View>
        <Text>휴대폰 번호</Text>
        <TextInput 
          placeholder={"숫자만 입력"}/>
      </View>
    </SafeAreaView>
  );
}

export default Email;