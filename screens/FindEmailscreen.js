import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';


  
const FindEmailScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [certificationNumber, setcertificationNumber] = useState('');
  const navigation = useNavigation();
  const [timer, setTimer] = useState(180); // Initial timer value in seconds
  const [timerActive, setTimerActive] = useState(false);

  const handleFindEmail = () => {
    // Add logic to find email using the entered phone number
    // This could involve making an API call to your server, for example.
    console.log(`Finding email for phone number: ${phoneNumber}`);
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
   
    console.log(`certification Number is:${certificationNumber}`);
    navigation.navigate('EmailNotice');
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

  return (
    <View style={styles.container}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 80,
    marginRight: 200,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
   
  },
  closeButtonText: {
    fontSize: 25,
    color: 'black',
  },
  label: {
    marginBottom: 10,
    fontSize: 16,
    marginRight:240,
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
  },
  retrieveButton: {
    padding: 5,
    marginBottom:200,
    marginTop:20
  },
  retrieveButtonText: {
    textDecorationLine: 'underline',
    fontSize: 16,
    color: 'black',
  },

  timerText: {
    fontSize: 12,
    marginTop: 10,
    color: 'gray',
  },

});

export default FindEmailScreen;