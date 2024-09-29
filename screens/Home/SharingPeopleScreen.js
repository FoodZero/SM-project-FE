<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
  Dimensions,

} from 'react-native';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios'; // axios import 추가
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeletePeople from './DeletePeople';

import X from '../../assets/Icons/X.svg';

const SharingPeople = ({ navigation, route }) => {


  const [inputText, setInputText] = useState('');
  const [peopleList, setPeopleList] = useState([]);
  const [isVisible, setModalVisible] = useState(false);

  // 데이터 패칭 함수
  const GetUserData = async () => {

    try {
      const AccessToken = await AsyncStorage.getItem('userAccessToken');
      const refrigeratorId = await AsyncStorage.getItem('userRefId');
      const response = await axios.get(
        `http://www.sm-project-refrigerator.store/api/share/${refrigeratorId}`,
        {headers: { Authorization: `Bearer ${AccessToken}` }}
      );
      
      console.log('response data:', response.data);
      
      // API 응답에서 데이터를 바로 가져옴
      const fetchedPeople = response.data.result.map((user, index) => ({
        id: user.id,
        name: user.nickname,
        selected: false,
      }));
      
      setPeopleList(fetchedPeople);
    } catch (error) {
      if (error.response) {
        console.log('Error response data:', error.response.data);
        console.log('Error response status:', error.response.status);
        console.log('Error response headers:', error.response.headers);
      } else if (error.request) {
        console.log('Error request:', error.request);
      } else {
        console.log('Error message:', error.message);
      }
      console.log('Error config:', error.config);
    }
  };

  const Press = () => {
    setModalVisible(true);
  };


  // 컴포넌트가 처음 렌더링될 때 사용자 데이터를 가져옴
  useEffect(() => {
    GetUserData();
  }, [peopleList]);

  // 선택 토글 함수
  const toggleSelect = (id) => {
    const updatedList = peopleList.map((person) =>
=======
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
>>>>>>> origin-flit/cli
      person.id === id ? { ...person, selected: !person.selected } : person
    );
    setPeopleList(updatedList);
  };

<<<<<<< HEAD
  // 이름으로 필터링 함수
  const handleFilter = (text) => {
    setInputText(text);
    const filtered = peopleList.filter((person) =>
=======
  // Function to handle filtering by name
  const handleFilter = (text) => {
    setInputText(text);
    const filtered = peopleList.filter(person =>
>>>>>>> origin-flit/cli
      person.name.toLowerCase().includes(text.toLowerCase())
    );
    setPeopleList(filtered);
  };

<<<<<<< HEAD
  // 선택된 항목 삭제 함수
  const deleteSelected = () => {
    setModalVisible(true);
  };

  // 완료 버튼을 눌렀을 때 이전 화면으로 돌아가는 함수
  const handleFinish = () => {
    navigation.navigate('HomeScreen');
  };

  // FlatList의 렌더링 아이템 함수
  const renderItem = ({ item }) => (
    <View style={styles.item}>
=======
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
>>>>>>> origin-flit/cli
      <Text style={styles.name}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
<<<<<<< HEAD
      <View style={{flexDirection:'row', marginTop: BasicHeight*12}}>
        <Text style={styles.title}>공유인원</Text>
        <TouchableOpacity onPress={handleFinish}>
          <X />
        </TouchableOpacity>
      </View>
      
=======
      <TouchableOpacity style={styles.closeButton} onPress={handleFinish}>
        <AntDesign name="close" size={30} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>공유인원</Text>
>>>>>>> origin-flit/cli
      <TextInput
        style={styles.input}
        placeholder="닉네임을 검색하세요"
        onChangeText={handleFilter}
        value={inputText}
      />
      <FlatList
        data={peopleList}
        renderItem={renderItem}
<<<<<<< HEAD
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
      />
      
      <TouchableOpacity
        style={[
          styles.deleteButton,
          { backgroundColor: isVisible ? '#FFFFFF' : '#3873EA'},{ borderColor: isVisible ? '#3873EA' : '#3873EA' } // Conditional color based on isVisible
        ]}
        onPress={deleteSelected}
      >
        <Text style={[styles.buttonText,{color: isVisible ? '#3873EA' :'#FFFFFF'}]}>이 냉장고 공유 해지하기</Text>
      </TouchableOpacity>
        <DeletePeople isVisible={isVisible} onClose={() => setModalVisible(false)} />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 16,
    fontFamily: 'NotoSansKR-Medium',
    includeFontPadding: false,
    marginLeft: BasicWidth*166,
    marginRight: BasicWidth*120,
    marginBottom: BasicHeight*25,
    color: '#000000',
  },
  input: {
    width: BasicWidth*330,
    height: BasicHeight*56,
    borderColor: '#E2E2E2',
    borderWidth: 1.5,
    borderRadius: 15,
    marginLeft: BasicWidth*30,
    paddingLeft: BasicWidth*17,
    marginBottom: BasicHeight*36,
  },
  item: {
    marginBottom: BasicHeight*25,
    marginLeft: BasicWidth*51,
  },
  name: {
    fontSize: 16,
    fontFamily: 'NotoSansKR-Regular',
    includeFontPadding: false,
    color: '#000000',
  },

  deleteButton: {
    width: BasicWidth*300,
    height: BasicHeight*55,
    marginLeft: BasicWidth*45,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: BasicHeight*29,
    borderColor: '#3873EA'
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'NotoSansKR-Medium',
    includeFontPadding: false,
=======
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
>>>>>>> origin-flit/cli
  },
});

export default SharingPeople;