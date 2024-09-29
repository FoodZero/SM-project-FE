import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation, useRoute } from '@react-navigation/native';

import OK from '../../../assets/Icons/OK.svg';


const EmailNotice = () => {

const navigation = useNavigation();
const route = useRoute();
const { Email } = route.params;
const handlelogin = () => {
  navigation.navigate('Login');
};
const handleRetrievePassword = () => {
  navigation.navigate('FindPassword');
};
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
    <Text style={styles.headerText}>이메일 안내</Text>
    <OK style={{alignSelf: 'center', marginTop: BasicHeight*95}}/>
    <Text style={styles.EmailinfoText}>회원님의 이메일 주소는 {'\n'}{Email} 입니다</Text>

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

const AllWidth = Dimensions.get("window").width;
const AllHeight = Dimensions.get("window").height;

const FigmaWidth = 390;
const FigmaHeight = 844;

const BasicWidth = (AllWidth / FigmaWidth).toFixed(2);
const BasicHeight = (AllHeight / FigmaHeight).toFixed(2);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerText: {
    fontSize: 30,
    includeFontPadding: false,
    fontFamily: 'NotoSansKR-Bold',
    marginLeft: BasicWidth * 20,
    marginTop: BasicHeight * 53,
    color: '#000000',
  },
  EmailinfoText: {
    fontSize: 20,
    includeFontPadding: false,
    alignSelf: 'center',
    textAlign: 'center',
    fontFamily: 'NotoSansKR-Regular',
    color: '#000000',
    marginTop: BasicHeight * 45,
    marginBottom: BasicHeight * 90,
  },
  findButton: {
    width: BasicWidth * 325,
    height: BasicHeight * 65,
    marginLeft: BasicWidth * 33,
    backgroundColor: '#3873EA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    includeFontPadding: false,
    fontFamily: 'NotoSansKR-Bold',
  },
  retrieveButton: {
    marginTop: BasicHeight * 25,
    alignContent: 'center',
    alignItems: 'center',
  },
  retrieveButtonText: {
    textDecorationLine: 'underline',
    fontSize: 16,
    color: 'black',
    includeFontPadding: false,
    fontFamily: 'NotoSansKR-Regular',
  },  
});
export default EmailNotice;