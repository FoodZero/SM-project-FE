import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView } from 'react-native';
import { AntDesign, Octicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';

const AddIngredient = () => {
  const [ingredientNames, setIngredientNames] = useState(['']); // Initial array with one empty string
  const [errorMessage, setErrorMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false); // State to track editing mode
  const navigation = useNavigation();  
  const route = useRoute();
  const [text, setText] = useState('');
  const AccessToken = route.params?.AccessToken;
  const refrigeratorId = route.params?.refrigeratorId;

  const handlePress = (ingredientText) => {
    console.log('입력된 텍스트:', ingredientText);
    handleAddItem(ingredientText)
  };

  const handleAddItem = (ingredientText) => {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const name = `${ingredientText}`;
    const expire = `${year}-${month}-${day}`;
    const foodType = "COLD";

    // Adding arbitrary data
    AddFoodData(name, expire, foodType);
  };

  const AddFoodData = async (name, expire, foodType) => {
    const headers = {
      Authorization: `Bearer ${AccessToken}`,
      'Content-Type': 'application/json'
    };
    const data = {
      name: name,
      expire: expire,
      count: 1,
      foodType: foodType,
    };
    console.log(data);
    try {
      const response = await axios.post(`http://www.sm-project-refrigerator.store/api/food/${refrigeratorId}`, data, { headers });
      console.log(response.data);
      //GetFoodData(); // Refresh data after adding new food item
    } catch (error) {
       console.error(error);
    }
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
    navigation.navigate('Ingredient', { AccessToken:AccessToken, id:refrigeratorId}); 

  };

  const handleAddIngredient = () => {
    setIngredientNames([...ingredientNames, '']);
  };

  const handleDeleteIngredient = (index) => {
    const newIngredientNames = ingredientNames.filter((_, i) => i !== index);
    setIngredientNames(newIngredientNames);
  };

  const handleClose = () => {
    console.log('Closing the screen...');
    navigation.navigate("Ingredient", { AccessToken: AccessToken,id:refrigeratorId });
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

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.headerText}>재료 추가</Text>
        
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleClose}>
          <AntDesign name="left" size={25} color="black" />
        </TouchableOpacity>

        {/* Save Button */}
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}>
          <Text style={styles.saveButtonText}>완료</Text>
        </TouchableOpacity>

        {/* Edit / Done Button */}
        <TouchableOpacity
          style={styles.editButton}
          onPress={toggleEditMode}>
          <Text style={styles.editButtonText}>{isEditing ? '완료' : '편집'}</Text>
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
            
            {/* Show delete button if in edit mode */}
            {isEditing ? (
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteIngredient(index)}>
                <Text style={styles.deleteButtonText}>삭제</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.inputButton} onPress={() => handlePress(name)}>
                <Text style={styles.inputButtonText}>   저장</Text>
              </TouchableOpacity>
            )}
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
  saveButtonText: {
    fontSize: 15,
  },
  label: {
    marginBottom: 10,
    fontSize: 18,
    marginRight: 240,
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
    borderWidth: 2,
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
  deleteButton: {
    marginLeft: 10,
    backgroundColor: 'red',
    borderRadius: 15,
    padding: 10,
    width: '30%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 18,
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
  editButton: {
    position: 'absolute',
    right: 60,
    top: 10,
  },
  editButtonText: {
    fontSize: 15,
    color: 'blue',
  },
});

export default AddIngredient;