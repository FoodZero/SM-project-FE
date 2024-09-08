import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

const SharingPeople = ({ navigation }) => {
  const [inputText, setInputText] = useState('');
  const [peopleList, setPeopleList] = useState([
    { id: 1, name: '닉네임1', selected: false },
    { id: 2, name: '닉네임2', selected: false },
    { id: 3, name: '닉네임3', selected: false },
    { id: 4, name: '닉네임4', selected: false },
    { id: 5, name: '닉네임5', selected: false },
  ]);

  // Function to toggle selection of a person
  const toggleSelect = (id) => {
    const updatedList = peopleList.map(person =>
      person.id === id ? { ...person, selected: !person.selected } : person
    );
    setPeopleList(updatedList);
  };

  // Function to handle filtering by name
  const handleFilter = (text) => {
    setInputText(text);
    const filtered = peopleList.filter(person =>
      person.name.toLowerCase().includes(text.toLowerCase())
    );
    setPeopleList(filtered);
  };

  // Function to handle deletion of selected items
  const deleteSelected = () => {
    const updatedList = peopleList.filter(person => !person.selected);
    setPeopleList(updatedList);
    Alert.alert('알림', '선택된 항목이 삭제되었습니다.');
  };

  // Function to navigate back to the previous screen
  const handleFinish = () => {
    navigation.navigate("HomeMain");
  };

  // Render item function for FlatList
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <TouchableOpacity onPress={() => toggleSelect(item.id)}>
        <MaterialCommunityIcons name={item.selected ? 'checkbox-marked-circle': 'checkbox-blank-circle-outline'} size={24} color='#3873EA' />
      </TouchableOpacity>
      <Text style={styles.name}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.closeButton} onPress={handleFinish}>
        <AntDesign name="close" size={30} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>공유인원</Text>
      <TextInput
        style={styles.input}
        placeholder="닉네임을 검색하세요"
        onChangeText={handleFilter}
        value={inputText}
      />
      <FlatList
        data={peopleList}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        style={styles.list}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.deleteButton} onPress={deleteSelected}>
          <Text style={[styles.buttonText, { color: '#3873EA' }]}>삭제</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.finishButton} onPress={handleFinish}>
          <Text style={[styles.buttonText, { color: '#3873EA' }]}>완료</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
    borderRadius: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  name: {
    marginLeft: 10,
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  deleteButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: 50,
    paddingVertical: 20,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#3873EA',
  },
  finishButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: 50,
    paddingVertical: 18,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#3873EA',
  },
  buttonText: {
    fontSize: 18,
  },
});

export default SharingPeople;