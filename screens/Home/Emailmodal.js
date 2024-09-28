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

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import CompleteModal from './CompleteModal';


const Emailmodal = ({ isVisible, onClose})=>{
    const [Email, setEmail]= useState("");
    const [Complete, setComplete] = useState(false);

    
    const sendInvite = async() =>{
        try {
          const AccessToken = await AsyncStorage.getItem('userAccessToken');
          const Id = await AsyncStorage.getItem('userRefId')
          console.log(Id);
          console.log(Email);
          data = {
            refrigeratorId: Id,
            eamil: Email
          };
          const response = await axios.post(`http://www.sm-project-refrigerator.store/api/share`, data,{
            headers: { Authorization: `Bearer ${AccessToken}` }
          });
          
          if (response.status === 200) {
            console.log('전달 완료:', response.data);
            onClose();
            setComplete(true);
          }
        } catch (error) {
          console.error('Error updating refrigerator name:', error);
        }
      }

      const closeCompleteModal = () => {
        setComplete(false); // Close CompleteModal when done
    };


    return(
      <View>

      
        <Modal
        visible={isVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={onClose} // Android back button을 눌렀을 때 모달 닫기
      >
        <View style={Styles.modalContainer}>
            <View style={Styles.container}>
            <Text style={Styles.modalText}>초대할 친구의 이메일 주소를{'\n'}입력해주세요.</Text>
            <TextInput
            style={Styles.input}
            placeholder=' '
            value={Email}
            onChangeText={setEmail}
            inputMode='email'
            placeholderTextColor={'#808080'}
            />
            <View style={{flexDirection:'row'}}>
              <TouchableOpacity onPress={onClose} style={Styles.modalButton1}>
                  <Text style={Styles.modalButtonText}>취소</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={sendInvite} style={Styles.modalButton2}>
                  <Text style={Styles.modalButtonText}>확인</Text>
                </TouchableOpacity>
            </View>
              </View>
          </View>
      </Modal>
      {Complete && (
                <CompleteModal
                    isVisible={Complete}
                    onClose={closeCompleteModal} // Pass function to close CompleteModal
                />
            )}
      </View>
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
        width: BasicWidth*280,
        height: BasicHeight*175,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        alignSelf: 'center',
        justifyContent: 'center',
    },
      modalText: {
        fontSize: 16,
        fontFamily: 'NotoSansKR-Regular',
        color: '#000000',
        marginTop: BasicHeight*57,
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

export default Emailmodal;
