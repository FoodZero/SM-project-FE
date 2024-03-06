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
import Styles from './Signupstyles';
import axios from "axios";

//const EmailPattern = /^[0-9a-zA-Z]([-.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
//const PasswordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/
//const PnumPattern = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/
const Signup = () => {
  const navigation = useNavigation();

  const [UserEmail, setUserEmail] =useState('');
  const [UserPassword, setUserPassword] = useState('');
  const [UserPnum, setUserPnum] = useState('');
  const [chkPnum, setChkPnum] = useState('');
  const [UserNick, setUserNick] = useState('');
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

  const Error_MSG = {
    Noinput : '필수 입력사항을 입력해주세요.',
    EmailPttn : '올바른 이메일을 입력해주세요.',
    PwPttn : "8~16자리 영문+숫자+특수문자 조합하여 입력해주세요.",
    Idduplicate : "이미 사용 중인 닉네임입니다.",
  };

  const HandleSubmitButton = () =>{
    setErrortext('');

    if(!UserEmail){
      //대충 유효성 실패!(1박2일 브금)
    }
    if(!UserNick){
      //대충 유효성 실패!(1박2일 브금)
    }
    if(!UserPassword){
      //대충 유효성 실패!(1박2일 브금)
    }
    if(!UserPnum){
      //대충 유효성 실패!(1박2일 브금)
    }
    //if(UserPnum != chkPnum){}
  }

  var dataToSend = {
    email : UserEmail,
    password : UserPassword,
    nickname : UserNick,
    phone : UserPnum,
  };

  var formBody = [];
  for (var key in dataToSend) {
    var encodedKey = encodeURIComponent(key);
    var encodedValue = encodeURIComponent(dataToSend[key]);
    formBody.push(encodedKey + '=' + encodedValue);
  }
  formBody = formBody.join('&');

  fetch('https://172.30.1.99:3306/api/members/register', {
    method: 'POST',
    body: formBody,
    headers: {
      //Header Defination
      'Content-Type': 'application/json;charset=UTF-8',
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

  if (isRegistraionSuccess) {
    return (
      <View style={styles.container}>
        <View style={{flex: 1}} />
        <View style={{flex: 2}}>
          <View
            style={{
              height: hp(13),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            
          </View>
          <View
            style={{
              height: hp(7),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: 'black', fontSize: wp('4%')}}>
              회원가입이 완료되었습니다.
            </Text>
          </View>

          <View style={{height: hp(20), justifyContent: 'center'}}>
            <View style={styles.btnArea}>
              <TouchableOpacity
                style={styles.btn}
                activeOpacity={0.5}
                onPress={() => props.navigation.navigate('Login')}>
                <Text style={{color: 'white', fontSize: wp('4%')}}>
                  로그인하기
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
    return (
      <SafeAreaView style = {Styles.Container}>
      <View style = {Styles.HomeContainer}>
      <Text style={Styles.HomeText}> 회원가입 </Text>
      </View>
 
      <View style={Styles.InputArea}>
        <Text style={Styles.Lables}>이메일</Text>
        <TextInput 
        style={Styles.TextForm}
        textColor= {"#AFAFAF"}
        placeholder={"이메일을 입력해 주세요."}
        onChangeText={(UserEmail) => setUserEmail(UserEmail)}
        ref = {EmailInputRef}
        returnKeyType="next"
        onSubmitEditing={() =>
          PasswordInputRef.current && PasswordInputRef.current.focus()
        }
        blurOnSubmit = {false}
        inputMode="email"
        />
      </View>

      <View style={Styles.InputArea}>
        <Text style={Styles.Lables}>비밀번호</Text>
        <TextInput 
        style={Styles.TextForm}
        textColor= {"#AFAFAF"}
        placeholder={"8~16자리 영문 + 숫자 + 특수문자 조합"}
        onChangeText={(UserPassword) => setUserPassword(UserPassword)}
        ref = {PasswordInputRef}
        returnKeyType="next"
        onSubmitEditing={() =>
          PhonenumberInputRef.current && PhonenumberInputRef.current.focus()
        }
        blurOnSubmit = {false}
        inputMode="text"
        />
      </View>

      <View style={Styles.InputArea}>
        <Text style={Styles.Lables}>전화번호</Text>
        <TextInput 
        style={Styles.TextForm}
        textColor= {"#AFAFAF"}
        placeholder={"-없이 입력"}
        onChangeText={(UserPnum) => setUserPnum(UserPnum)}
        ref = {PhonenumberInputRef}
        returnKeyType="next"
        onSubmitEditing={() =>
          PhonenumberchkInputRef.current && PhonenumberchkInputRef.current.focus()
        }
        blurOnSubmit = {false}
        inputMode="tel"
        />
      </View>
      <View style={Styles.InputArea}>
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

      <View style={Styles.InputArea}>
        <Text style={Styles.Lables}>닉네임</Text>
        <TextInput 
        style={Styles.TextForm}
        textColor= {"#AFAFAF"}
        onChangeText={(UserNick) => setUserNick(UserNick)}
        ref = {NicknameInputRef}
        returnKeyType="done"
        inputMode="text"
        blurOnSubmit = {true}
        />
      </View>

      <View style={Styles.ButtonArea}>
        <TouchableOpacity
          style={Styles.Button}
          activeOpacity={0.8}
          onPress ={()=> navigation.navigate("Login", {screen : 'Login'})}>
          <Text style={Styles.ButtonText}>완료</Text>
        </TouchableOpacity>
      </View>
      </SafeAreaView>
    );
};
export default Signup;
/*
useEffect(() => {
  const [userEmail, setUseremail] = useState("");
  const [userName, setUsername] = useState("");
  const [userPassword, setUserpassword] = useState("");
  const [userPnum, setUserpnum] = useState("");

  const [errortext, setErrortext] = useState('');
  const [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);

  const idInputRef = createRef();
  const gradeInputRef = createRef(); 
  const passwordInputRef = createRef();
  const passwordchkInputRef = createRef();
  const nameInputRef = createRef();
  const [isSelected, setSelection] = useState(false);

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

  const SubmitButton = () => {
      setErrortext('');

      if(!userEmail){
          alert('이메일을 입력해주세요');
          return;
      }
      if(!userPassword){
          alert('비밀번호를 입력해주세요');
          return;
      }
      if(!userName){
          alert('이름을 입력해주세요');
          return;
      }
      if(!userBirth){
          alert('생년월일을 입력해주세요');
          return;
      }
      if(!userPnum){
          alert('전화번호를 입력해주세요');
          return;
      }

      var dataToSend = {
          db_Email : userEmail,
          db_Password : userPassword,
          db_Name : userName,
          db_Birth : userBirth,
          db_Pnum : userPnum,
      };

      var formBody = [];
      for (var key in dataToSend){
          var encodedKey = encodeURIComponent(key);
          var encodedValue = encodeURIComponent(dataToSend(key));
          formBody.push(encodedKey + '=' + encodedValue)
      }
      formBody =  formBody.join('&');

//서버 연결하기 >> async로 전환 중

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
/*
  const SignupPressed = useCallback(async () =>{
    if(loading){
      return;
    }
    try{
      setLoading(true);
      const response = await axios.post('${Config.API_URL}/api/members/register',{
        Email,
        Password,

      })
    }
  })
  */
/*
  axios.post({
    url : 'https://localhost:3006/api/members/register',
    method : 'post',
    headers : {
      "Content-type" : "application/json"
    },
    data: {
      email : eail ?? '',
      password :,
      nickname :,
      phone : ,
    }
  })
  .then((res) =>{
    if(validation){
      window.localStorage.setItem('signupResponseData', JSON.stringify(res.data));
      TabRouter.push('')
    }
  })
  */
