import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, TextInput , Button} from 'react-native';
import { AntDesign, Octicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native';
import { useNavigation, useRoute} from '@react-navigation/native';


const Screen1 = () => {
  const route = useRoute();
  const AccessToken = route.params?.AccessToken;
  const [ingredientNames, setIngredientNames] = useState(['']); // Initial array with one empty string
  const [errorMessage, setErrorMessage] = useState('');
  const navigation = useNavigation();  

    const [text, setText] = useState('');
  
    const handlePress = (ingredientText) => {
      // 버튼이 눌렸을 때 수행할 작업을 여기에 작성하세요
      console.log('입력된 텍스트:', ingredientText);
      console.log('AccessToken:', AccessToken );
      
      navigation.navigate('screen2', { ingredient: ingredientText, AccessToken: AccessToken  }); 
    };

  const handleSave = () => {
    if (ingredientNames.some(name => !name.trim())) {
      setErrorMessage('이름은 필수 항목입니다.');
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
      return;
    }
    // Your save logic here
    console.log('Ingredient Names:', ingredientNames);
  };

  const handleAddIngredient = () => {
    setIngredientNames([...ingredientNames, '']);
  };

  const handleClose = () => {
    // Add logic to close the screen, navigate back, or perform any other action
    console.log('Closing the screen...');
  };

  const handleReceiptScan = () => {
    console.log(`handleReceiptScan`);
    navigation.navigate('');
  };

  const handleIngredientNameChange = (index, value) => {
    const newIngredientNames = [...ingredientNames];
    newIngredientNames[index] = value;
    setIngredientNames(newIngredientNames);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.headerText}>재료 추가</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleClose}>
          <AntDesign name="left" size={25} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}>
          <Text style={styles.saveButtonText}>저장</Text>
        </TouchableOpacity>
        <Text style={styles.label}>이름*</Text>
        {ingredientNames.map((name, index) => (
          <View key={index} style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder=" "
              value={name}
              onChangeText={(text) => handleIngredientNameChange(index, text)}
            />
            <TouchableOpacity style={styles.inputButton} onPress={()=>handlePress(name)}>
              <Text style={styles.inputButtonText}>상세보기</Text>
            </TouchableOpacity>
          </View>
        ))}
        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
        <TouchableOpacity style={styles.addButton} onPress={handleAddIngredient}>
          <Text style={styles.addButtonText}><Octicons name="diff-added" size={25} color="black"/>   항목 추가하기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.ReceiptScanButton} onPress={handleReceiptScan}>
          <Text style={styles.ReceiptScanButtonText}>영수증 스캔하기</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 0,
    padding: 20,
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
    top: 10,
    right: 350,
  },
  saveButton: {
    position: 'absolute',
    right: 0,
    top: 10,
  },
  label: {
    marginBottom: 10,
    fontSize: 18,
    marginRight: 240,
  },
  saveButtonText: {
    fontSize: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    width: '95%',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E2E2E2',
    borderRadius: 15,
    padding: 10,
    height: 56,
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
  },
  addButton: {
    padding: 5,
    marginBottom: 20,
    marginTop: 20,
    marginLeft: 110,
  },
  addButtonText: {
    fontSize: 18,
    color: 'black',
  },
  ReceiptScanButton: {
    backgroundColor: '#3873EA',
    padding: 10,
    borderRadius: 0,
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
    marginTop: 40,
    height: 65,
  },
  ReceiptScanButtonText: {
    color: 'white',
    fontSize: 20,
    marginTop: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 10,
  },
});


export default Screen1;

