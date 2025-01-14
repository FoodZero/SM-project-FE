import React, { useCallback, useEffect, useRef } from "react";
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
    SafeAreaView,
    Modal,
} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import Back from '../../assets/Icons/back.svg';
import axios from "axios";
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

const Register = () => {
  const navigation = useNavigation();

  // 뒤로가기 액션함수 >>>modal창으로 수정필요<<<
  const backAction = () => {
    setModalVisible(true);
};
const backYes = () =>{
  setModalVisible(false);
  navigation.navigate("Login");
};

//안드로이드 기기 자체 뒤로가기 눌렀을 때 작동하는 함수
  useEffect(() => {
    const getData = () => {
        // 'tasks'항목에 저장된 자료 
        const info = AsyncStorage.getItem('terms');
        const msg = AsyncStorage.getItem('alert');
        if(info && msg != null){
          setisinfo(true);
          setismessage(true);
        }
    };

    //FCM토큰값 가져오기
    const getFcmToken = async() => {
      const fcmToken = await messaging().getToken();
      console.log(fcmToken);
      setUserFCMtoken(fcmToken);
    };
  
    
     //뒤로가기 버튼 이벤트
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    getData();
    getFcmToken();
    console.log(ismessage);
    console.log(isinfo);
    return () => backHandler.remove();
  }, [UserFCMtoken]);


  //백엔드로 보내줘야 하는 값 저장용 state
  const [UserEmail, setUserEmail] = useState();
  const [UserPassword, setUserPassword] = useState();
  const [UserPnum, setUserPnum] = useState();
  const [UserchkPnum, setUserchkPnum] = useState();
  const [UserNick, setUserNick] = useState();
  const [UserFCMtoken, setUserFCMtoken] = useState();

  //유효성 검사와 같은 boolean으로 표기해야 하는 함수들
  const [loading, setLoading] = useState(false);
  const [ismessage, setismessage] = useState(true);
  const [isinfo, setisinfo] = useState(true);
  const [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);
  const [ValidEmail, setValidEmail] = useState(false);
  const [ValidPassword, setValidPassword] = useState(false);
  const [ValidNick, setValidNick] = useState(false);
  const [isNickPre, setIsNickPre] = useState(false);
  const [isFirstButton, setIsFirstButton] = useState(false);
  const [timerActive, setTimerActive] = useState(false);
  const [timer, setTimer] = useState(180);
  const [isResend, setIsResend] = useState(false);
  const [ModalVisible, setModalVisible] = useState(false);

  //이어서 쓰기 편하기 위해 Ref만들어 준 함수들
  const EmailInputRef = createRef();
  const PasswordInputRef = createRef();
  const PhonenumberInputRef = createRef();
  const PhonenumberchkInputRef = createRef();
  const NicknameInputRef = createRef();
  const intervalIdRef = useRef(null);

  //이메일 유효성 검사
  const HandleEmailChk = (text) =>{
    let emailRegex = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,}$/i;
    setUserEmail(text)
    //이메일 유효성 오류
    if(emailRegex.test(text) == false){
      setValidEmail(true);
    }
    //이메일 유효성 통과
    else{
      setValidEmail(false);
    }
  }

  //비밀번호 유효성 검사
  const HandlePwChk = (text) =>{
    let passwordRegex = /^[A-Za-z0-9#?!@$%^&*-](?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-])[a-z0-9#?!@$%^&*-]{8,16}$/;
    setUserPassword(text)
    //비밀번호 유효성 오류
    if(passwordRegex.test(text) == false){
      setValidPassword(true);
    }
    //비밀번호 유효성 통과
    else{
      setValidPassword(false);
    }
  }
  //닉네임 유효성 검사
  const HandleNickChk = (text) =>{
    setIsFirstButton(false);
    let nicknameRegex = /^[가-힣A-Za-z0-9]{2,15}$/;
    //선점 검사 아직안했으므로 선점함수 >> false
    setIsNickPre(false);
    setUserNick(text)
    //유효성 검사 실패시
    if(nicknameRegex.test(text) == false){
      setValidNick(true);
    }
    //유효성 검사 성공시
    else{
      setValidNick(false);
    }
    }

    //전화번호 입력 후 전송 누를 시 타이머 작동용 함수
  const handlephonecert = () => {
    console.log(`전화번호: ${UserPnum}`);
    setTimerActive(true);
    startTimer();
  };

  //타이머 초기화 함수
  const timerReset = () => {
    setTimer(180);
  };
  // 타이머 세팅 (다시 눌렀을 때 시간이 2배로 빨리가고, reset안되는 문제 해결해야함!!!!!!!)
  const startTimer = () => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
    }
    
    setTimer(180);  // Reset the timer
  
    intervalIdRef.current = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer > 0) {
          return prevTimer - 1;
        } else {
          clearInterval(intervalIdRef.current);
          setTimerActive(false);
          setTimer(180);  // Reset the timer when it reaches 0
          return 180;
        }
      });
    }, 1000);
  
    setTimerActive(true);  // Enable timer
    setIsResend(true);  // Enable resend functionality
  };
  

  //닉네임 중복검사(버튼 클릭시 작동)
  const NickFind = useCallback(async () => {
    console.log(ismessage);
    console.log(isinfo);
    if(loading){
      return;
    }
    try{
      setLoading(true);
      const response = await axios.post('http://www.sm-project-refrigerator.store/api/members/nickname',{
        nickname: UserNick,
      })
      //에러날 시, 선점함수 = true, 버튼눌림함수 = true
    }catch(error){
      console.log(error);
      setIsNickPre(true);
      setIsFirstButton(true);
    }finally{
      setLoading(false);
      setIsFirstButton(true);
    }
  }, [loading,UserNick]);

  //회원가입 data
  const data = {
    email: UserEmail,
    password: UserPassword,
    nickname: UserNick,
    phone:UserPnum,
    infoAgree: isinfo,
    messageAgree: ismessage,
    fcmToken: UserFCMtoken,
    certificationCode:UserchkPnum,
  };

  //회원가입 전체 전달 api연결 (!!!분기 부분 추가 요망!!!)
  const HandleRegister = useCallback(async () => {
    if(loading){
      return;
    }
    try{
      setLoading(true);
      console.log(data);
      const response = await axios.post('http://www.sm-project-refrigerator.store/api/members/register',data)
      console.log(response);
      if(response.status === 200){
        navigation.navigate("Login");
      }
    }catch(error){
      console.log(error);
      showToast();

    }finally{
      setLoading(false);
      //navigation.navigate("Home");
    }
  }, [loading,UserEmail,UserPassword]);


  //본인인증 문자 검사
  const ValidPnum = useCallback(async () => {
    setTimerActive(true);
    startTimer();
    
    if(loading){
      return;
    }
    try{
      setLoading(true);
      const response = await axios.post('http://www.sm-project-refrigerator.store/api/members/send',{
        phone: UserPnum
      })
    }catch(error){
      console.log(error);
      console.log(data);
     
    }finally{
      setLoading(false);
    }
  }, [loading,UserPnum]);

  //토스트 메세지 함수
  const showToast = () => {
    Toast.show({
      type: 'errortoast',
      position: 'top',

      visibilityTime: 2000,
    });
  }

  //토스트 메세지 커스텀 함수
  const toastConfig = {
    'errortoast': ({errtext}) => (
      <View 
        style={{
          backgroundColor: '#31313173',
          flexDirection: 'row',
          alignItems: 'center',
          alignContent: 'center',
          height: BasicWidth* 39,
          width: BasicHeight* 190,
          paddingLeft: BasicWidth*19,
          borderRadius: 10, 
        }}>
        <Text
          style={{
            color: '#FFFFFF',
            includeFontPadding: false,
            fontFamily: 'NotoSansKR-Regular',
            fontSize:14,
          }}
        >
          회원가입에 실패했습니다.
        </Text>
      </View>
    ),
  };

    return (
      <SafeAreaView style={Styles.Container}>
        <ScrollView style = {Styles.Scroll}>
        <View style = {Styles.BackContainer}>
          <View style = {Styles.IconContainer}>
            <TouchableOpacity onPress={backAction}>
            <Back/>
            </TouchableOpacity>
            <Modal
        animationType="fade"
        transparent={true}
        visible={ModalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={Styles.centeredView}>
          <View style={Styles.modalView}>
            <Text style={Styles.modalHeader}>잠시만요!</Text>
            <Text style={Styles.modalText}>입력내용이 저장되지 않습니다.{'\n'}이전 단계로 돌아갈까요?</Text>
            <View style={Styles.ButtonContainer}>
              <TouchableOpacity style={Styles.NoButton} onPress={() => setModalVisible(false)}>
                <Text style={Styles.NoButtonText}>아니오</Text>
              </TouchableOpacity>
              <TouchableOpacity style={Styles.YesButton} onPress={backYes}>
                <Text style={Styles.YesButtonText}>네</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
          </View>
          <View style = {Styles.HomeContainer}>
            <Text style={Styles.HomeText}> 회원가입 </Text>
          </View>
 
      <View style={Styles.InputArea}>
        <Text style={Styles.Lables}>이메일*</Text>
          <TextInput
          style={Styles.TextForm}
          placeholder = "이메일을 입력해주세요."
          value={UserEmail}
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
        <Text style={Styles.Lables}>비밀번호*</Text>
        <TextInput
          style={Styles.TextForm}
          placeholder = "비밀번호을 입력해주세요."
          onChangeText = {(text) => HandlePwChk(text)}
          value={UserPassword}
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
        <Text style={Styles.Lables}>전화번호*</Text>
        <View style = {Styles.MiniArea}>
        <TextInput
          style={Styles.PnumForm}
          placeholder = "숫자만 입력"
          value={UserPnum}
          onChangeText = {(UserPnum) => setUserPnum(UserPnum)}
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
          onPress={ValidPnum}
          >
            {isResend ? <Text style={Styles.MiniButtonText}>재전송</Text> : <Text style={Styles.MiniButtonText}>전송</Text>}
        </TouchableOpacity>
        </View>
        <View style={Styles.AuthForm}>
          <TextInput
            style={Styles.AuthText}
            textColor= {"#AFAFAF"}
            placeholder="인증번호 입력"
            onChangeText={(chkPnum) => setUserchkPnum(chkPnum)}
            value={UserchkPnum}
            ref = {PhonenumberchkInputRef}
            returnKeyType="next"
            onSubmitEditing={() =>
              NicknameInputRef.current && NicknameInputRef.current.focus()
            }
            blurOnSubmit = {false}
            inputMode="numeric"
          />
          <Text style={Styles.PnumTime}>{Math.floor(timer / 60)}:{String(timer % 60).padStart(2, '0')}</Text>
        
        </View>
        </View>

      <View style={Styles.NickInputArea}>
        <Text style={Styles.Lables}>닉네임*</Text>
        <View style={Styles.NickArea}>
        <TextInput
          style={Styles.NickForm}
          placeholder = "2~15자리"
          value={UserNick}
          onChangeText = {(text) => HandleNickChk(text)}
          returnKeyType= 'done'
          ref = {NicknameInputRef}
        />
        <TouchableOpacity
          style={Styles.NickButton}
          activeOpacity={0.8}
          disabled = {ValidNick}
          onPress={NickFind}
          >
          <Text style={Styles.MiniButtonText}>중복 확인</Text>
        </TouchableOpacity>
        </View>
        {
          ValidNick ? <Text style= {Styles.Text}> </Text> : ( 
            isFirstButton ? (
              isNickPre ? <Text style= {Styles.Text}>이미 사용 중인 닉네임입니다.</Text> : <Text style= {Styles.ValidText}>사용가능한 닉네임입니다.</Text>
            ) : <Text style= {Styles.Text}> </Text>
          )
        }
      </View>

      <View style={Styles.ButtonArea}>
        <TouchableOpacity
          style={Styles.Button}
          activeOpacity={0.8}
          onPress={HandleRegister}
          >
          <Text style={Styles.ButtonText}>완료</Text>
        </TouchableOpacity>
      </View>
      </View>
      </ScrollView>
      <Toast config={toastConfig} />
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
      width: BasicWidth*150,
      height: BasicHeight*50,
      fontSize: 30,
      includeFontPadding: false,
      fontFamily: 'NotoSansKR-Bold',
      color: '#000000',
    },

    InputArea : {
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
      includeFontPadding: false,
      fontFamily: 'NotoSansKR-Regular',
    },

    AuthForm : {
      width: BasicWidth*325,
      height: BasicHeight*50,
      borderColor : "#E2E2E2",
      borderWidth : 1,
      paddingHorizontal : 10,
      flexDirection: "row",
      alignItems: "center",
    },

    AuthText:{
      width: BasicWidth*115,
      height: BasicHeight*50,
      fontSize : 20,
      includeFontPadding: false,
      fontFamily: 'NotoSansKR-Regular',
      color: '#000000',
    },

    PnumTime:{
      width: BasicWidth*39,
      height: BasicHeight*29,
      fontSize : 20,
      color: "#AFAFAF",
      marginLeft: BasicWidth*160,
      includeFontPadding: false,
      fontFamily: 'NotoSansKR-Regular',
    },

    PnumForm : {
      width: BasicWidth*225,
      height: BasicHeight*50,
      marginRight: BasicWidth*10,
      fontSize : 20,
      borderColor : "#E2E2E2",
      borderWidth : 1,
      paddingHorizontal : 10,
      includeFontPadding: false,
      fontFamily: 'NotoSansKR-Regular',
      color: '#000000',
    },

    NickForm : {
      width: BasicWidth*193,
      height: BasicHeight*50,
      marginRight: BasicWidth*10,
      fontSize : 20,
      borderColor : "#E2E2E2",
      borderWidth : 1,
      paddingHorizontal : 10,
      includeFontPadding: false,
      fontFamily: 'NotoSansKR-Regular',
      color: '#000000',
    },

    Text : {
      width: BasicWidth*325,
      height: BasicHeight*30,
      marginLeft: BasicWidth*10,
      color: '#E82323',
      fontSize: 13,
      includeFontPadding: false,
      fontFamily: 'NotoSansKR-Regular',
    },

    ValidText : {
      width: BasicWidth*325,
      height: BasicHeight*30,
      marginLeft: BasicWidth*10,
      color: '#3873EA',
      fontSize: 13,
      includeFontPadding: false,
      fontFamily: 'NotoSansKR-Regular',
    },

    ButtonArea : {

      paddingRight: 32,
      paddingLeft : 32,
    },

    Button : {
      width: BasicWidth*325,
      height: BasicHeight*65,
      marginBottom: BasicHeight*38,
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
      fontSize : 20,
      color : '#FFFFFF',
      includeFontPadding: false,
      fontFamily: 'NotoSansKR-Regular',
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
      includeFontPadding: false,
      fontFamily: 'NotoSansKR-Regular',
    },
    NickArea:{
      width: BasicWidth*325,
      height: BasicHeight*50,
      flexDirection: 'row',
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    modalView: {
      width: BasicWidth*325,
      height: BasicHeight*212,
      backgroundColor: 'white',
      borderRadius: 10,
      paddingLeft: BasicWidth*27,
      paddingTop: BasicHeight*19,
    },
    modalHeader: {
      fontSize: 25,
      color: '#000000',
      includeFontPadding: false,
      fontFamily: 'NotoSansKR-SemiBold',
      marginBottom: BasicHeight*5,
    },
    modalText: {
      fontSize: 18,
      color: '#808080',
      includeFontPadding: false,
      fontFamily: 'NotoSansKR-Regular',
      marginBottom: BasicHeight*15,
    },
    ButtonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '60%',
    },
    NoButtonText: {
      color: '#000000',
      fontSize: 16,
      includeFontPadding: false,
      fontFamily: 'NotoSansKR-Regular',
    },
    YesButtonText: {
      color: 'white',
      fontSize: 16,
      includeFontPadding: false,
      fontFamily: 'NotoSansKR-Regular',
    },
    NoButton: {
      width: BasicWidth*130,
      height: BasicHeight*49,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 20,
      backgroundColor: '#E2E2E280',
    },
    YesButton: {
      width: BasicWidth*130,
      height: BasicHeight*49,
      marginLeft: BasicWidth*15,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 20,
      backgroundColor: '#3873EA',
    }, 
  });
export default Register;

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