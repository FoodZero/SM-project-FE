import React from 'react';
import { View, Text, StyleSheet,TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';




const EmailNoticescreen = () => {

const navigation = useNavigation();
const route = useRoute();
const { Email } = route.params;
const handlelogin = () => {
  // Add logic to close the screen, navigate back, or perform any other action
  console.log('login botton');
};
const handleRetrievePassword = () => {
  // Add logic to retrieve password
  console.log('Retrieving password...');
  navigation.navigate('FindPassword');
};
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
    <Text style={styles.headerText}>이메일 안내</Text>
    <AntDesign name="checkcircleo" size={50} color="#3873EA" style={styles.icon}/>
    <Text style={styles.EmailinfoText}>회원님의 이메일 주소는 {Email} 입니다</Text>

    <TouchableOpacity style={styles.findButton} onPress={handlelogin}>
        <Text style={styles.buttonText}>로그인</Text>
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
    marginTop:40,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginLeft:30,
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,

    marginBottom: 100,
  },
  EmailinfoText: {
    fontSize: 20,
    marginTop: 60,
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
    marginTop:20,
    marginLeft:115,
  },
  retrieveButtonText: {
    textDecorationLine: 'underline',
    fontSize: 16,
    color: 'black',
  },
  icon: {
    position: 'absolute',
    marginLeft: 135,
    marginTop:110 ,
  },
  
});
export default EmailNoticescreen;