import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { launchCameraAsync, launchImageLibraryAsync, useCameraPermissions, PermissionStatus } from 'expo-image-picker';
import ActionSheet from 'react-native-actionsheet';
import * as FileSystem from 'expo-file-system'; // For handling file access

const CreatePostScreen = () => {
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [pickerVisible, setPickerVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [cameraPermissionInformation, requestPermission] = useCameraPermissions();
  const route = useRoute();
  const navigation = useNavigation();
  const { AccessToken, address } = route.params;
  let actionSheet = null;
  const togglePicker = () => {
    setPickerVisible(!pickerVisible);
  };

  const close = () => {
    navigation.navigate('CommunityScreen', { AccessToken });
  };

  const verifyPermissions = async () => {
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }
    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert('Insufficient Permissions!', 'You need to grant camera permissions to use this app.');
      return false;
    }
    return true;
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    actionSheet.show();
  };

  const pickImageFromCamera = async () => {
    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    if (!image.canceled) {
      const imageUri = image.assets[0].uri;
      console.log('Selected Image URI from Camera:', imageUri);
      setSelectedImage(imageUri);
    }
  };

  const pickImageFromGallery = async () => {
    const image = await launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    if (!image.canceled) {
      const imageUri = image.assets[0].uri;
      console.log('Selected Image URI from Gallery:', imageUri);
      setSelectedImage(imageUri);
    }
  };

  // const handleSubmit = async () => {
  //   try {
  //     // 필수 입력 필드 확인
  //     if (!category || !title || !content || !address) {
  //       Alert.alert('Error', 'All fields are required!');
  //       return;
  //     }
  
  //     // Create request object (will be converted to JSON inside FormData)
  //     const data = {
  //       title: title,
  //       content: content,
  //       topic: category, // 나눔, 레시피 중 선택
  //       address: address, // 위치 조회 결과의 주소 입력
  //     };
  
  //     // // Initialize FormData
  //     // const formData = new FormData();
      
  //     // // Append the request JSON object as a string
  //     // formData.append('request', JSON.stringify(request));
  
  //     // // 이미지 파일 배열 추가 (있을 경우)
  //     // if (selectedImage) {
  //     //   const imageInfo = await FileSystem.getInfoAsync(selectedImage); // Get image file info
  
  //     //   if (!imageInfo.exists) {
  //     //     throw new Error('Selected image does not exist.');
  //     //   }
  
  //     //   const imageFile = {
  //     //     uri: selectedImage,
  //     //     type: 'image/jpeg', // Adjust if needed
  //     //     name: selectedImage.split('/').pop() || 'image.jpg',
  //     //   };
  
  //     //   formData.append('images', imageFile); // Append the image file to formData
  //     // }
  
  //     const headers = {
  //       Authorization: `Bearer ${AccessToken}`,
        
  //     };
  
  //     // Axios POST 요청
  //     const response = await axios.post(
  //       'http://www.sm-project-refrigerator.store/api/post/create',
  //       data,
  //       { headers }
  //     );
  
  //     console.log('Server response:', response.data);
  //     if (response.status !== 200) {
  //       Alert.alert('Error', response.data.message || 'Something went wrong!');
  //       return;
  //     }
  
  //     Alert.alert('Success', 'Post created successfully!');
  //     navigation.navigate('CommunityScreen', { AccessToken });
  //   } catch (error) {
  //     console.error('Error creating post:', error);
  //     Alert.alert('Error', 'Failed to create post. Please try again later.');
  //   }
  // };


  const handleSubmit = async () => {
    if (!category || !title || !content || !address) {
      Alert.alert('Error', 'All fields are required!');
      return;
    }
  
    // Log the address before sending
    console.log("Address being sent:", address);
  
    const headers = {
      Authorization: `Bearer ${AccessToken}`,
      'Content-Type': 'application/json',
    };
  
    const data = {
      title: title,
      content: content,
      topic: category,
      address: address,
    };
  
    try {
      const response = await axios.post(
        `http://www.sm-project-refrigerator.store/api/post/create`,
        data,
        { headers }
      );
      
      if (response.status === 200) {
        Alert.alert('Success', 'Post created successfully!');
        navigation.navigate('CommunityScreen', { AccessToken });
      } else {
        console.error('Error creating post:', response.data);
        Alert.alert('Error', 'Something went wrong while creating the post.');
      }
    } catch (error) {
      console.error('Error creating post:', error.response ? error.response.data : error.message);
      Alert.alert('Error', 'Failed to create post. Please try again later.');
    }
  };

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
        {selectedImage && (
          <View style={styles.imagePreview}>
            <Image source={{ uri: selectedImage }} style={styles.image} />
          </View>
        )}
        <TouchableOpacity style={styles.cameraButton} onPress={takeImageHandler}>
          <Icon name="camera-outline" size={30} color="#007AFF" />
        </TouchableOpacity>
        <ActionSheet
          ref={o => (actionSheet = o)}
          title={'Select Image'}
          options={['Take Photo', 'Choose from Gallery', 'Cancel']}
          cancelButtonIndex={2}
          destructiveButtonIndex={2}
          onPress={index => {
            if (index === 0) {
              pickImageFromCamera();
            } else if (index === 1) {
              pickImageFromGallery();
            }
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

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
    fontSize: 20,
    fontWeight: 'bold',
  },
  doneButton: {
    padding: 10,
    backgroundColor: '#FFA500',
    borderRadius: 5,
  },
  doneButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
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
  },
  textarea: {
    height: 300,
    borderColor: '#DDDDDD',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    textAlignVertical: 'top',
  },
  cameraButton: {
    marginTop: 20,
    alignSelf: 'flex-end',
  },
  imagePreview: {
    width: '100%',
    height: 300,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc',
    borderRadius: 4,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default CreatePostScreen;