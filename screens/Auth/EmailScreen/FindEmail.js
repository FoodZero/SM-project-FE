import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';



const FindEmail = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [certificationNumber, setcertificationNumber] = useState('');
  const navigation = useNavigation();
  const [timer, setTimer] = useState(180); // Initial timer value in seconds
  const [timerActive, setTimerActive] = useState(false);

  const handleFindEmail = () => {
    // Add logic to find email using the entered phone number
    console.log(`Finding email for phone number: ${phoneNumber}`);
    certificationrequest();
    setTimerActive(true);
    startTimer();
  };

  const startTimer = () => {
    // Set up a timer that updates every second
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer > 0) {
          // If the timer is greater than 0, decrement it
          return prevTimer - 1;
        } else {
          // If the timer reaches 0, stop the timer
          clearInterval(intervalId);
          setTimerActive(false);
          return 0;
        }
      });
    }, 1000);
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

  const handleClose = () => {
    // Add logic to close the screen, navigate back, or perform any other action
    console.log('Closing the screen...');
  };

 var REQ_PARAM1 ={"phone" : phoneNumber }
  const certificationrequest = async () => {
    var AccessToken = "none";
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
  "certificationCode":certificationNumber};

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
      } else {
        console.log("Email not found or an error occurred.");
      }
    }).catch(function (error) {
      console.log('error', error);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
      <Text style={styles.headerText}>이메일 찾기</Text>
      <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
        <Text style={styles.closeButtonText}>X</Text>
      </TouchableOpacity>
      <Text style={styles.label}>휴대폰 번호*</Text>
      <View style={styles.phoneNumberContainer}>
      <TextInput
        style={styles.phoneNumberinput}
        placeholder="숫자만 입력"
        keyboardType="numeric"
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text)}
      />
        <TouchableOpacity style={styles.sendButton} onPress={handleFindEmail}>
        <Text style={styles.buttonText}>전송</Text>
      </TouchableOpacity>
      </View>
     
      <TextInput
        style={styles.certificationNumberinput}
        placeholder="인증번호 입력"  
        keyboardType="numeric"
        value={certificationNumber}
        onChangeText={(text) => setcertificationNumber(text)}
      /><Text style={styles.timerText}>인증시간 {Math.floor(timer / 60)}:{timer % 60}</Text>
     
     
      <TouchableOpacity style={styles.findButton} onPress={handlecertificationNumber}>
        <Text style={styles.buttonText}>이메일 찾기</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.retrieveButton} onPress={handleRetrievePassword}>
        <Text style={styles.retrieveButtonText}>비밀번호 찾기</Text>
      </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginLeft:30,
    marginTop:40,
  },
  headerText: {
    fontSize: 30,
    includeFontPadding: false,
    fontFamily: 'NotoSansKR-Bold',
    marginBottom: 90,
    marginRight: 200,
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 10,
    padding: 10,
   
  },
  closeButtonText: {
    fontSize: 25,
    color: 'black',
    includeFontPadding: false,
    fontFamily: 'NotoSansKR-Regular',
  },
  label: {
    marginBottom: 10,
    fontSize: 16,
    marginRight:240,
    includeFontPadding: false,
    fontFamily: 'NotoSansKR-Regular',
  },
  certificationNumberinput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 0,
    padding: 10,
    width: '90%',
  },
  timerText: {
    fontSize: 18,
    marginTop: 10,
    includeFontPadding: false,
    fontFamily: 'NotoSansKR-Regular',
  },
  phoneNumberinput: {

    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    width: '75%',
  },

  phoneNumberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    width: '90%',
  },


  findButton: {
    backgroundColor: '#808080',
    padding: 10,
    borderRadius: 100,
    alignItems: 'center',
    width: '90%',
    marginBottom: 10,
    marginTop: 40,
    
  },

  sendButton: {
    backgroundColor: '#3873EA',
    padding: 10,
    borderRadius:0,
    alignItems: 'center',
    width: '20%',
    marginBottom: 10,
    marginLeft: 10,
    height: 40,
    
  },

  buttonText: {
    color: 'white',
    fontSize: 16,
    includeFontPadding: false,
    fontFamily: 'NotoSansKR-Regular',
  },
  retrieveButton: {
    padding: 5,
    marginBottom:200,
    marginTop:20,
    marginLeft:106,
  },
  retrieveButtonText: {
    textDecorationLine: 'underline',
    fontSize: 16,
    color: 'black',
    includeFontPadding: false,
    fontFamily: 'NotoSansKR-Regular',
  },

  timerText: {
    fontSize: 12,
    marginTop: 10,
    color: 'gray',
    marginLeft:120,
    includeFontPadding: false,
    fontFamily: 'NotoSansKR-Regular',
  },

});

export default FindEmail;