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
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from 'react-native-vector-icons/MaterialIcons';

const Login = () => {
  const navigation = useNavigation();
  const [loginSelected, setloginSelection] = useState(false); 
  const [idSelected, setidSelection] = useState(false);

  return (
    //로그인
    <SafeAreaView style={Styles.Container}>
      <ScrollView>
      <View style = {Styles.BackContainer}>
        <View style = {Styles.IconContainer}>
        <Icon name = "close" size = {20}/>
        </View>
      <View style = {Styles.HomeContainer}>
      <Text style={Styles.HomeText}> 로그인 </Text>
      </View>
 
      <View style={Styles.InputArea}>
        <Text style={Styles.Lables}>이메일</Text>
        <TextInput 
        style={Styles.TextForm}
        textColor= {"#AFAFAF"}
        placeholder={"이메일을 입력해 주세요."}/>
      </View>


      <View style={Styles.InputArea}>
        <Text style={Styles.Lables}>비밀번호</Text>
        <TextInput 
        style={Styles.TextForm}
        textColor= {"#AFAFAF"}
        placeholder={"8~16자리 영문 + 숫자 + 특수문자 조합"}/>
      </View>


      <View style = {Styles.CheckboxesContainer}>

        <View style = {Styles.CheckboxContainer}>
          <CheckBox
              value={loginSelected}
              onValueChange={setloginSelection}
              style={Styles.Checkbox}/>
          <Text style={Styles.CheckboxText}>자동로그인</Text>
        </View>

        <View style = {Styles.CheckboxContainer}>
          <CheckBox
              value={idSelected}
              onValueChange={setidSelection}
              style={Styles.Checkbox}/>
          <Text style={Styles.CheckboxText}>아이디 저장</Text>
        </View>

      </View>

      <View style={Styles.ButtonArea}>
        <TouchableOpacity
          style={Styles.Button}
          activeOpacity={0.8}
          onPress ={()=> navigation.navigate("Login", {screen : 'Login'})}>
          <Text style={Styles.ButtonText}>로그인</Text>
        </TouchableOpacity>
      </View>
  
      <View style = {Styles.MiniButtonContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Signup", { screen: 'Signup' })}>
          <Text style = {Styles.MiniText}> 회원가입 </Text>
        </TouchableOpacity>
        <Text> | </Text>

        <TouchableOpacity
          onPress={() => navigation.navigate("Email", { screen: 'Email' })}>
          <Text style = {Styles.MiniText}> 이메일 찾기 </Text>
        </TouchableOpacity>
        <Text> | </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Password", { screen: 'Password' })}>
          <Text style = {Styles.MiniText}> 비밀번호 찾기 </Text>
        </TouchableOpacity>
      </View>

      <View style={Styles.FastButtonArea}>
        <Text style={Styles.FastLables}>SNS 간편로그인</Text>
        <TouchableOpacity
        onPress={() => navigation.navigate("KaKaoLogin", { screen: 'KaKaoLogin' })}
        style={Styles.FastButton}>
        <Text style={Styles.FastButtonText}>카카오로 시작하기</Text>
        </TouchableOpacity>
      </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Login;