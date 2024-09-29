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
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';



const Dropdownmodal = ({ isVisible, onClose})=>{
    const [Email, setEmail]= useState("");
    

    return(
        <TouchableWithoutFeedback onPress={onClose}>
        <Modal
        visible={isVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={onClose} // Android back button을 눌렀을 때 모달 닫기
      >
        <TouchableWithoutFeedback onPress={() => {}}>
            <View  style={Styles.container}>
                <TouchableOpacity  onPress={onClose}>
                    <Text style={Styles.modalText}>공유인원 보기</Text>
                </TouchableOpacity>
                <View>
                    <Text style={Styles.modalText}>이메일로 친구초대</Text>
                </View>
            </View>
            </TouchableWithoutFeedback>
      </Modal>
      </TouchableWithoutFeedback>
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
        justifyContent: 'center',
        alignSelf: 'center',
    },
    container:{
        width: BasicWidth*160,
        height: BasicHeight*88,
        backgroundColor: '#31313173',
        borderRadius: 10,
        marginTop: BasicHeight*41,
        marginLeft: BasicWidth*155,
    },
      modalText: {
        fontSize: 16,
        fontFamily: 'NotoSansKR-Regular',
        color: '#000000',

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
      modalButton1: {
        width: BasicWidth*140,
        height: BasicHeight*44,
        borderBottomLeftRadius: 10,

        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        borderWidth: 0.3,
        borderColor: '#808080',
      },
      modalButton2: {
        width: BasicWidth*140,
        height: BasicHeight*44,
        borderBottomRightRadius: 10,

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

export default Dropdownmodal;
