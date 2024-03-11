import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PasswordResetScreen = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const navigation = useNavigation();

  const handleResetPassword = () => {
    if (password === confirmPassword) {
      // Add logic to handle password reset (e.g., make an API call to update the password)
      console.log('Password reset successful');
      console.log(`reset password is :${confirmPassword}`);
      
    } else {
      // Passwords do not match, display an error message
      setPasswordsMatch(false);
    }
  };

  const handleClose = () => {
    // Add logic to close the screen, navigate back, or perform any other action
    console.log('Closing the screen...');
    navigation.navigate('FindPassword');
  };

  const handleRetrieveEmail = () => {
    // Add logic to retrieve password
    console.log('Retrieving email...');
    navigation.navigate('FindEmail');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>비밀번호 재설정</Text>
      <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
        <Text style={styles.closeButtonText}>X</Text>
      </TouchableOpacity>
      <Text style={styles.label}>새 비밀번호*</Text>
      <TextInput
        style={styles.input}
        placeholder="새 비밀번호를 입력하세요."
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Text style={styles.label}>비밀번호 확인*</Text>
      <TextInput
        style={styles.input}
        placeholder="비밀번호를 다시 입력하세요."
        secureTextEntry
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
      />

      {!passwordsMatch && (
        <Text style={styles.errorMessage}>비밀번호가 일치하지 않습니다.</Text>
      )}

      <TouchableOpacity style={styles.confirmButton} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>확인</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.retrieveButton} onPress={handleRetrieveEmail}>
        <Text style={styles.retrieveButtonText}>이메일 찾기</Text>
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
    marginBottom: 40,
    marginRight: 150,
   
  },
  label: {
    marginTop: 10,
    fontSize: 16,
    marginRight:255,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    width: '100%',
  },
  errorMessage: {
    color: 'red',
    marginBottom: 20,
  },
  confirmButton: {
    backgroundColor: '#3873EA',
    padding: 10,
    height: 40,
    alignItems: 'center',
    width: '100%',
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
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
  retrieveButton: {
    padding: 5,
    marginBottom:150,
    marginTop:20
  },
  retrieveButtonText: {
    textDecorationLine: 'underline',
    fontSize: 16,
    color: 'black',
  },

});

export default PasswordResetScreen;