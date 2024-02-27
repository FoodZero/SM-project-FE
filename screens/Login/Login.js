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
import CheckBox from 'expo-checkbox';
import { useNavigation } from "@react-navigation/native";
import Styles from './Loginstyles';

const Login = () => {
  const navigation = useNavigation();
  const [loginSelected, setloginSelection] = useState(false); 
  const [idSelected, setidSelection] = useState(false);

  return (
      <View style={Styles.container}> 
        <Text style={Styles.HomeText}>로그인 화면</Text>
        <View style={Styles.formArea}>
          <TextInput 
          style={Styles.textForm}
          placeholder={"ID"}/>
          <TextInput 
          style={Styles.textForm}
          placeholder={"Password"}/>

      <View style = {Styles.checkboxContainer}>
      <View style = {Styles.checkboxContainer}>
      <CheckBox
          value={loginSelected}
          onValueChange={setloginSelection}
          style={Styles.checkbox}
        />
        <Text style={Styles.label}>자동로그인</Text>
      </View>
      <View style = {Styles.checkboxContainer}>
      <CheckBox
      value={idSelected}
      onValueChange={setidSelection}
      style={Styles.checkbox}
      />
      <Text style={Styles.label}>아이디 저장</Text>
      </View>
      </View>
      </View>
      <View style = {Styles.minibuttoncontainor}>
      <TouchableOpacity
      onPress={() => navigation.navigate("Signup", { screen: 'Signup' })}
      >
      <Text style = {Styles.minitext}> 회원가입 </Text>
      </TouchableOpacity>

      <TouchableOpacity

      >
      <Text style = {Styles.minitext}> 이메일 찾기 </Text>
      </TouchableOpacity>

      <TouchableOpacity

      >
      <Text style = {Styles.minitext}> 비밀번호 찾기 </Text>
      </TouchableOpacity>

      </View>
      <View style={Styles.buttonArea}>
      <TouchableOpacity
      style={Styles.button}
      activeOpacity={0.8}
      onPress ={()=> navigation.navigate("Login", {screen : 'Login'})}>
      <Text style={Styles.buttonTitle}>Login</Text>
      </TouchableOpacity>
      </View>

      <Text style={Styles.BottomText}>SNS 간편로그인</Text>
      <TouchableOpacity
      onPress={() => navigation.navigate("KaKaoLogin", { screen: 'KaKaoLogin' })}
      style={Styles.NextBottom}
      >
      <Text style={Styles.BottomText}>카카오로 시작하기</Text>
      </TouchableOpacity>
      </View>
  )
}

export default Login;