import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet, Image } from 'react-native';
import { Fontisto, MaterialIcons, Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const HomeScreen = ({ route, navigation }) => {
  const AccessToken = route.params?.AccessToken;
  
  // Log AccessToken to ensure it's being passed correctly
  console.log('AccessToken:', AccessToken);

  // Local state for refrigerators
  const [refrigerators, setRefrigerators] = useState([]);

  // useEffect to fetch initial refrigerators data
  useEffect(() => {
    // Fetch refrigerators data when AccessToken changes
    if (AccessToken) {
      fetchRefrigerators();
    }
  }, [AccessToken]);

  // Function to fetch refrigerators data (simulated API call)
  const fetchRefrigerators = async () => {
    // Check if AccessToken is valid
    if (!AccessToken) {
      console.error('Error fetching refrigerators: AccessToken is missing or invalid');
      console.log(AccessToken);
      return;
    }

    const headers = {
      Authorization: `Bearer ${AccessToken}`,
      Accept: 'application/json'
    };

    try {
      const response = await axios.get('http://www.sm-project-refrigerator.store/api/refrigerator', { headers });
      // Extracting refrigerators data from API response
      console.log('API response:', response.data);
      const refrigeratorsData = response.data.result.refrigeratorList;
      setRefrigerators(refrigeratorsData); // Setting refrigerators state
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 200 range
        console.error('Error fetching refrigerators:', error.response.data);
      } else if (error.request) {
        // Request was made but no response was received
        console.error('Error fetching refrigerators:', error.request);
      } else {
        // Something happened in setting up the request
        console.error('Error fetching refrigerators:', error.message);
      }
    }
  };

  // Function to add a refrigerator
  const addRefrigerator = async () => {
    try {
      const newId = refrigerators.length ? refrigerators[refrigerators.length - 1].id + 1 : 1;
      const data = {
        name: `냉장고 ${newId}`
      };
      const headers = {
        Authorization: `Bearer ${AccessToken}`
      };
      // Simulated API response
      const response = await axios.post('http://www.sm-project-refrigerator.store/api/refrigerator', data, { headers });
      // Update local state after successful API call
      setRefrigerators([...refrigerators, { id: newId, name: data.name }]);
      console.log('API response:', response.data);
    } catch (error) {
      console.error('Error adding refrigerator:', error);
    }
  };

  // Function to delete a refrigerator
  const deleteRefrigerator = async (id) => {
    setRefrigerators(refrigerators.filter(fridge => fridge.id !== id));
    try {
      const headers = {
        Authorization: `Bearer ${AccessToken}`,
      };
      // Simulated API response
      await axios.delete(`http://www.sm-project-refrigerator.store/api/refrigerator/${id}`, { headers });
      // Update local state after successful API call
      
    } catch (error) {
      console.error('Error deleting refrigerator:', error);
    }
  };

  // Function to handle deletion confirmation
  const handleDelete = (id) => {
    Alert.alert(
      '삭제 확인',
      '정말 이 냉장고를 삭제하시겠습니까?',
      [
        { text: '취소', style: 'cancel' },
        { text: '삭제', onPress: () => deleteRefrigerator(id), style: 'destructive' },
      ],
      { cancelable: true }
    );
  };

  // Function to handle image press navigation
  const handleImagePress = (id) => {
    // Navigation parameters should be passed as an object
    navigation.navigate("Ingredient", { id: id, AccessToken: AccessToken });
  };

  // Function to handle sharing alert
  const showSharingAlert = () => {
    Alert.alert(
      '공유 옵션',
      null,
      [
        { text: '취소', style: 'cancel' },
        { text: '공유인원 보기', onPress: () => handleShowSharing(), style: 'default' }, // Changed to call handleShowSharing
        {
          text: '이메일로 초대하기',
          onPress: handleInviteByEmail,
          style: 'default',
        },
      ],
      { cancelable: true }
    );
  };

  // Function to handle showing sharing screen
  const handleShowSharing = () => {
    navigation.navigate('SharingPeople', { screen: 'SharingPeople' });
  };

  // Function to handle inviting by email
  const handleInviteByEmail = () => {
    Alert.prompt(
      '초대할 친구의 이메일 주소를 입력해주세요.',
      null,
      [
        {
          text: '취소',
          style: 'cancel',
        },
        {
          text: '확인',
          onPress: (email) => {
            if (email) {
              // Handle sending invitation via email (e.g., send API request)
              Alert.alert('이메일 전송', `이메일 ${email}로 초대를 전송했습니다.`);
            }
          },
        },
      ],
      'plain-text' // Optional input type, can be 'plain-text', 'secure-text', or 'login-password'
    );
  };

  // useLayoutEffect to set header left button
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => Alert.alert('알림', '벨 아이콘을 클릭했습니다.')}>
          <Fontisto name="bell" size={30} color="black" style={{ marginLeft: 15 }} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  // useLayoutEffect to set header right button
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={showSharingAlert}>
          <MaterialIcons name="people-alt" size={30} color="black" style={{ marginRight: 15 }} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  // Rendering the component
  return (
    <View style={styles.container}>
      <FlatList
        data={refrigerators}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        renderItem={({ item }) => (
          <View style={styles.refrigerator}>
            <Text style={styles.refrigeratorName}>{item.name}</Text>
            <TouchableOpacity onPress={() => handleImagePress(item.id)}>
              <Image
                source={require('../assets/refrigerator.png')} // Ensure this path is correct
                style={styles.refrigeratorImage}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDelete(item.id)}>
              <Text style={styles.deleteButton}>삭제</Text>
            </TouchableOpacity>
          </View>
        )}
        ListFooterComponent={
          <TouchableOpacity onPress={addRefrigerator}>
            <Ionicons name="add-circle" size={100} color="black" style={{ marginLeft: 80, marginTop: 200 }} />
          </TouchableOpacity>
        }
      />
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  refrigerator: {
    padding: 20,
    margin: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    alignItems: 'center',
  },
  refrigeratorName: {
    fontSize: 30, // Increased the font size of the refrigerator name
    marginBottom: 10,
  },
  refrigeratorImage: {
    width: 265, // Set the desired width
    height: 420, // Set the desired height
    marginBottom: 10,
  },
  deleteButton: {
    color: 'red',
    fontSize: 18, // Increased the font size of the delete button
    marginTop: 10,
  },
});

// Exporting the component as default
export default HomeScreen;