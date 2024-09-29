import React, {useState, useEffect} from 'react';
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    Alert,
    TextInput,
} from "react-native";
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PERMISSIONS, RESULTS, request, requestMultiple, Permission, check } from "react-native-permissions";
import axios from 'axios';
import Camera from '../../assets/Icons/camera.svg';
import Frame from '../../assets/Icons/Frame.svg';
import LocationPin from '../../assets/Icons/location-pin.svg';
import Notification from '../../assets/Icons/notification.svg';


const CompleteModal = ({ isVisible, onClose})=>{
    return(
        <Modal
        visible={isVisible}
        transparent={true}
        animationType="none"
        onRequestClose={onClose} // Android back button을 눌렀을 때 모달 닫기
      >
        <View style={Styles.modalContainer}>
            <View style={Styles.container}>
            <Text style={Styles.modalText}>초대 메시지를 발송했습니다.</Text>
            
                <TouchableOpacity onPress={onClose} style={Styles.modalButton2}>
                  <Text style={Styles.modalButtonText}>확인</Text>
                </TouchableOpacity>

              </View>
          </View>
      </Modal>
    );
};


const AllWidth = Dimensions.get("window").width;
const AllHeight = Dimensions.get("window").height;

const FigmaWidth = 390;
const FigmaHeight = 844;

const BasicWidth =(
    AllWidth / FigmaWidth
).toFixed(2);

const BasicHeight =(
    AllHeight / FigmaHeight
).toFixed(2);

const Styles = StyleSheet.create({
    modalContainer:{
        width: AllWidth,
        height: AllHeight,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    container:{
        width: BasicWidth*270,
        height: BasicHeight*113,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        alignSelf: 'center',
        justifyContent: 'center',
    },
      modalText: {
        fontSize: 16,
        fontFamily: 'NotoSansKR-Regular',
        color: '#000000',
        marginTop: BasicHeight*24,
        includeFontPadding: false,
        alignSelf: 'center',
      },
      input: {
        width: BasicWidth*250,
        height: BasicHeight*40,
        textAlignVertical: 'center',
        borderColor: '#808080',
        borderWidth: 0.3,
        borderRadius: 5,
        marginTop: BasicHeight*13,
        marginLeft: BasicWidth*18,
        marginBottom: BasicHeight*18,
        fontFamily: 'NotoSansKR-Regular',
        fontSize: 16,
        textAlign: 'justify',
        paddingTop: 5,
        paddingBottom: 0,
      },

      modalButton2: {
        width: BasicWidth*270,
        height: BasicHeight*44,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,

        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        borderWidth: 0.3,
        borderColor: '#808080',
      },
      modalButtonText: {
        color: '#3873EA',
        fontSize: 16,
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
});

export default CompleteModal;
