import React, { useCallback, useEffect } from "react";
import {createRef, useState} from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  BackHandler
} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import PermissionModal from '../Splash/PermissionModal';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

import X from '../../assets/Icons/X.svg';
import Sector from '../../assets/Icons/Sector.svg';
import CheckboxOff from '../../assets/Icons/CheckboxOff.svg';
import CheckboxOn from '../../assets/Icons/CheckboxOn.svg';


const Login = () => {
  const navigation = useNavigation();
  
  useEffect(() => {

    //아이디 저장 했을때 하기 위함
    const fetchStoredEmail = async () => {
      try {
        // AsyncStorage에서 저장된 이메일 가져오기
        const storedEmail = await AsyncStorage.getItem('userEmail');
        if (storedEmail) {
          setUserEmail(storedEmail); // 이메일이 있을 경우 TextInput에 표시
          setidSelection(true); // 체크박스 체크
        }
      } catch (error) {
        console.error('Error fetching email from AsyncStorage', error);
      }
    };
  
    fetchStoredEmail();
    
    console.log(`Open Modal`);
    setModalVisible(true);
    
  }, []);


  // 이메일, 비밀번호 입력값받는 state
  const [UserEmail, setUserEmail] = useState("");
  const [UserPassword, setUserPassword] = useState("");

  // 참/거짓값을 받는 state
  const [loading, setLoading] = useState(false);
  const [loginSelected, setloginSelection] = useState(false); 
  const [idSelected, setidSelection] = useState(false);
  const [ValidEmail, setValidEmail] = useState(false);
  const [ValidPassword, setValidPassword] = useState(false);
  const [ValidUser, setValidUser] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  // 현재 이메일, 비밀번호를 받는 Ref
  const EmailInputRef = createRef(); 
  const PasswordInputRef = createRef();
  
  // 이메일 정규식
  const HandleEmailChk = (text) =>{
    let emailRegex = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,}$/i;

    setUserEmail(text)
    if(emailRegex.test(text) == false){
      setValidEmail(true);
    }
    else{
      setValidEmail(false);
    }
  }

  // 비밀번호 정규식
  const HandlePwChk = (text) =>{
    let passwordRegex = /^[A-Za-z0-9#?!@$%^&*-](?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-])[a-z0-9#?!@$%^&*-]{8,16}$/;

    setUserPassword(text)
    if(passwordRegex.test(text) == false){
      setValidPassword(true);
    }
    else{
      setValidPassword(false);
    }
  }

  //로그인 실패 토스트 메세지
  const showToast = () => {
    Toast.show({
      type: 'errortoast',
      position: 'top',
      topOffset: BasicHeight*304,

      visibilityTime: 2000,
    });
  }

  //토스트 메세지 커스텀 함수
  const toastConfig = {
    'errortoast': ({errtext}) => (
      <View 
        style={{
          backgroundColor: '#AFAFAF',
          flexDirection: 'row',
          alignItems: 'center',
          alignContent: 'center',
          height: BasicWidth* 39,
          width: BasicHeight* 294,
          borderRadius: 10, 
        }}>
        <Text
          style={{
            width: BasicWidth* 248,
            height: BasicHeight* 20,
            color: '#FFFFFF',
            alignSelf: 'center',
            marginLeft: BasicWidth*16,
            includeFontPadding: false,
            fontFamily: 'NotoSansKR-Light',
            fontSize: 14,
          }}
        >
          아이디 또는 비밀번호가 일치하지 않습니다.
        </Text>
      </View>
    ),
  };

//로그인 위한 데이터
  const data = {
    email: UserEmail,
    password: UserPassword,
  };

  //로그인 함수
  const HandleLogin = async () => {
    if (loading) return; // 이미 로딩 중이면 새로운 요청을 방지
    try {
      const response = await axios.post('http://www.sm-project-refrigerator.store/api/members/login',data);

      if (response.status === 200) {
        console.log(response.data);
          await AsyncStorage.setItem('userAccessToken', response.data.result.accessToken);
        if(idSelected){
          await AsyncStorage.setItem('userEmail', UserEmail);
        }
        navigation.navigate("Home");
      }
    } catch (error) {
      console.error('Error:', error);
      console.log('로그인에 문제가 있습니다.');
      showToast();
    } finally {
      setLoading(false);
    }
  };

  //X버튼 눌렀을때 앱 종료
  const goBack = () => {
    Alert.alert('잠시만요!', '정말 앱을 종료하시겠습니까?', [
      {
        text: '아니요',
        onPress: () => null,
        style: 'cancel',
      },
      {text: '네', onPress: () => BackHandler.exitApp()},
    ]);
    return true;
  };
  //자동로그인 체크
  const loginbuttonpress = () => {
    setloginSelection(!loginSelected);
  };

  //아이디 저장 체크
  const idbuttonpress = () => {
    setidSelection(!idSelected);
  };

  return (
    //로그인
      <SafeAreaView style={Styles.Container}>
      <ScrollView style = {Styles.Scroll}>
      <PermissionModal isVisible={isModalVisible} onClose={() => setModalVisible(false)} />
      <View style = {Styles.BackContainer}>
        <View style = {Styles.IconContainer}>
          <TouchableOpacity onPress={() => goBack()}>
          <X/>
          </TouchableOpacity>
        </View>
      <View style = {Styles.HomeContainer}>
      <Text style={Styles.HomeText}>로그인</Text>
      </View>
 
      <View style={Styles.InputArea1}>
        <Text style={Styles.Lables}>이메일*</Text>
        <TextInput
          style={Styles.TextForm}
          placeholder = "이메일을 입력해 주세요."
          onChangeText = {(text) => HandleEmailChk(text)}
          onChange={setUserEmail}
          value = {UserEmail}
          inputMode = 'email'
          returnKeyType= 'next'
          ref = {EmailInputRef}
          onSubmitEditing={() =>
            PasswordInputRef.current && PasswordInputRef.current.focus()
          }
        />
        {
          ValidEmail ? (<Text style= {Styles.Text}>이메일을 입력해 주세요.</Text>) : (<Text style= {Styles.Text}> </Text>)
        }
      </View>


      <View style={Styles.InputArea2}>
        <Text style={Styles.Lables}>비밀번호*</Text>
        <TextInput
          style={Styles.TextForm}
          onChange={setUserPassword}
          value={UserPassword}
          placeholder = "8~16자리 영문+숫자+특수문자 조합"
          secureTextEntry={true}
          onChangeText = {(text) => HandlePwChk(text)}
          returnKeyType= 'done'
          ref = {PasswordInputRef}
        />
        {
          ValidPassword ? (<Text style= {Styles.Text}>비밀번호를 입력해 주세요.</Text>) : (<Text style= {Styles.Text}> </Text>)
        }
      </View>


      <View style = {Styles.CheckboxesContainer}>

        <View style = {Styles.CheckboxContainer1}>
          <TouchableOpacity onPress={loginbuttonpress} style={{marginTop:BasicHeight*5}}>
            {loginSelected? <CheckboxOn/> : <CheckboxOff/>}
          </TouchableOpacity>
          <Text style={Styles.CheckboxText}>자동 로그인</Text>
        </View>

        <View style = {Styles.CheckboxContainer2}>
          <TouchableOpacity style={{marginTop:BasicHeight*5}} onPress={idbuttonpress}>
            {idSelected? <CheckboxOn/> : <CheckboxOff/>}
          </TouchableOpacity>
          <Text style={Styles.CheckboxText}>아이디 저장</Text>
        </View>

      </View>

      <View style={Styles.ButtonArea}>
        <TouchableOpacity
          style={Styles.Button}
          activeOpacity={0.8}
          onPress={HandleLogin}
          >
          <Text style={Styles.ButtonText}>로그인</Text>
        </TouchableOpacity>
      </View>

      <View style = {Styles.MiniButtonContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Terms", { screen: 'Terms' })}>
          <Text style = {Styles.MiniText}> 회원가입 </Text>
        </TouchableOpacity>
        <Sector style={{marginLeft:BasicWidth*5, marginRight:BasicWidth*5}}/>

        <TouchableOpacity
          onPress={() => navigation.navigate("FindEmail", { screen: 'FindEmail' })}>
          <Text style = {Styles.MiniText}> 이메일 찾기 </Text>
        </TouchableOpacity>
        <Sector style={{marginLeft:BasicWidth*5, marginRight:BasicWidth*5}}/>
        <TouchableOpacity
          onPress={() => navigation.navigate("FindPassword", { screen: 'FindPassword' })}>
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
      <Toast config={toastConfig} />
      </ScrollView>
    </SafeAreaView>
  );
}

const AllWidth = Dimensions.get("window").width;
const AllHeight = Dimensions.get("window").height;

const FigmaWidth = 390;
const FigmaHeight = 844;

const BasicWidth =(
    AllWidth / FigmaWidth
).toFixed(2);

const BasicHeight =(
    AllHeight / FigmaHeight
).toFixed(2);


const Styles = StyleSheet.create({
    Container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
    },

    BackContainer: {
      width : AllWidth,
      height : AllHeight,
      paddingTop: BasicHeight*13,
      backgroundColor: '#FFFFFF',
    },
    IconContainer:{
      alignItems: 'flex-end',
      marginTop: BasicHeight*13,
      paddingRight : BasicWidth*25,
    },

    HomeContainer :{
      width: BasicWidth*83,
      height: BasicHeight*45,
      marginTop : BasicHeight*26,
      marginLeft: BasicWidth*20,
      marginBottom: BasicHeight*55,
    },

    HomeText : {
      height: BasicHeight*45,
      fontSize: 30,
      includeFontPadding: false,
      fontFamily: 'NotoSansKR-Bold',
      color: '#000000',
    },

    InputArea1 : {
      width: BasicWidth*325,
      height: BasicHeight*114,
      marginRight: BasicWidth*32,
      marginLeft : BasicWidth*32,
      marginBottom : BasicHeight*10,
    },

    InputArea2 : {
      width: BasicWidth*325,
      height: BasicHeight*114,
      marginLeft : BasicWidth*32,
      marginBottom : BasicHeight*5,
    },

    Lables : {
      fontSize : 20,
      marginBottom : BasicHeight*5,
      includeFontPadding: false,
      fontFamily: 'NotoSansKR-Regular',
      color: '#000000',
    },

    TextForm : {
      width: BasicWidth*325,
      height: BasicHeight*50,
      paddingLeft : BasicWidth*10,
      fontSize : 20,
      borderColor : "#E2E2E2",
      borderWidth : 1,
      includeFontPadding: false,
      fontFamily: 'NotoSansKR-Regular',
    },
    Text : {
        height: BasicHeight*30,
        marginLeft: BasicWidth*10,
        paddingTop: BasicHeight*5,
        color: '#E82323',
        fontSize: 13,
        includeFontPadding: false,
        fontFamily: 'NotoSansKR-Light',
      },

    CheckboxesContainer : {
      flexDirection: 'row',
      height: BasicHeight*26,
      marginBottom : BasicHeight*30,
      justifyContent: 'center',
      alignItems: 'center',
    },

    CheckboxContainer1 : {
      flexDirection: 'row',
      alignContent: 'center',
      justifyContent: 'center',

    },

    CheckboxContainer2 : {
      flexDirection: 'row',
      alignSelf: 'center',
      alignContent: 'center',
      marginLeft : BasicWidth*33,
    },
    CheckboxText : {
      height: BasicHeight*26,
      marginLeft : BasicWidth*10,
      fontSize: 18,
      includeFontPadding: false,
      fontFamily: 'NotoSansKR-Regular',
      color: '#000000',
    },

    MiniButtonContainer : {
      height: BasicHeight*23,
      marginTop: BasicHeight*25,
      marginBottom: BasicHeight*30,
      flexDirection: 'row',
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
    },

    MiniText : {
      includeFontPadding: false,
      fontSize: 16,
      fontFamily: 'NotoSansKR-Regular',
      color: '#000000',
    },

    ButtonArea : {
      marginLeft : BasicWidth*32,
    },

    FastButtonArea : {
      width: BasicWidth*325,
      height: BasicHeight*104,
      marginLeft : BasicWidth*32,
    },

    Button : {
      width: BasicWidth*325,
      height: BasicHeight*65,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor : '#3873EA',
      backgroundColor : '#3873EA',
      
    },
    ButtonText :{
          alignSelf : 'center',
          fontSize : 20,
          color : '#FFFFFF',
          includeFontPadding: false,
          fontFamily: 'NotoSansKR-Bold',
          
        },

    FastButton : {
      width: BasicWidth*325,
      height: BasicHeight*65,
      marginTop: BasicHeight*10,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor : '#F9E000',
      backgroundColor : '#F9E000',
      
    },

    FastButtonText :{
      alignSelf : 'center',
      fontSize : 20,
      includeFontPadding: false,
      fontFamily: 'NotoSansKR-Bold',
      color: '#000000',
    },
    
    FastLables : {
      fontSize : 20,
      textAlign : 'center',
      includeFontPadding: false,
      fontFamily: 'NotoSansKR-Regular',
      color: '#000000',
    },

    Scroll:{
      flex: 1,
    },
  });
export default Login;