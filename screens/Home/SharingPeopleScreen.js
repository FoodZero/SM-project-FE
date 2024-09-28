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
      person.id === id ? { ...person, selected: !person.selected } : person
    );
    setPeopleList(updatedList);
  };

  // 이름으로 필터링 함수
  const handleFilter = (text) => {
    setInputText(text);
    const filtered = peopleList.filter((person) =>
      person.name.toLowerCase().includes(text.toLowerCase())
    );
    setPeopleList(filtered);
  };

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
      <Text style={styles.name}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={{flexDirection:'row', marginTop: BasicHeight*12}}>
        <Text style={styles.title}>공유인원</Text>
        <TouchableOpacity onPress={handleFinish}>
          <X />
        </TouchableOpacity>
      </View>
      
      <TextInput
        style={styles.input}
        placeholder="닉네임을 검색하세요"
        onChangeText={handleFilter}
        value={inputText}
      />
      <FlatList
        data={peopleList}
        renderItem={renderItem}
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
  },
});

export default SharingPeople;