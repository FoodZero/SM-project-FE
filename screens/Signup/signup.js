import React, { useCallback, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createRef, useState} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    ScrollView
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm, Controller } from "react-hook-form"
import Styles from './Signupstyles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from "axios";

const Signup = () => {
  const navigation = useNavigation();

  const {
    register,
    setValue,
    control,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data)

  const [loading, setLoading] = useState(false);

  const [errortext, setErrortext] = useState('');
  const [errortext2, setErrortext2] = useState('');
  const [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);
  //const [errortext, setErrortext] = useState('');
  //const [Time, setTime] = useState(179)
  //const {verification} = useSelector((state: RootState) => state.auth)
  //const {expireAt} = verification.OTP

  const EmailInputRef = createRef();
  const PasswordInputRef = createRef();
  const PhonenumberInputRef = createRef();
  const PhonenumberchkInputRef = createRef();
  const NicknameInputRef = createRef();

    return (
      <SafeAreaView style={Styles.Container}>
        <ScrollView style = {Styles.Scroll}>
        <View style = {Styles.BackContainer}>
          <View style = {Styles.IconContainer}>
            <TouchableOpacity onPress={() => alert('뒤로가기')}>
            <Icon name = "close" size = {20}/>
            </TouchableOpacity>
          </View>
          <View style = {Styles.HomeContainer}>
            <Text style={Styles.HomeText}> 회원가입 </Text>
          </View>
 
      <View style={Styles.InputArea}>
        <Text style={Styles.Lables}>이메일*</Text>
        <Controller
          control={control}
          name='UserEmail'
          rules={{ pattern:{value:  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: '올바른 이메일을 입력해 주세요.'},
            required: '이메일을 입력해 주세요.'}}
          render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
            <>
                <TextInput
                  style={Styles.TextForm}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder = "이메일을 입력해주세요."
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

      <View style={Styles.InputArea}>
        <Text style={Styles.Lables}>비밀번호</Text>
        <Controller
          control={control}
          name='UserPassword'
          rules={{pattern:{value: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/,
            message: "8~16자리 영문+숫자+특수문자 조합하여 입력해주세요."},
            required: '비밀번호를 입력해 주세요.'}}
          render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
            <>
                <TextInput
                  style={Styles.TextForm}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder = "8~16자리 영문+숫자+특수문자 조합"
                  ref = {PasswordInputRef}
                  returnKeyType= 'next'
                  onSubmitEditing={() =>
                    PhonenumberInputRef.current && PhonenumberInputRef.current.focus()
                  }
                />
              {error && (
                <Text style={Styles.Text}>{error.message || 'Error'}</Text>
              )}
            </>
          )}
        />
      </View>

      <View style={Styles.PnumInputArea}>
        <Text style={Styles.Lables}>전화번호</Text>
        <View style = {Styles.MiniArea}>
        <Controller
          control={control}
          name='UserPnum'
          rules={{
            pattern: {value: /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/}
          }}
          render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
            <>
                <TextInput
                  style={Styles.PnumForm}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder= "숫자만 입력"
                  inputMode="tel"
                  returnKeyType="next"
                  ref = {PhonenumberInputRef}
                  onSubmitEditing={() =>
                    PhonenumberchkInputRef.current && PhonenumberchkInputRef.current.focus()
                  }
                />
              {error && (
                <Text style={Styles.Text}>{error.message || 'Error'}</Text>
              )}
            </>
          )}
        />
        <TouchableOpacity
          style={Styles.MiniButton}
          activeOpacity={0.8}
          onPress ={handleSubmit(onSubmit)}>
          <Text style={Styles.MiniButtonText}>전송</Text>
        </TouchableOpacity>
        </View>
        <TextInput
        style={Styles.TextForm} 
        textColor= {"#AFAFAF"}
        placeholder={"인증번호"}
        onChangeText={(chkPnum) => setChkPnum(chkPnum)}
        ref = {PhonenumberchkInputRef}
        returnKeyType="next"
        onSubmitEditing={() =>
          NicknameInputRef.current && NicknameInputRef.current.focus()
        }
        blurOnSubmit = {false}
        inputMode="numeric"
        />
      </View>

      <View style={Styles.NickInputArea}>
        <Text style={Styles.Lables}>닉네임</Text>
        <View style={Styles.NickArea}>
        <Controller
          control={control}
          name='UserNick'
          rules={{
            pattern: {value: /^[가-힣a-zA-z]{2,15}$/,
            message: "2~15자리 사이의 닉네임을 입력해주세요"}
          }}
          render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
            <>
                <TextInput
                  style={Styles.NickForm}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder= "2~15자리"
                  ref = {NicknameInputRef}
                  returnKeyType= "done"
                />
              {error && (
                <Text style={Styles.Text}>{error.message || 'Error'}</Text>
              )}
            </>
          )}
        />
        <TouchableOpacity
          style={Styles.NickButton}
          activeOpacity={0.8}
          onPress ={handleSubmit(onSubmit)}>
          <Text style={Styles.MiniButtonText}>중복 확인</Text>
        </TouchableOpacity>
        </View>
      </View>

      <View style={Styles.ButtonArea}>
        <TouchableOpacity
          style={Styles.Button}
          activeOpacity={0.8}
          onPress ={handleSubmit(onSubmit)}>
          <Text style={Styles.ButtonText}>완료</Text>
        </TouchableOpacity>
      </View>
      </View>
      </ScrollView>
      </SafeAreaView>
    );
};
export default Signup;
/*
  async function getData() {
    try {
      const value = await AsyncStorage.getItem('userAccessToken')
      if(value !== null) {
        console.log(value);
      }
    } catch(e) {
      console.log('error', value);
    }
  }
  getData();
},[]); 
서버 연결하기 >> async로 전환 중

      fetch('https://localhost: 3306/api/members/register',
      {
          method : 'POST',
          body : formBody,
          headers : {
              'Content-Type': 'application/json',
          },
      })
      .then((response) => response.json())
      .then((responseJson) => {
          //Hide Loader
          setLoading(false);
          setErrortext2('');
          console.log(responseJson);
          // If server response message same as Data Matched
          if (responseJson.status === 'success') {
          setIsRegistraionSuccess(true);
          console.log('Registration Successful. Please Login to proceed');
          } else if (responseJson.status === 'duplicate') {
          setErrortext2('이미 존재하는 아이디입니다.');
          }
      })
      .catch((error) => {
          //Hide Loader
          setLoading(false);
          console.error(error);
    });
    
});
*/