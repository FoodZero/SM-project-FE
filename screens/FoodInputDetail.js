import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, TextInput } from 'react-native';
import  AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Calendar } from 'react-native-calendars';
import axios from 'axios';



const Screen2 = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const AccessToken = route.params?.AccessToken;
  const ingredient = route.params?.ingredient;
  const [isSelected1, setIsSelected1] = useState(false);
  const [isSelected2, setIsSelected2] = useState(false);
  const [isSelected3, setIsSelected3] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [quantity, setQuantity] = useState(1); // Initialize quantity state
  const [textInputValue, setTextInputValue] = useState('');

  const handleClose = () => {
    console.log('Closing the screen...');
  };

  const handleSave = () => {
    console.log('Save button pressed');
    console.log('AccessToken:', AccessToken );
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
    addfood();
  };

  const handleSelect1 = () => {
    setIsSelected1(!isSelected1);
  };

  const handleSelect2 = () => {
    setIsSelected2(!isSelected2);
  };

  const handleSelect3 = () => {
    setIsSelected3(!isSelected3);
  };

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  const toggleCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  const increaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };
  


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
  

  const addfood = async () => {
    let FoodType = '';
    if (isSelected1) {
      FoodType = 'COLD';
    } else if (isSelected2) {
      FoodType = 'FROZEN';
    } else if (isSelected3) {
      FoodType = 'OUTSIDE';
    }
    const refrigeratorld = 10;
    const data = {
      name: ingredient,
      expire: selectedDate,
      count: quantity,
      foodType: FoodType,
    };
    
    const headers = {
      Authorization:`Bearer ${AccessToken}`
    }

    try {
        const response = await axios.post(`http://www.sm-project-refrigerator.store/api/food/${refrigeratorld}`, data, {headers});
        console.log(response.data);
        
  
    } catch (error) {
        console.error(error);
    }
   
  }
  


  return (
    <SafeAreaView style={styles.container}>
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
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

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
    includeFontPadding: false,
    //fontFamily: 'NotoSansKR-Bold',
    marginTop: 70,
    marginBottom: 50,
    marginRight: 190,
    color: 'black',
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
    includeFontPadding: false,
    //fontFamily: 'NotoSansKR-Regular',
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
    fontSize: 16,
    includeFontPadding: false,
    //fontFamily: 'NotoSansKR-Regular',
    color: '#000000',
  },
  labelText: {
    fontSize: 16,
    marginBottom: 5,
    includeFontPadding: false,
    //fontFamily: 'NotoSansKR-Regular',
    color: '#000000',
  },
  quantityContainer: {
    borderWidth: 1,
    borderColor: '#3873EA',
    borderRadius: 5,
    padding: 10,
    marginTop: 30,
    width: '90%',
  },
  quantityInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityInput: {
    borderWidth: 1,
    borderColor: '#3873EA',
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
    width: 50,
    textAlign: 'center',
    includeFontPadding: false,
    //fontFamily: 'NotoSansKR-Regular',
    color: '#000000',
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
export default Screen2;
