import React from "react";
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
} from 'react-native';
import CheckBox from 'expo-checkbox';
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from 'react-native-vector-icons/MaterialIcons';


const Login = () => {
  const navigation = useNavigation();

  const onLogin = (data) =>{
    console.log(data);
    navigation.navigate("Login", {screen : 'Login'});
  };
  const [Form, setForm] = useState({
    email: '',
    password: '',
  });
  const [UserEmail, setUserEmail] = useState("");
  const [UserPassword, setUserPassword] = useState("");

  const [loginSelected, setloginSelection] = useState(false); 
  const [idSelected, setidSelection] = useState(false);
  const [ValidEmail, setValidEmail] = useState(false);
  const [ValidPassword, setValidPassword] = useState(false);
  const [ValidUser, setValidUser] = useState(false);

  const EmailInputRef = createRef();
  const PasswordInputRef = createRef();

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
    let passwordRegex = /^[A-Za-z0-9]{8,16}$/;

    setUserPassword(text)
    if(passwordRegex.test(text) == false){
      setValidPassword(true);
    }
    else{
      setValidPassword(false);
    }
  }

  const HandleUser = (text) =>{
    setUserPassword(text)
    if(passwordRegex.test(text) == false){
      setValidPassword(true);
    }
    else{
      setValidPassword(false);
    }
  }

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
        <TextInput
          style={Styles.TextForm}
          placeholder = "이메일을 입력해주세요."
          onChangeText = {(text) => HandleEmailChk(text)}
          value = {UserEmail}
          inputMode = 'email'
          returnKeyType= 'next'
          ref = {EmailInputRef}
          onSubmitEditing={() =>
            PasswordInputRef.current && PasswordInputRef.current.focus()
          }
        />
        {
          ValidEmail ? (<Text style= {Styles.Text}>이메일을 입력해주세요</Text>) : (<Text style= {Styles.Text}> </Text>)
        }
      </View>


      <View style={Styles.InputArea2}>
        <Text style={Styles.Lables}>비밀번호*</Text>
        <TextInput
          style={Styles.TextForm}
          placeholder = "비밀번호를 입력해주세요."
          onChangeText = {(text) => HandlePwChk(text)}
          returnKeyType= 'done'
          ref = {PasswordInputRef}
        />
        {
          ValidPassword ? (<Text style= {Styles.Text}>비밀번호를 입력해 주세요</Text>) : (<Text style= {Styles.Text}> </Text>)
        }
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
          >
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
      backgroundColor: '#FFFFFF'
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
      marginBottom : BasicHeight*5
    },

    TextForm : {
      width: BasicWidth*325,
      height: BasicHeight*50,
      fontSize : 20,
      borderColor : "#E2E2E2",
      borderWidth : 1,
      paddingHorizontal : 10,
    },
    Text : {
        width: BasicWidth*141,
        height: BasicHeight*30,
        marginLeft: BasicWidth*10,
        color: '#E82323',
        fontSize: 13,
        //alignSelf: 'stretch',
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

    CheckboxContainer : {
      flexDirection: 'row',
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      
    },

    Checkbox : {
    },

    CheckboxText : {
      width: BasicWidth*87,
      height: BasicHeight*26,
      fontSize: 18,
      alignContent: 'center',
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
          fontWeight : '700',
          fontSize : 20,
          color : '#FFFFFF',
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
      fontWeight : '700',
      fontSize : 20,
      color : '#332024',
    },
    
    FastLables : {
      
      fontSize : 20,
      marginTop : 25,
      marginBottom : 5,
      textAlign : 'center',
    },

    Scroll:{
      flex: 1,
    },
  });
export default Login;