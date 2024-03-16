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
    Dimensions,
    Image,
    ScrollView,
    BackHandler,
    Alert,
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from "axios";


const Signup = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const backAction = () => {
      Alert.alert('잠시만요!', '입력내용이 저장되지 않습니다.\n이전 단계로 돌아갈까요?', [
        {
          text: '아니오',
          onPress: () => null,
          style: 'cancel',
        },
        {text: '네', onPress: () => navigation.navigate("Login", { screen: 'Login' })},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
  
  const [UserEmail, setUserEmail] = useState();
  const [UserPassword, setUserPassword] = useState();
  const [UserPnum, setUserPnum] = useState();
  const [UserchkPnum, setUserchkPnum] = useState();
  const [UserNick, setUserNick] = useState();

  //const onSubmit = (data) => console.log(data)

  const [loading, setLoading] = useState(false);

  const [errortext, setErrortext] = useState('');
  const [errortext2, setErrortext2] = useState('');
  const [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);
  const [ValidEmail, setValidEmail] = useState(false);
  const [ValidPassword, setValidPassword] = useState(false);
  const [ValidNick, setValidNick] = useState(false);
  //const [errortext, setErrortext] = useState('');
  //const [Time, setTime] = useState(179)
  //const {verification} = useSelector((state: RootState) => state.auth)
  //const {expireAt} = verification.OTP

  const EmailInputRef = createRef();
  const PasswordInputRef = createRef();
  const PhonenumberInputRef = createRef();
  const PhonenumberchkInputRef = createRef();
  const NicknameInputRef = createRef();

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

  const HandleNickChk = (text) =>{
    let nicknameRegex = /^[가-힣A-Za-z0-9]{2,15}$/;

    setUserPassword(text)
    if(nicknameRegex.test(text) == false){
      setValidNick(true);
    }
    else{
      setValidNick(false);
    }
  }
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
          <TextInput
          style={Styles.TextForm}
          placeholder = "이메일을 입력해주세요."
          onChangeText = {(text) => HandleEmailChk(text)}
          inputMode = 'email'
          returnKeyType= 'next'
          ref = {EmailInputRef}
          onSubmitEditing={() =>
            PasswordInputRef.current && PasswordInputRef.current.focus()
          }
        />
        {
          ValidEmail ? (<Text style= {Styles.Text}>올바른 이메일을 입력해주세요</Text>) : (<Text style= {Styles.Text}> </Text>)
        }
      </View>

      <View style={Styles.InputArea}>
        <Text style={Styles.Lables}>비밀번호</Text>
        <TextInput
          style={Styles.TextForm}
          placeholder = "비밀번호을 입력해주세요."
          onChangeText = {(text) => HandlePwChk(text)}
          returnKeyType= 'next'
          ref = {PasswordInputRef}
          onSubmitEditing={() =>
            PhonenumberInputRef.current && PhonenumberInputRef.current.focus()
          }
        />
        {
          ValidPassword ? (<Text style= {Styles.Text}>8~16자리 영문+숫자+특수문자 조합하여 입력해주세요.</Text>) : (<Text style= {Styles.Text}> </Text>)
        }
      </View>

      <View style={Styles.PnumInputArea}>
        <Text style={Styles.Lables}>전화번호</Text>
        <View style = {Styles.MiniArea}>
        <TextInput
          style={Styles.PnumForm}
          placeholder = "숫자만 입력"
          onChangeText = {UserEmail => setUserEmail(UserEmail)}
          inputMode = 'tel'
          returnKeyType= 'next'
          ref = {PhonenumberInputRef}
          onSubmitEditing={() =>
            PhonenumberchkInputRef.current && PhonenumberchkInputRef.current.focus()
          }
        />
        <TouchableOpacity
          style={Styles.MiniButton}
          activeOpacity={0.8}
          >
          <Text style={Styles.MiniButtonText}>전송</Text>
        </TouchableOpacity>
        </View>
        <TextInput
        style={Styles.TextForm} 
        textColor= {"#AFAFAF"}
        placeholder="인증번호 입력"
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
        <TextInput
          style={Styles.NickForm}
          placeholder = "2~15자리"
          onChangeText = {(text) => HandleNickChk(text)}
          returnKeyType= 'done'
          ref = {NicknameInputRef}
        />
        <TouchableOpacity
          style={Styles.NickButton}
          activeOpacity={0.8}
          >
          <Text style={Styles.MiniButtonText}>중복 확인</Text>
        </TouchableOpacity>
        {
          ValidNick ? (<Text style= {Styles.Text}>2~15사이로 입력해주세요</Text>) : (<Text style= {Styles.Text}> </Text>)
        }
        </View>
      </View>

      <View style={Styles.ButtonArea}>
        <TouchableOpacity
          style={Styles.Button}
          activeOpacity={0.8}
          >
          <Text style={Styles.ButtonText}>완료</Text>
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
const FigmaHeight = 806;

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
    Scroll:{
      flex: 1,
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
      width: BasicWidth*111,
      height: BasicHeight*45,
      marginTop : BasicHeight*53,
      marginLeft: BasicWidth*20,
      marginBottom: BasicHeight*55,
    },

    HomeText : {
      width: BasicWidth*111,
      height: BasicHeight*45,
      fontSize: 30,
    },

    InputArea : {
      width: BasicWidth*325,
      height: BasicHeight*114,
      marginRight: BasicWidth*32,
      marginLeft : BasicWidth*32,
    },
    Lables : {
      fontSize : 20,
      marginBottom : BasicHeight*5
    },

    PnumInputArea : {
      width: BasicWidth*325,
      height: BasicHeight*144,
      marginRight: BasicWidth*33,
      marginLeft : BasicWidth*32,
      marginBottom : BasicHeight*30,
    },

    NickInputArea : {
      width: BasicWidth*325,
      height: BasicHeight*114,
      marginRight: BasicWidth*33,
      marginLeft : BasicWidth*32,
      marginBottom : BasicHeight*5,
    },

    TextForm : {
      width: BasicWidth*325,
      height: BasicHeight*50,
      fontSize : 20,
      borderColor : "#E2E2E2",
      borderWidth : 1,
      paddingHorizontal : 10,
    },

    PnumForm : {
      width: BasicWidth*225,
      height: BasicHeight*50,
      marginRight: BasicWidth*10,
      fontSize : 20,
      borderColor : "#E2E2E2",
      borderWidth : 1,
      paddingHorizontal : 10,
    },

    NickForm : {
      width: BasicWidth*193,
      height: BasicHeight*50,
      marginRight: BasicWidth*10,
      fontSize : 20,
      borderColor : "#E2E2E2",
      borderWidth : 1,
      paddingHorizontal : 10,
    },

    Text : {
      width: BasicWidth*325,
      height: BasicHeight*30,
      marginLeft: BasicWidth*10,
      color: '#E82323',
      fontSize: 13,
      //alignSelf: 'stretch',
    },

    ButtonArea : {

      paddingRight: 32,
      paddingLeft : 32,
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

    MiniButton : {
      width: BasicWidth*90,
      height: BasicHeight*50,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor : '#3873EA',
      backgroundColor : '#3873EA',
    },
    MiniButtonText :{
      alignSelf : 'center',
      fontWeight : '700',
      fontSize : 20,
      color : '#FFFFFF',
    },
    MiniArea:{
      width: BasicWidth*325,
      height: BasicHeight*50,
      marginBottom: BasicHeight*10,
      flexDirection: 'row',
    },

    NickButton : {
      width: BasicWidth*120,
      height: BasicHeight*50,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor : '#3873EA',
      backgroundColor : '#3873EA',
    },
    NickButtonText :{
      alignSelf : 'center',
      fontWeight : '700',
      fontSize : 20,
      color : '#FFFFFF',
    },
    NickArea:{
      width: BasicWidth*325,
      height: BasicHeight*50,
      flexDirection: 'row',
    },
  });
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