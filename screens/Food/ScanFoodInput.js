import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  FlatList,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Detail from '../../assets/Icons/DetailGo.svg';
import DeleteOff from '../../assets/Icons/DeleteOff.svg'; // DeleteOff icon
import Back from '../../assets/Icons/back.svg';
import IngredientAdd from '../../assets/Icons/IngredientAdd.svg';

const ScanFoodInput = ({ route }) => {
  const navigation = useNavigation();
  const foodList = route?.params?.ingredientNames || [];
  const [ingredientNames, setIngredientNames] = useState(foodList);

  const handleIngredientNameChange = (index, value) => {
    const newIngredientNames = [...ingredientNames];
    newIngredientNames[index] = value;
    setIngredientNames(newIngredientNames);
  };

  const handlePress = (ingredientText) => {
    // 버튼이 눌렸을 때 수행할 작업을 여기에 작성하세요
    navigation.navigate('FoodInputDetail', { ingredient: ingredientText}); 
  };


  const handleDelete = (index) => {
    const newIngredientNames = ingredientNames.filter((_, i) => i !== index); // Remove item at index
    setIngredientNames(newIngredientNames);
  };

  const NextPage = () => {
    navigation.navigate('FoodInput', { ingredient: ingredientNames });
  };

  const GotoIngredientPage = async () => {
    try {
      const id = await AsyncStorage.getItem('userRefId');
      const name = await AsyncStorage.getItem('userRefName');
      
      if (id && name) {
        // navigation.reset으로 스택을 리셋하면서 IngredientScreen으로 바로 이동
        navigation.reset({
          routes: [
            { name: '홈', params: { screen: 'Ingredient', params: { Id: id, Name: name } } } // 두 번째 화면을 'Ingredient'로 설정
          ],
        });
      } else {
        console.error('id나 name 값이 비어 있습니다.');
      }
    } catch (error) {
      console.error('Error fetching from AsyncStorage:', error);
    }
  };
  
  

  return (
    <SafeAreaView style={styles.Container}>
      <ScrollView style={styles.Scroll}>
        <View style={styles.Header}>
          <Back/>
          <TouchableOpacity style={styles.saveButton} onPress={()=>NextPage}>
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
                onPress={()=>handlePress(name)} // Permanently delete the item
              >
                <Detail />
              </TouchableOpacity>
            </View>
          ))}
        </View>
        <TouchableOpacity style={styles.addButton} onPress={() => setIngredientNames([...ingredientNames, ''])}>
          <IngredientAdd/>
          <Text style={styles.addButtonText}>항목 추가하기</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.ReceiptScanButton} onPress={() => GotoIngredientPage()}>
          <Text style={styles.ReceiptScanButtonText}>저장</Text>
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
    marginTop: BasicHeight*13,
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
    marginBottom: 10,
    includeFontPadding: false,
    fontFamily: 'NotoSansKR-Regular',
  },
});


export default ScanFoodInput;
