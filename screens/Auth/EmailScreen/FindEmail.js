import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  Dimensions,
  Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import X from '../../../assets/Icons/X.svg';


const FindEmail = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [certificationNumber, setcertificationNumber] = useState('');
  const navigation = useNavigation();
  const [timer, setTimer] = useState(180); // Initial timer value in seconds
  const [timerActive, setTimerActive] = useState(false);
  const [isResend, setIsResend] = useState(false);
  const [error, setError] = useState(false);
  const [ModalVisible, setModalVisible] = useState(false);
  

  const intervalIdRef = useRef(null);

  const backAction = () => {
    setModalVisible(true);
};
const backYes = () =>{
  setModalVisible(false);
  navigation.navigate("Login");
};

  const handleFindEmail = () => {
    // Add logic to find email using the entered phone number
    console.log(`Finding email for phone number: ${phoneNumber}`);
    certificationrequest();
    setTimerActive(true);
    startTimer();
  };

  const timerReset = () => {
    setTimer(180);
  };

  // 타이머 세팅 (다시 눌렀을 때 시간이 2배로 빨리가고, reset안되는 문제 해결해야함!!!!!!!)
  const startTimer = () => {
    // Set up a timer that updates every second
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
    }
    timerReset();
  
    // Set up a new interval
    intervalIdRef.current = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer > 0) {
          return prevTimer - 1;  // Decrement the timer by 1 second
        } else {
          clearInterval(intervalIdRef.current);  // Stop the timer when it reaches 0
          setTimerActive(false);  // Disable the timer
          timerReset;  // Reset the timer
        }
      });
    }, 1000);

    setTimerActive(true);  // Set timer as active
    setIsResend(true);  // Update the button to show "재전송" after first send

  };
  
  const handlecertificationNumber = () => {
   
    console.log(`certification Number is: ${certificationNumber}`);
    certificationsend();
   
  };
  
  const handleRetrievePassword = () => {
    // Add logic to retrieve password
    console.log('Retrieving password...');
    navigation.navigate('FindPassword');
  };

 var REQ_PARAM1 ={"phone" : phoneNumber }
  const certificationrequest = async () => {

    axios ({
      method: 'POST',
      url:'http://www.sm-project-refrigerator.store/api/members/send',
      headers:{"Content-Type" : "application/json; charset=utf-8"},
      data:JSON.stringify(REQ_PARAM1),
    }).then(function(response){
      console.log(response);
  }) .catch (function (error) {
  console.log('error', error);
  });

};
//이메일 찾기 인증코드 보내는 api
var REQ_PARAM2 = {
  "phone": phoneNumber,
  "certificationCode":certificationNumber
};

  const certificationsend = async () => {
    var AccessToken = "none";
    axios({
      method: 'POST',
      url: 'http://www.sm-project-refrigerator.store/api/members/email',
      headers: { "Content-Type": "application/json; charset=utf-8" },
      data: JSON.stringify(REQ_PARAM2),
    }).then(function (response) {
      if (response.data.isSuccess) {
        const Email = response.data.result.email;
        navigation.navigate('EmailNotice', { Email }); // 이메일 주소를 함께 전달
      }
    }).catch(function (error) {
      console.log('error', error);
      setError(true);
    });
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
      
      <TouchableOpacity style={styles.closeButton} onPress={backAction}>
        <X/>
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent={true}
        visible={ModalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalHeader}>잠시만요!</Text>
            <Text style={styles.modalText}>입력내용이 저장되지 않습니다.{'\n'}이전 단계로 돌아갈까요?</Text>
            <View style={styles.ButtonContainer}>
              <TouchableOpacity style={styles.NoButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.NoButtonText}>아니오</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.YesButton} onPress={backYes}>
                <Text style={styles.YesButtonText}>네</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <View style={styles.Body}>
        <Text style={styles.headerText}>이메일 찾기</Text>

        <View style={styles.PnumInputArea}>
          <Text style={styles.label}>휴대폰 번호*</Text>
          <View style = {styles.MiniArea}>
          <TextInput
            style={styles.PnumForm}
            placeholder = "숫자만 입력"
            keyboardType="numeric"
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}
          />
          <TouchableOpacity
            style={styles.MiniButton}
            activeOpacity={0.8}
            onPress={handleFindEmail}
            >
            {isResend ? <Text style={styles.MiniButtonText}>재전송</Text> : <Text style={styles.MiniButtonText}>전송</Text>}
          </TouchableOpacity>
          </View>
          <View style={styles.AuthForm}>
            <TextInput
              style={styles.AuthText}
              textColor= {"#AFAFAF"}
              placeholder="인증번호 입력"
              keyboardType="numeric"
              value={certificationNumber}
              onChangeText={(text) => setcertificationNumber(text)}
            />
            <Text style={styles.PnumTime}>{Math.floor(timer / 60)}:{String(timer % 60).padStart(2, '0')}</Text>
          </View>
          {
            error ? <Text style={styles.ValidText}>잘못된 인증번호입니다. 인증번호를 다시 입력해주세요.</Text> : null
          }
        </View>
      
      
        <TouchableOpacity style={styles.findButton} onPress={handlecertificationNumber}>
          <Text style={styles.buttonText}>이메일 찾기</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.retrieveButton} onPress={handleRetrievePassword}>
        <Text style={styles.retrieveButtonText}>비밀번호 찾기</Text>
      </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};
const AllWidth = Dimensions.get("window").width;
const AllHeight = Dimensions.get("window").height;

const FigmaWidth = 390;
const FigmaHeight = 844;

const BasicWidth = (AllWidth / FigmaWidth).toFixed(2);
const BasicHeight = (AllHeight / FigmaHeight).toFixed(2);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerText: {
    fontSize: 30,
    includeFontPadding: false,
    fontFamily: 'NotoSansKR-Bold',
    marginTop: BasicHeight*25,
    marginBottom: BasicHeight*55,
    color: '#000000',
  },
  closeButton: {
    marginTop: BasicHeight * 13,
    marginLeft: BasicWidth * 350,
  },
  Body: {
    marginLeft: BasicWidth*20,
  },
  label: {
    fontSize : 20,
    marginBottom : BasicHeight*5,
    includeFontPadding: false,
    fontFamily: 'NotoSansKR-Regular',
    color: '#000000',
  },
  PnumInputArea : {
    height: BasicHeight*174,
    marginBottom : BasicHeight*35,
    marginLeft: BasicWidth*13,
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
  ValidText : {
    height: BasicHeight*30,
    marginLeft: BasicWidth*10,
    marginTop: BasicHeight*5,
    color: '#E82323',
    fontSize: 13,
    includeFontPadding: false,
    fontFamily: 'NotoSansKR-Regular',
  },
  MiniArea:{
    width: BasicWidth*325,
    height: BasicHeight*50,
    marginBottom: BasicHeight*10,
    flexDirection: 'row',
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
  findButton: {
    backgroundColor: '#808080',
    borderRadius: 60,
    width: BasicWidth*325,
    height: BasicHeight*58,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: BasicWidth*13,
  },

  buttonText: {
    color: 'white',
    fontSize: 20,
    includeFontPadding: false,
    fontFamily: 'NotoSansKR-SemiBold',
  },
  retrieveButton: {
    alignItems: 'center',
    marginTop: BasicHeight*25,
  },
  retrieveButtonText: {
    textDecorationLine: 'underline',
    fontSize: 16,
    color: 'black',
    includeFontPadding: false,
    fontFamily: 'NotoSansKR-Regular',
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

export default FindEmail;