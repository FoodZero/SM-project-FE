import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Modal,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import X from '../../../assets/Icons/X.svg';
    

const FindPassword = () => {
  const [Email, setEmail] = useState('');
  const [certificationNumber, setcertificationNumber] = useState('');
  const navigation = useNavigation();
  const [timer, setTimer] = useState(180); // Initial timer value in seconds
  const [timerActive, setTimerActive] = useState(false);
  const [ModalVisible, setModalVisible] = useState(false);

  const [error, setError] = useState(false);
  const [isResend, setIsResend] = useState(false);

  const intervalIdRef = useRef(null);

  const backAction = () => {
    setModalVisible(true);
  };
  const backYes = () =>{
    setModalVisible(false);
    navigation.navigate("Login");
  };

  const handleFindPassword = () => {
    // Add logic to find email using the entered phone number
    // This could involve making an API call to your server, for example.
    console.log(`Finding password for email: ${Email}`);
    
    setTimerActive(true);
    startTimer();
    certificationrequest();
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
   
    console.log(`certification Number is:${certificationNumber}`);
    certificationsend();
   
  };
  
  const handleRetrieveEmail = () => {
    // Add logic to retrieve password
    console.log('Retrieving email...');
    navigation.navigate('FindEmail');
  };

  const handleClose = () => {
    // Add logic to close the screen, navigate back, or perform any other action
    console.log('Closing the screen...');
    navigation.navigate('FindEmail');
  };


  const data1 = {
    email: Email,
  };
  const certificationrequest = async () => {
    
  
    try {
        const response = await axios.post('http://www.sm-project-refrigerator.store/api/members/password/send', data1);
        console.log(response);
    } catch (error) {
        console.error(error);
    }
  }

  const data2 = {
    email: Email,
    certificationCode: certificationNumber,
  };
  const certificationsend = async () => {
    try {
      const response = await axios.post('http://www.sm-project-refrigerator.store/api/members/password', data2); // Assuming data2 is defined somewhere
      console.log(response);
      if (response.data.isSuccess) { 
       
        navigation.navigate("PasswordReset", { Email }); // Navigate to PasswordReset screen
      } else {
        // If isSuccess is false, proceed with storing the access token
        console.log("Response indicates failure.");
      }
    } catch (error) {
      console.log('error', error);
      setError(true);
    }
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
        <Text style={styles.headerText}>비밀번호 찾기</Text>

        <View style={styles.PnumInputArea}>
          <Text style={styles.label}>이메일*</Text>
          <View style = {styles.MiniArea}>
          <TextInput
            style={styles.PnumForm}
            placeholder="이메일을 입력해주세요"
            keyboardType="email-address"
            value={Email}
            onChangeText={(text) => setEmail(text)}
          />
          <TouchableOpacity style={styles.MiniButton} onPress={handleFindPassword}>
            {isResend ? <Text style={styles.MiniButtonText}>재전송</Text> : <Text style={styles.MiniButtonText}>전송</Text>}
          </TouchableOpacity>
          </View>
          <View style={styles.AuthForm}>
            <TextInput
              style={styles.AuthText}
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
          <Text style={styles.buttonText}>비밀번호 찾기</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.retrieveButton} onPress={handleRetrieveEmail}>
        <Text style={styles.retrieveButtonText}>이메일 찾기</Text>
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


export default FindPassword;