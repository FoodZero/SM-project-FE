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
  TouchableWithoutFeedback,
  PermissionsAndroid,
  AppState,
} from 'react-native';
import CheckBox from 'expo-checkbox';
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import PermissionModal from '../Splash/PermissionModal';
import EncryptedStorage from 'react-native-encrypted-storage';

const Login = () => {
  const navigation = useNavigation();
  
  useEffect(() => {
    console.log(`Open Modal`);
    setModalVisible(true);
  }, []);

  //Font 적용문제만 남음!!
  /*
  const [fontLoaded, setFontLoaded] = useState(false);
  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        'Notosans': require('../../assets/Fonts/NotoSansKR-Light.ttf'),
      });
      setFontLoaded(true);
      
    }
    loadFont();
  }, []);
  */
  
  const onLogin = (data) =>{
    console.log(data);
    navigation.navigate("Login");
  };

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
  
  // 이메일, 비밀번호 정규식
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

  /*
  const HandleUser = (text) =>{
    setUserPassword(text)
    if(passwordRegex.test(text) == false){
      setValidPassword(true);
    }
    else{
      setValidPassword(false);
    }
  }
*/

//로그인 위한 데이터
  const data = {
    email: UserEmail,
    password: UserPassword,
  };

  const HandleLogin = () =>{
    HandleServer();
    if(ValidUser == true){
    console.log('홈화면으로 이동합니다');
    const AccessToken = AsyncStorage.getItem("userAccessToken");
    navigation.navigate("FoodInput", { AccessToken: AccessToken });
    }
    else{
      console.log('로그인에 문제가 있습니다.');
    }
  };

  //로그인 위한 서버와 연결
  const HandleServer = useCallback(async () => {

    if(loading){
      return;
    }
    try{
      setLoading(true);
      const response = await axios.post('http://www.sm-project-refrigerator.store/api/members/login',data)
      console.log(response);
      await AsyncStorage.setItem('userAccessToken', response.data.result.accessToken);
    }catch(error){
      console.log(error);
      console.log(data);
      setValidUser(false);
    }finally{
      setLoading(false);
      setValidUser(true);
      const AccessToken = await AsyncStorage.getItem("userAccessToken");
      console.log(AccessToken);
    }
  }, [loading,UserEmail,UserPassword]);

  /*
  const handleModal = () => {
    // Add logic to find email using the entered phone number
    // This could involve making an API call to your server, for example.
    console.log(`Open Modal`);
    setModalVisible(true);
  };
  */

  return (
    //로그인
      <SafeAreaView style={Styles.Container}>
      <ScrollView style = {Styles.Scroll}>
      <PermissionModal isVisible={isModalVisible} onClose={() => setModalVisible(false)} />
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
        <TextInput
          style={Styles.TextForm}
          placeholder = "이메일을 입력해주세요."
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
          ValidEmail ? (<Text style= {Styles.Text}>이메일을 입력해주세요.</Text>) : (<Text style= {Styles.Text}> </Text>)
        }
      </View>


      <View style={Styles.InputArea2}>
        <Text style={Styles.Lables}>비밀번호*</Text>
        <TextInput
          style={Styles.TextForm}
          onChange={setUserPassword}
          value={UserPassword}
          placeholder = "8~16자리 영문+숫자+특수문자 조합"
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
          <CheckBox
              value={loginSelected}
              onValueChange={setloginSelection}
              style={Styles.Checkbox}
              color={loginSelected? '#CAF6FF': undefined}/>
          <Text style={Styles.CheckboxText}>자동 로그인</Text>
        </View>

        <View style = {Styles.CheckboxContainer2}>
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
        <Text> | </Text>

        <TouchableOpacity
          onPress={() => navigation.navigate("FindEmail", { screen: 'FindEmail' })}>
          <Text style = {Styles.MiniText}> 이메일 찾기 </Text>
        </TouchableOpacity>
        <Text> | </Text>
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
      backgroundColor: '#FFFFFF',
      width: BasicWidth*390,
      height: BasicHeight*20,
      alignItems: 'flex-end',
      paddingRight : BasicWidth*25,
    },

    HomeContainer :{
      width: BasicWidth*83,
      height: BasicHeight*45,
      marginTop : BasicHeight*54,
      marginLeft: BasicWidth*20,
      marginBottom: BasicHeight*55,
    },

    HomeText : {
      width: BasicWidth*83,
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
      marginBottom : BasicHeight*40,
    },

    InputArea2 : {
      width: BasicWidth*325,
      height: BasicHeight*114,
      marginRight: BasicWidth*32,
      marginLeft : BasicWidth*32,
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
      fontSize : 20,
      borderColor : "#E2E2E2",
      borderWidth : 1,
      paddingHorizontal : 10,
      includeFontPadding: false,
      fontFamily: 'NotoSansKR-Regular',
    },
    Text : {
        width: BasicWidth*141,
        height: BasicHeight*30,
        marginLeft: BasicWidth*10,
        color: '#E82323',
        fontSize: 13,
        includeFontPadding: false,
        fontFamily: 'NotoSansKR-Light',
      },

    CheckboxesContainer : {
      flexDirection: 'row',
      width: BasicWidth*267,
      height: BasicHeight*26,
      marginRight: BasicWidth*58,
      marginLeft : BasicWidth*65,
      marginBottom : BasicHeight*30,
      justifyContent: 'center',
    },

    CheckboxContainer1 : {
      flexDirection: 'row',
      alignSelf: 'center',
      alignContent: 'center',
      justifyContent: 'center',

    },

    CheckboxContainer2 : {
      flexDirection: 'row',
      alignSelf: 'center',
      alignContent: 'center',
      justifyContent: 'center',
      marginLeft : BasicWidth*33,
    },

    Checkbox : {
      alignSelf: 'center',
    },

    CheckboxText : {
      width: BasicWidth*87,
      height: BasicHeight*26,
      paddingLeft : BasicWidth*10,
      flexWrap: 'wrap',
      fontSize: 16,
      includeFontPadding: false,
      fontFamily: 'NotoSansKR-Regular',
      color: '#000000',
    },

    MiniButtonContainer : {
      width: BasicWidth*264,
      height: BasicHeight*23,
      marginRight: BasicWidth*65,
      marginLeft : BasicWidth*61,
      marginTop: BasicHeight*25,
      marginBottom: BasicHeight*25,
      flexDirection: 'row',
      justifyContent: 'center',
    },

    MiniText : {
      includeFontPadding: false,
      fontFamily: 'NotoSansKR-Regular',
      color: '#000000',
    },

    ButtonArea : {

      paddingRight: 32,
      paddingLeft : 32,
    },

    FastButtonArea : {
      width: BasicWidth*325,
      height: BasicHeight*104,
      marginRight: BasicWidth*32,
      marginLeft : BasicWidth*33,
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
      marginTop : 25,
      marginBottom : 5,
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