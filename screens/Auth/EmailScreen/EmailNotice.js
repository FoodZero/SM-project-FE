import React from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';




const EmailNotice = () => {

const navigation = useNavigation();

const handlelogin = () => {
  // Add logic to close the screen, navigate back, or perform any other action
  console.log('login button');
};
const handleRetrievePassword = () => {
  // Add logic to retrieve password
  console.log('Retrieving password...');
  navigation.navigate('FindPassword');
};
  return (
    <View style={styles.container}>
    <Text style={styles.headerText}>이메일 안내</Text>
    <Icon name = "close" size = {20}/>
    <Text style={styles.EmailinfoText}>회원님의 이메일 주소는 abcd@naver.com 입니다</Text>

    <TouchableOpacity style={styles.findButton} onPress={handlelogin}>
        <Text style={styles.buttonText}>로그인</Text>
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
    marginBottom: 10,
    marginRight: 200,
    marginBottom: 100,
  },
  EmailinfoText: {
    fontSize: 20,
    marginTop: 25,
    marginBottom: 60,
  },
  findButton: {
    backgroundColor: '#3873EA',
    padding: 10,
    alignItems: 'center',
    width: '90%',
    marginBottom: 10,
    marginTop:10,
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
  
});
export default EmailNotice;