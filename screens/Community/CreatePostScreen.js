import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert, ScrollView,Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const CreatePostScreen = () => {
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [pickerVisible, setPickerVisible] = useState(false);
  const route = useRoute();
  const navigation = useNavigation();
  const { address } = route.params;

  const togglePicker = () => {
    setPickerVisible(!pickerVisible);
  };

  const close = () => {
    navigation.navigate('CommunityScreen');
  };

  const handleSubmit = async () => {
    if (!content) {
      showToast('내용을 입력하세요')
      return;
    }
    else if (!title) {
      showToast('제목을 입력하세요')
    }
    else if (!category) {
      showToast('분류를 선택해주세요')
    }
    else{
      try {
        const AccessToken = await AsyncStorage.getItem('userAccessToken');
        const data ={
          title: title,
          content: content,
          topic: category,
          address: address,
        }
        console.log(data);
        const response = await axios.post(
          `http://www.sm-project-refrigerator.store/api/post/create`,
          data,
          {
            headers: {  // 'headers' 속성으로 지정해야 합니다.
              'Authorization': `Bearer ${AccessToken}`,
              'Content-Type': 'application/json',
            },
          }
        );
        
        
        if (response.status === 200 || response.status === 201) {
          Alert.alert('Success', 'Post created successfully!');
          navigation.reset({
            index: 1, // 두 번째 화면이 포커스되도록 설정
            routes: [
                { name: '커뮤니티' }, // Top2 스택을 초기화하여 '레시피'의 초기 화면으로 만듦
                { name: '커뮤니티', params: { screen: 'CommunityScreen'} }
            ],
        });
          navigation.navigate('CommunityScreen');
        } else {
          console.error('Error creating post:', response.data);
          showToast('Error');
        }
      } catch (error) {
        if (error.response) {
          console.error('Error creating post:', error.response.data);
          showToast('Error');
        } else {
          console.error('Error creating post:', error.message);
          showToast('Error');
        }
      }
    }
  };
  const toastConfig = {
    'bookmark': ({ text1 }) => (
      <View style={styles.toastContainer}>
        <Text style={{color:"#FFFFFF"}}>{text1}</Text> 
      </View>
    ),
  };

  const showToast = (text) => {
    Toast.show({
      type: 'bookmark',
      position: 'bottom',
      bottomOffset: BasicHeight*202,
      text1: text,  // text1으로 텍스트 전달
      visibilityTime: 2000,
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeButton} onPress={close}>
          <Icon name="close-outline" size={30} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>글쓰기</Text>
        <TouchableOpacity style={styles.doneButton} onPress={handleSubmit}>
          <Text style={styles.doneButtonText}>완료</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.form}>
        <View style={styles.formRow}>
          <Text style={styles.label}>분류</Text>
          <TouchableOpacity style={styles.inputContainer} onPress={togglePicker}>
            <Text style={styles.selectedCategory}>{category || '선택하세요'}</Text>
            <Icon name="chevron-down-outline" size={20} style={styles.dropdownIcon} />
          </TouchableOpacity>
          {pickerVisible && (
            <Picker
              selectedValue={category}
              style={styles.picker}
              itemStyle={styles.pickerItem}
              onValueChange={(itemValue) => {
                setCategory(itemValue);
                setPickerVisible(false);
              }}
            >
              <Picker.Item label="나눔" value="나눔" />
              <Picker.Item label="레시피" value="레시피" />
            </Picker>
          )}
        </View>
        <View style={styles.formRow}>
          <Text style={styles.label}>제목</Text>
          <TextInput
            style={styles.input}
            placeholder="제목을 입력하세요."
            value={title}
            onChangeText={setTitle}
          />
        </View>
        <TextInput
          style={styles.textarea}
          placeholder="내용을 입력하세요."
          multiline={true}
          numberOfLines={4}
          value={content}
          onChangeText={setContent}
        />
        <Toast config={toastConfig}/>
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
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
  },
  closeButton: {
    padding: 10,
  },
  headerTitle: {
    fontSize: 19,
    includeFontPadding: false,
    fontFamily: 'NotoSansKR-Bold',
    color: '#000000',
  },
  doneButton: {
    height: BasicHeight*35,
    width:BasicWidth* 65,
    backgroundColor: '#F26D228F',
    borderRadius: 25,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  doneButtonText: {
    fontSize: 15,
    includeFontPadding: false,
    fontFamily: 'NotoSansKR-Light',
    color: '#000000',
  },
  form: {
    padding: 20,
  },
  formRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    width: 60,
    fontSize: 16,
    includeFontPadding: false,
    fontFamily: 'NotoSansKR-Regular',
    color: '#000000',
  },
  inputContainer: {
    flex: 1,
    height: 40,
    borderColor: '#DDDDDD',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedCategory: {
    flex: 1,
  },
  dropdownIcon: {
    marginLeft: 'auto',
  },
  picker: {
    position: 'absolute',
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderColor: '#DDDDDD',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 40,
    zIndex: 1,
  },
  pickerItem: {
    fontSize: 16,
    height: 80,
    color: 'black',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#DDDDDD',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 15,
    includeFontPadding: false,
    fontFamily: 'NotoSansKR-Light',
  },
  textarea: {
    height: 300,
    borderColor: '#DDDDDD',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    textAlignVertical: 'top',
    fontSize: 15,
    includeFontPadding: false,
    fontFamily: 'NotoSansKR-Light',
  },
  toastContainer: {
    backgroundColor: '#AFAFAF',
    height: BasicHeight * 39,
    width: BasicWidth * 190,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CreatePostScreen;
