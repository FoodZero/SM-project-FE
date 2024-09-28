import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Dimensions,

} from 'react-native';

import { ScrollView } from 'react-native';
import { useNavigation, useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useTabBarVisibility from '../useTabBarVisibility';
import Toast from 'react-native-toast-message';

import Detail from '../../assets/Icons/DetailGo.svg';
import DeleteOff from '../../assets/Icons/DeleteOff.svg'; // DeleteOff icon
import Back from '../../assets/Icons/back.svg';
import IngredientAdd from '../../assets/Icons/IngredientAdd.svg';
import Capture from '../../assets/Icons/capture.svg';


const FoodInput = () => {
  const route = useRoute();
  useTabBarVisibility(false);
  const AccessToken = AsyncStorage.getItem('userAccessToken');
  const id = AsyncStorage.getItem('userRefId');
  const [ingredientNames, setIngredientNames] = useState(['']); // Initial array with one empty string
  const [errorMessage, setErrorMessage] = useState('');
  const navigation = useNavigation();  
  const [text, setText] = useState('');
  
  const handlePress = (ingredientText) => {
    // 버튼이 눌렸을 때 수행할 작업을 여기에 작성하세요
    console.log('입력된 텍스트:', ingredientText);
    console.log('AccessToken:', AccessToken );
    navigation.navigate('FoodInputDetail', { ingredient: ingredientText}); 
  };

  const handleSave = async() => {
    const AccessToken = AsyncStorage.getItem('userAccessToken');
      const id = await AsyncStorage.getItem('userRefId');
      const name = await AsyncStorage.getItem('userRefName');

    if (ingredientNames.some(name => !name.trim())) {
      showToast();
    }
    else{
      navigation.reset({
        routes: [
          { name: '홈', params: { screen: 'Ingredient', params: { Id: id, Name: name } } } // 두 번째 화면을 'Ingredient'로 설정
        ],
      });
      console.log('Ingredient Names:', ingredientNames);
    }
    // Your save logic here
  };

  const handleAddIngredient = () => {
    setIngredientNames([...ingredientNames, '']);
  };

  const handleClose = async() => {
    const id = await AsyncStorage.getItem('userRefId');
    const name = await AsyncStorage.getItem('userRefName');
      navigation.reset({
        routes: [
          { name: '홈', params: { screen: 'Ingredient', params: { Id: id, Name: name } } } // 두 번째 화면을 'Ingredient'로 설정
        ],
      });
  };

  const handleReceiptScan = () => {
    console.log(`handleReceiptScan`);
    navigation.navigate("CameraScreen");
  };

  const handleIngredientNameChange = (index, value) => {
    const newIngredientNames = [...ingredientNames];
    newIngredientNames[index] = value;
    setIngredientNames(newIngredientNames);
  };

  const showToast = () => {
    Toast.show({
      type: 'errortoast',
      position: 'top',
      topOffset: BasicHeight*139,

      visibilityTime: 2000,
    });
  }

  //토스트 메세지 커스텀 함수
  const toastConfig = {
    'errortoast': ({errtext}) => (
      <View 
        style={{
          backgroundColor: '#31313173',
          flexDirection: 'row',
          alignItems: 'center',
          alignContent: 'center',
          height: BasicWidth* 39,
          width: BasicHeight* 174,
          borderRadius: 10, 
        }}>
        <Text
          style={{
            color: '#FFFFFF',
            alignSelf: 'center',
            marginLeft: BasicWidth*12,
            includeFontPadding: false,
            fontFamily: 'NotoSansKR-Light',
            fontSize: 14,
          }}
        >
          이름은 필수 입력입니다.
        </Text>
      </View>
    ),
  };

  return (
    <SafeAreaView style={styles.Container}>
      <ScrollView style={styles.Scroll}>
        <View style={styles.Header}>
        <TouchableOpacity
          onPress={handleClose}>
          <Back/>
        </TouchableOpacity>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>저장</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.Header2}>
          <Text style={styles.headerText}>재료 추가</Text>
        </View>
        <Text style={styles.label}>이름*</Text>
        <View style={styles.lableContainer}>
          {ingredientNames.map((name, index) => (
            <View key={index} style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder=" "
                value={name}
                onChangeText={(text) => handleIngredientNameChange(index, text)}
              />
              <TouchableOpacity
                style={styles.DeleteButton}
                onPress={()=>handlePress(name)}
              >
                <Detail />
              </TouchableOpacity>
            </View>
          ))}
        </View>
        
        <TouchableOpacity style={styles.addButton} onPress={handleAddIngredient}>
          <IngredientAdd/>
          <Text style={styles.addButtonText}>항목 추가하기</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.ReceiptScanButton} onPress={handleReceiptScan}>
          <Capture/>
          <Text style={styles.ReceiptScanButtonText}>영수증 스캔하기</Text>
          </TouchableOpacity>
          <Toast config={toastConfig} />
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
  Container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  Scroll:{
    flex: 1,
  },
  Header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: BasicWidth*27,
    marginTop: BasicHeight*13,
  },
  saveButton: {
    marginLeft: BasicWidth*285,
  },
  saveButtonText: {
    fontSize: 20,
    fontFamily: 'NotoSansKR-Regular',
    includeFontPadding: false,
    color: '#000000',
  },
  Header2: {
    height: BasicHeight*45,
    marginLeft: BasicWidth*39,
    marginTop: BasicHeight*24,
  },
  headerText:{
    fontSize: 30,
    fontFamily: 'NotoSansKR-Bold',
    includeFontPadding: false,
    color: '#000000',
  },
  label: {
    width: BasicWidth*42,
    height: BasicHeight*26,
    marginTop: BasicHeight*50,
    marginLeft: BasicWidth*50,
    marginBottom: BasicHeight*15,
    fontSize: 18,
    includeFontPadding: false,
    fontFamily: 'NotoSansKR-Regular',
    color: '#000000',
  },
  lableContainer:{
    marginLeft: BasicWidth*50,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: BasicWidth*300,
    height: BasicHeight*56,
    marginBottom: BasicHeight*25,
    borderWidth: 1.5,
    borderColor: '#E2E2E2',
    borderRadius: 15,
  },
  DeleteButton:{
    position: 'absolute',
    marginLeft: BasicWidth*265,
  },
  input: {
    height: BasicHeight*56,
    marginLeft: BasicWidth*20,
    color: '#000000',
    fontSize: 18,
    includeFontPadding: false,
    fontFamily: 'NotoSansKR-Regular',
  },
  ReceiptScanButton: {
    backgroundColor: '#3873EA',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    
    width: BasicWidth*325,
    height: BasicHeight*65,
    marginLeft: BasicWidth*33,
    marginTop: BasicHeight*51,
    marginBottom: BasicHeight*20,
  },
  ReceiptScanButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    includeFontPadding: false,
    fontFamily: 'NotoSansKR-Bold',
    marginLeft: BasicWidth*10,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: BasicWidth*136,
    height: BasicHeight*24,
    marginLeft: BasicWidth*127,
    marginTop: BasicHeight*3,
  },
  addButtonText: {
    fontSize: 18,
    color: '#000000',
    includeFontPadding: false,
    fontFamily: 'NotoSansKR-Regular',
    marginLeft: BasicWidth*10,
  },


  backButton: {
    top: 10,
    right: 350,
  },
  
  
  
  inputButton: {
    marginLeft: 10,
    backgroundColor: '#3873EA',
    borderRadius: 15,
    padding: 10,
    width:'30%',
    height:50,
  },
  inputButtonText: {
    color: 'white',
    fontSize: 25,
    includeFontPadding: false,
    fontFamily: 'NotoSansKR-Regular',
  },
  
  
  
  errorText: {
    color: 'red',
    fontSize: 16,
    marginBottom: BasicHeight*10,
    includeFontPadding: false,
    fontFamily: 'NotoSansKR-Regular',
  },
});


export default FoodInput;
