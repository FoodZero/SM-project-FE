import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios'; // axios import 추가

const SharingPeople = ({ navigation, route }) => {
  const { AccessToken, refrigeratorId } = route.params;

  const [inputText, setInputText] = useState('');
  const [peopleList, setPeopleList] = useState([]);

  // 데이터 패칭 함수
  const GetUserData = async () => {
    const headers = {
      Authorization: `Bearer ${AccessToken}`,
    };
  
    try {
      const response = await axios.get(
        `http://www.sm-project-refrigerator.store/api/share/${refrigeratorId}`,
        { headers }
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

  // 선택된 사용자를 삭제하는 함수
  const DeleteUserData = async (id) => {
    const headers = {
      Authorization: `Bearer ${AccessToken}`,
      'Content-Type': 'application/json'
    };
  
    try {
      const response = await axios.delete(
        `http://www.sm-project-refrigerator.store/api/share/${refrigeratorId}/${id}`, 
        { headers }
      );
      console.log(response.data);
      // Update data after successful deletion
      GetUserData(); // 삭제 후 사용자 리스트 새로고침
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

  // 컴포넌트가 처음 렌더링될 때 사용자 데이터를 가져옴
  useEffect(() => {
    GetUserData();
  }, []);

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
    const selectedUsers = peopleList.filter((person) => person.selected);
    
    if (selectedUsers.length === 0) {
      Alert.alert('알림', '삭제할 사용자를 선택하세요.');
      return;
    }

    // 선택된 사용자들을 하나씩 삭제
    selectedUsers.forEach((user) => {
      DeleteUserData(user.id);
    });

    Alert.alert('알림', '선택된 사용자가 삭제되었습니다.');
  };

  // 완료 버튼을 눌렀을 때 이전 화면으로 돌아가는 함수
  const handleFinish = () => {
    navigation.navigate('Ingredient', { AccessToken: AccessToken, id: refrigeratorId });
  };

  // FlatList의 렌더링 아이템 함수
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <TouchableOpacity onPress={() => toggleSelect(item.id)}>
        <MaterialCommunityIcons
          name={item.selected ? 'checkbox-marked-circle' : 'checkbox-blank-circle-outline'}
          size={24}
          color="#3873EA"
        />
      </TouchableOpacity>
      <Text style={styles.name}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.closeButton} onPress={handleFinish}>
        <AntDesign name="close" size={33} color="black" />
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
        keyExtractor={(item) => item.id.toString()}
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