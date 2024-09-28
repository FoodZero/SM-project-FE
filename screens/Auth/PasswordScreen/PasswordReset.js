import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Modal,

} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';

import X from '../../../assets/Icons/X.svg';

const PasswordReset = () => {
  const route = useRoute();
  const { Email } = route.params;
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [ModalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();

  const handleResetPassword = () => {
    if (password === confirmPassword) {
      // Add logic to handle password reset (e.g., make an API call to update the password)
      console.log('Password reset successful');
      console.log(`reset password is :${confirmPassword}`);
      passwordreset();
    } else {
      // Passwords do not match, display an error message
      setPasswordsMatch(false);
    }
  };

  const handleClose = () => {
    setModalVisible(true);
  };
  const backYes = () =>{
    setModalVisible(false);
    navigation.navigate("Login");
  };

  const handleRetrieveEmail = () => {
    // Add logic to retrieve password
    console.log('Retrieving email...');
    navigation.navigate('FindEmail');
  };

  const data1 = {
    email: Email,
    newPassword: password,
    passwordCheck: confirmPassword,
  };
  const passwordreset = async () => {
    try {
      const response = await axios.post('http://www.sm-project-refrigerator.store/api/members/password/reset', data1); // Assuming data2 is defined somewhere
      console.log(response);
      if (response.data.isSuccess) { 
        navigation.navigate('Login');
       // navigation.navigate("home"); // Navigate to home screen
      } else {
        // If isSuccess is false, proceed with storing the access token
        console.log("Response indicates failure.");
      }
    } catch (error) {
      console.log('error', error);
    }
  };
  


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
      <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
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
      <Text style={styles.headerText}>비밀번호 재설정</Text>
      
      <Text style={styles.label}>새 비밀번호*</Text>
      <TextInput
        style={styles.input}
        placeholder="새 비밀번호를 입력하세요."
        placeholderTextColor={'#AFAFAF'}
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <View style={styles.Re}>
        <Text style={styles.label2}>비밀번호 확인*</Text>
        <TextInput
          style={styles.input2}
          placeholderTextColor={'#AFAFAF'}
          placeholder="비밀번호를 다시 입력하세요."
          secureTextEntry
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
        />

        {!passwordsMatch && (
          <Text style={styles.errorMessage}>비밀번호가 일치하지 않습니다.</Text>
        )}
      </View>

      <TouchableOpacity style={styles.confirmButton} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>완료</Text>
      </TouchableOpacity>
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
  },
  headerText: {
    fontSize: 30,
    includeFontPadding: false,
    fontFamily: 'NotoSansKR-Bold',
    color: '#000000',
    marginLeft: BasicWidth*20,
    marginBottom: BasicHeight * 15,
   
  },
  closeButton: {
    marginTop: BasicHeight * 13,
    marginLeft: BasicWidth * 350,
  },
  label: {
    fontSize: 20,
    includeFontPadding: false,
    fontFamily: 'NotoSansKR-Regular',
    color: '#000000',
    marginLeft: BasicWidth*33,
    marginTop : BasicHeight*40,
  },
  input: {
    width: BasicWidth * 325,
    height: BasicHeight*50,
    borderColor: '#E2E2E2',
    borderWidth: 1,
    marginLeft: BasicWidth*33,
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 20,
    color: '#000000',
    includeFontPadding: false,
    paddingLeft: BasicWidth*10,
  },
  label2: {
    fontSize: 20,
    includeFontPadding: false,
    fontFamily: 'NotoSansKR-Regular',
    color: '#000000',
  },
  input2: {
    width: BasicWidth * 325,
    height: BasicHeight*50,
    borderColor: '#E2E2E2',
    borderWidth: 1,
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 20,
    color: '#000000',
    includeFontPadding: false,
    paddingLeft: BasicWidth*10,
  },
  errorMessage: {
    color: '#E82323',
    marginTop: BasicHeight*5,
    marginLeft: BasicWidth*10,
    fontSize: 13,
    includeFontPadding: false,
    fontFamily: 'NotoSansKR-Regular',
  },
  confirmButton: {
    backgroundColor: '#3873EA',
    alignItems: 'center',
    justifyContent: 'center',
    width: BasicWidth * 325,
    height: BasicHeight*65,
    marginLeft: BasicWidth*33,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    includeFontPadding: false,
    fontFamily: 'NotoSansKR-Bold',
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalButton: {
    width: '100%',
    padding: 10,
    marginVertical: 5,
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#3873EA',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },
  Re:{
    height: BasicHeight*109,
    marginLeft: BasicWidth*33,
    marginTop: BasicHeight*40,
    marginBottom: BasicHeight*65,
  },

  DeletemodalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    
  },
  DeletemodalButton: {
    width: '40%',
    padding: 10,
    marginVertical: 5,
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#3873EA',
  },

  RecipeMovemodalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    
  },
  RecipeMovemodalButton: {
    width: '40%',
    padding: 10,
    marginVertical: 5,
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#3873EA',
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

export default PasswordReset;