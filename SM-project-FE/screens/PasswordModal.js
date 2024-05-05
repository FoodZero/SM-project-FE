import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, SafeAreaView, ScrollView } from 'react-native';

const PasswordModal = ({ isVisible, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
       
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>입력하신 이메일 주소로 인증번호를 발송하였습니다. 인증번호 확인 후 비밀번호를 재설정 해주세요.</Text>
          <TouchableOpacity style={styles.modalButton} onPress={onClose}>
            <Text style={styles.buttonText}>확인</Text>
          </TouchableOpacity>
        </View>
        
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 10,
    alignItems: 'center',
    width: '90%',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#3873EA',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    width: '50%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default PasswordModal;