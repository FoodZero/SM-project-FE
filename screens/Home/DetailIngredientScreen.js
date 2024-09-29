<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  Dimensions,
} from 'react-native';
import  AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Calendar } from 'react-native-calendars';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Back from '../../assets/Icons/back.svg';
import Plus from '../../assets/Icons/plus-circle.svg';
import Minus from '../../assets/Icons/minus-circle.svg';



const DetailIngredientScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const AccessToken = route.params?.AccessToken;
  const ingredient = route.params?.ingredient;
  const [FoodType, setFoodType] = useState('');
=======
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Calendar } from 'react-native-calendars';
import axios from 'axios';



const QuantityInput = ({ quantity, onIncrease, onDecrease }) => {
  return (
    <View style={styles.quantityContainer}>
      
      <View style={styles.quantityInputContainer}>
      <Text style={styles.labelText}>수량 </Text>
        <TouchableOpacity onPress={onDecrease}>
          <AntDesign name="minus" size={24} color="#3873EA" />
        </TouchableOpacity>
        <TextInput
          style={styles.quantityInput}
          value={quantity.toString()}
          keyboardType="numeric"
          onChangeText={value => onQuantityChange(value)}
        />
        <TouchableOpacity onPress={onIncrease}>
          <AntDesign name="plus" size={24} color="#3873EA" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const DetailIngrediant = () => {

 
  const navigation = useNavigation();
  const route = useRoute();
  const AccessToken = route.params?.AccessToken;
  const refrigeratorId = route.params?.refrigeratorId;
  const ingredient = route.params?.ingredient;
  const FoodId = route.params?.FoodId;
  const date = route.params?.date;
>>>>>>> origin-flit/cli
  const [isSelected1, setIsSelected1] = useState(false);
  const [isSelected2, setIsSelected2] = useState(false);
  const [isSelected3, setIsSelected3] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
<<<<<<< HEAD
  const [Foodid, setFoodid] = useState(0);
  const [quantity, setQuantity] = useState(1); // Initialize quantity state
  const [ingredientName, setIngredientName] = useState(ingredient || '');
  const today = new Date();
  const formattedDate = `${today.getFullYear()}. ${today.getMonth() + 1}. ${today.getDate()}`;

  useEffect(() => {
    if (route.params) {
      setFoodid(route.params.FoodId || '');
      setIngredientName(route.params.ingredient || '');
      setQuantity(route.params.quantity || 1);
      setSelectedDate(route.params.date || '');
      const initialFoodType = route.params.foodType || '';
      setFoodType(initialFoodType);
      initializeFoodType(initialFoodType);
    }
    console.log('Ingredient:', route.params);
  }, [route.params]);


  const initializeFoodType = (initialFoodType) => {
    if (initialFoodType === 'COLD') {
      setIsSelected1(true);
    } else if (initialFoodType === 'FROZEN') {
      setIsSelected2(true);
    } else if (initialFoodType === 'OUTSIDE') {
      setIsSelected3(true);
    }
  };

  const handleClose = () => {
    console.log('Closing the screen...');
    navigation.goBack();
=======
  const [quantity, setQuantity] = useState(1); // Initialize quantity state
  const [textInputValue, setTextInputValue] = useState('');

  const handleClose = () => {
    console.log('Closing the screen...');
    navigation.navigate('Ingredient', { AccessToken: AccessToken });
>>>>>>> origin-flit/cli
  };

  const handleSave = () => {
    console.log('Save button pressed');
<<<<<<< HEAD
    console.log('AccessToken:', AccessToken );
=======
>>>>>>> origin-flit/cli
   //console.log(`제품명: ${ingredient}`);
   //console.log(`유통기한: ${selectedDate}`);
   // console.log(`수량: ${quantity}`);
   // let FoodType = '';
   // if (isSelected1) {
   //   FoodType = 'COLD';
   // } else if (isSelected2) {
   //   FoodType = 'FROZEN';
   // } else if (isSelected3) {
   //   FoodType = 'OUTSIDE';
   // }
   // console.log(`음식타입: ${FoodType}`);
<<<<<<< HEAD
    addfood();
  };

  const handleSelect1 = () => {
    if(isSelected1 === true){
      setIsSelected1(false);
    }
    else{
      setIsSelected1(true);
      setIsSelected2(false);
      setIsSelected3(false);
      setFoodType('COLD');
    }
  };

  const handleSelect2 = () => {
    if(isSelected2 === true){
      setIsSelected2(false);
    }
    else{
      setIsSelected1(false);
      setIsSelected2(true);
      setIsSelected3(false);
      setFoodType('FROZEN');
    }
  };

  const handleSelect3 = () => {
    if(isSelected3 === true){
      setIsSelected3(false);
    }
    else{
      setIsSelected1(false);
      setIsSelected2(false);
      setIsSelected3(true);
      setFoodType('OUTSIDE');
    }
=======
   ModifyFood();
  };

  const handleSelect1 = () => {
    setIsSelected1(!isSelected1);
  };

  const handleSelect2 = () => {
    setIsSelected2(!isSelected2);
  };

  const handleSelect3 = () => {
    setIsSelected3(!isSelected3);
>>>>>>> origin-flit/cli
  };

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
<<<<<<< HEAD
    setIsCalendarOpen(false);
  };

  const toggleCalendar = () => {
    setIsCalendarOpen(true);
=======
  };

  const toggleCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen);
>>>>>>> origin-flit/cli
  };

  const increaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };
<<<<<<< HEAD
  const handleIngredientNameChange = (text) => {
    setIngredientName(text); // Update state
  };


  const QuantityInput = ({ quantity, onIncrease, onDecrease }) => {
    return (
      <View style={styles.quantityContainer}>
        <Text style={styles.quantityText}>수량 </Text>

        <View style={styles.quantityInputContainer}>
        <TouchableOpacity onPress={onIncrease}>
            <Plus />
          </TouchableOpacity>
          <TextInput
            style={styles.quantityInput}
            value={quantity.toString()}
            keyboardType="numeric"
            onChangeText={value => onQuantityChange(value)}
          />
          <TouchableOpacity onPress={onDecrease}>
            <Minus/>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  

  const addfood = async () => {
    const TOKEN = await AsyncStorage.getItem('userAccessToken');
    const refrigeratorld = await AsyncStorage.getItem('userRefId');
    const name = await AsyncStorage.getItem('userRefName');
    const data = {
      name: ingredient,
=======
  



  const ModifyFood = async () => {
  
    let FoodType = '';
    if (isSelected1) {
      FoodType = 'COLD';
    } else if (isSelected2) {
      FoodType = 'FROZEN';
    } else if (isSelected3) {
      FoodType = 'OUTSIDE';
    }
    const headers = {
      Authorization: `Bearer ${AccessToken}`
    };
    const data = {
      name: textInputValue,
>>>>>>> origin-flit/cli
      expire: selectedDate,
      count: quantity,
      foodType: FoodType,
    };
<<<<<<< HEAD
    console.log(data);
    console.log(refrigeratorld);
    console.log(Foodid);
    console.log(TOKEN);

    try {
        const response = await axios.put(`http://www.sm-project-refrigerator.store/api/food/${Foodid}/${refrigeratorld}`, data, {
          headers: { Authorization: `Bearer ${TOKEN}` }});
        console.log(response.data);

        if (response.status === 200) {
          console.log('음식 수정 성공');
          navigation.reset({
            routes: [
              { name: '홈', params: { screen: 'Ingredient', params: { Id: refrigeratorld, Name: name } } } // 두 번째 화면을 'Ingredient'로 설정
            ],
          });
        }
=======
    
    try {
        const response = await axios.put(`http://www.sm-project-refrigerator.store/api/food/${FoodId}/${refrigeratorId}`, data, { headers });
        console.log(response.data);
        
>>>>>>> origin-flit/cli
  
    } catch (error) {
        console.error(error);
    }
   
<<<<<<< HEAD
  }
=======
  };
>>>>>>> origin-flit/cli
  


  return (
    <SafeAreaView style={styles.container}>
<<<<<<< HEAD
      <ScrollView style={styles.Scroll}>
        <View style={styles.Header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleClose}>
            <Back />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.headerText}>상세 보기</Text>
        </View>
        
=======
      <ScrollView>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleClose}>
          <AntDesign name="left" size={25} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>상세 보기</Text>
        
        {/* ingrediant name input */}
        <TextInput
          style={styles.textInput}
          value={textInputValue}
          onChangeText={setTextInputValue}
          placeholder={ingredient||""}
        />
    
>>>>>>> origin-flit/cli
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.button, {backgroundColor: isSelected1 ? '#3873EA' : 'white'}]} 
            onPress={handleSelect1}>
            <Text style={[styles.buttonText, {color: isSelected1 ? 'white' : '#3873EA'}]}>
              {isSelected1 ? '냉장' : '냉장'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, {backgroundColor: isSelected2 ? '#3873EA' : 'white'}]} 
            onPress={handleSelect2}>
            <Text style={[styles.buttonText, {color: isSelected2 ? 'white' : '#3873EA'}]}>
              {isSelected2 ? '냉동' : '냉동'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, {backgroundColor: isSelected3 ? '#3873EA' : 'white'}]} 
            onPress={handleSelect3}>
            <Text style={[styles.buttonText, {color: isSelected3 ? 'white' : '#3873EA'}]}>
              {isSelected3 ? '실외' : '실외'}
            </Text>
          </TouchableOpacity>
        </View>

<<<<<<< HEAD
        <View style={styles.InputContainer}>
          <TextInput
            style={styles.ingredientInput}
            value={ingredientName} // Bind the value to ingredientName state
            onChangeText={handleIngredientNameChange} // Call handler to update state on text change
            placeholder=" " // Optional placeholder
          />

          <TouchableOpacity onPress={toggleCalendar}>
            <View style={styles.expireInput}>
              <Text style={styles.expireText}>유통 기한</Text>
              <View style={styles.expireDateContainer}>
                <Text style={styles.expireDate}> {`${selectedDate}`}</Text>
              </View>
            </View>
          </TouchableOpacity>

          {isCalendarOpen && (
            <Calendar
            style={{width: BasicWidth*300}}
              onDayPress={handleDayPress}
              monthFormat={'yyyy년 M월'}
            />
          )}

          {/* Render QuantityInput component */}
          <QuantityInput
            quantity={quantity}
            onIncrease={increaseQuantity}
            onDecrease={decreaseQuantity}
          />
        </View>
        <View style={styles.date}>
          <Text style={styles.dateText}>등록 {`${formattedDate}`}</Text>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>저장</Text>
=======
        <TouchableOpacity onPress={toggleCalendar}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>{`유통기한: ${selectedDate}`}</Text>
          </View>
        </TouchableOpacity>

        {isCalendarOpen && (
          <Calendar
            onDayPress={handleDayPress}
          />
        )}

        {/* Render QuantityInput component */}
        <QuantityInput
          quantity={quantity}
          onIncrease={increaseQuantity}
          onDecrease={decreaseQuantity}
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.buttonText}>저장</Text>
>>>>>>> origin-flit/cli
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

<<<<<<< HEAD
const AllWidth = Dimensions.get("window").width;
const AllHeight = Dimensions.get("window").height;

const FigmaWidth = 390;
const FigmaHeight = 844;

const BasicWidth = (AllWidth / FigmaWidth).toFixed(2);
const BasicHeight = (AllHeight / FigmaHeight).toFixed(2);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
  Scroll:{
    width : AllWidth,
    height : AllHeight,
  },

  Header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: BasicHeight*13,
  },
  headerText: {
    fontSize: 30,
    includeFontPadding: false,
    fontFamily: 'NotoSansKR-Bold',
    marginTop: BasicHeight*24,
    marginBottom: BasicHeight*70,
    marginLeft: BasicWidth*39,
    color: '#000000',
  },
  backButton: {
    marginLeft: BasicWidth*347,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginLeft: BasicWidth*42,
    marginBottom: BasicHeight*29,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: BasicHeight*40,
    width: BasicWidth*92,
    marginRight: BasicWidth*15,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#3873EA',
  },
  InputContainer: {
    marginLeft: BasicWidth*45,
  },
  ingredientInput:{
    borderWidth: 1.5,
    borderColor: '#E2E2E2',
    borderRadius: 15,
    width: BasicWidth*300,
    height: BasicHeight*56,
    paddingLeft: BasicWidth*20,
    includeFontPadding: false,
    fontSize: 18,
    fontFamily: 'NotoSansKR-Regular',
    color: '#000000',
    backgroundColor: '#FFFFFF',
  },
  expireInput:{
    marginTop: BasicHeight*25,
    flexDirection: 'row',
    borderWidth: 1.5,
    borderColor: '#E2E2E2',
    borderRadius: 15,
    width: BasicWidth*300,
    height: BasicHeight*56,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  expireText:{
    marginLeft: BasicWidth*20,
    includeFontPadding: false,
    fontSize: 18,
    fontFamily: 'NotoSansKR-Regular',
    color: '#000000',
  },
  expireDateContainer:{
    width: BasicWidth*120,
    height: BasicHeight*36,
    marginLeft: BasicWidth*69,
    borderRadius: 5,
    padding:0,
    backgroundColor: '#EEEEEF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  expireDate:{
    includeFontPadding: false,
    fontSize: 18,
    fontFamily: 'NotoSansKR-Regular',
    color: '#FF3B30',
  },
  quantityContainer: {
    marginTop: BasicHeight*25,
    flexDirection: 'row',
    borderWidth: 1.5,
    borderColor: '#E2E2E2',
    borderRadius: 15,
    width: BasicWidth*300,
    height: BasicHeight*56,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  quantityText: {
    marginLeft: BasicWidth*20,
    includeFontPadding: false,
    fontSize: 18,
    fontFamily: 'NotoSansKR-Regular',
    color: '#000000',
=======
const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginLeft: 30,
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 70,
    marginBottom: 50,
    marginRight: 190,
  },
  backButton: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: 10,
    marginTop:20,
  },
  button: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginHorizontal: 5,
    height: 40,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#3873EA',
  },
  saveButton: {
    backgroundColor: '#3873EA',
    padding: 10,
    alignItems: 'center',
    width: '90%',
    marginTop: 200,
    height: 40,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#3873EA',
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
    width: '90%',
  },
  inputText: {
    color: '#000', // Set text color here
    fontSize: 16,
  },
  labelText: {
    fontSize: 16,
    marginBottom: 5,
  },
  quantityContainer: {
    borderWidth: 1,
    borderColor: '#3873EA',
    borderRadius: 5,
    padding: 10,
    marginTop: 30,
    width: '90%',
>>>>>>> origin-flit/cli
  },
  quantityInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
<<<<<<< HEAD
    marginLeft: BasicWidth*120,
  },
  quantityInput: {
    borderRadius: 5,
    padding:0,
    width: BasicWidth*50,
    height: BasicHeight*36,
    textAlign: 'center',
    includeFontPadding: false,
    fontSize: 18,
    fontFamily: 'NotoSansKR-Regular',
    backgroundColor: '#EEEEEF',
  },
  date:{
    width: BasicWidth*128,
    height: BasicHeight*26,
    marginLeft: BasicWidth*131,
    marginTop: BasicHeight*30,
  },
  dateText:{
    includeFontPadding: false,
    fontSize: 18,
    fontFamily: 'NotoSansKR-Regular',
  },
  saveButton: {
    backgroundColor: '#3873EA',
    alignItems: 'center',
    width: BasicWidth*325,
    height: BasicHeight*65,
    marginTop: BasicHeight*165,
    marginLeft: BasicWidth*32,
    justifyContent: 'center',
  },
  saveButtonText: {
    fontSize: 20,
    fontFamily: 'NotoSansKR-Bold',
    includeFontPadding: false,
    color: '#FFFFFF',
  },
  buttonText: {
    fontSize: 16,
    includeFontPadding: false,
    fontFamily: 'NotoSansKR-Regular',
  },
});
export default DetailIngredientScreen;
=======
  },
  quantityInput: {
    borderWidth: 1,
    borderColor: '#3873EA',
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
    width: 50,
    textAlign: 'center',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#3873EA',
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
    width: '90%',
  },
});

export default DetailIngrediant;
>>>>>>> origin-flit/cli
