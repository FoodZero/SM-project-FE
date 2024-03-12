import React from "react";
import {createRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import CheckBox from 'expo-checkbox';
import { useNavigation } from "@react-navigation/native";
import Styles from './Loginstyles';
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useForm, Controller } from "react-hook-form";


const Login = () => {

  const navigation = useNavigation();
  const onLogin = (data) =>{
    console.log(data);
    navigation.navigate("Login", {screen : 'Login'});
  };
  const {
    register,
    setValue,
    control,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  const [loginSelected, setloginSelection] = useState(false); 
  const [idSelected, setidSelection] = useState(false);
  const EmailInputRef = createRef();
  const PasswordInputRef = createRef();

  return (
    //로그인
    <SafeAreaView style={Styles.Container}>
      <ScrollView style = {Styles.Scroll}>
      <View style = {Styles.BackContainer}>
        <View style = {Styles.IconContainer}>
          <TouchableOpacity onPress={() => alert('뒤로가기')}>
          <Icon name = "close" size = {20}/>
          </TouchableOpacity>
        </View>
      <View style = {Styles.HomeContainer}>
      <Text style={Styles.HomeText}>로그인</Text>
      </View>
 
      <View style={Styles.InputArea1}>
        <Text style={Styles.Lables}>이메일*</Text>
        <Controller
          control={control}
          name='UserEmail'
          rules={{required: '이메일을 입력해주세요.'}}
          render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
            <>
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder = "이메일을 입력해주세요."
                  style={Styles.TextForm}
                  inputMode = 'email'
                  returnKeyType= 'next'
                  onSubmitEditing={() =>
                    PasswordInputRef.current && PasswordInputRef.current.focus()
                  }
                />
              {error && (
                <Text style={Styles.Text}>{error.message || 'Error'}</Text>
              )}
            </>
          )}
        />
      </View>


      <View style={Styles.InputArea2}>
        <Text style={Styles.Lables}>비밀번호*</Text>
        <Controller
          control={control}
          name='UserPassword'
          rules={{required: '비밀번호를 입력해 주세요.'}}
          render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
            <>
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder = "8~16자리 영문+숫자+특수문자 조합"
                  ref = {PasswordInputRef}
                  style={Styles.TextForm}
                />
              {error && (
                <Text style={Styles.Text}>{error.message || 'Error'}</Text>
              )}
            </>
          )}
        />
      </View>


      <View style = {Styles.CheckboxesContainer}>

        <View style = {Styles.CheckboxContainer}>
          <CheckBox
              value={loginSelected}
              onValueChange={setloginSelection}
              style={Styles.Checkbox}
              color={loginSelected? '#CAF6FF': undefined}/>
          <Text style={Styles.CheckboxText}>자동로그인</Text>
        </View>

        <View style = {Styles.CheckboxContainer}>
          <CheckBox
              value={idSelected}
              onValueChange={setidSelection}
              style={Styles.Checkbox}
              color={idSelected? '#CAF6FF': undefined}/>
          <Text style={Styles.CheckboxText}>아이디 저장</Text>
        </View>

      </View>

      <View style={Styles.ButtonArea}>
        <TouchableOpacity
          style={Styles.Button}
          activeOpacity={0.8}
          onPress ={handleSubmit(onLogin)}>
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