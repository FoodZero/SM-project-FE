import React, {useEffect, useState, useRef, useCallback} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  Image,
  
} from 'react-native';
import {Camera, useCameraDevice} from 'react-native-vision-camera';
import RNFS from "react-native-fs";
import { PERMISSIONS, request } from "react-native-permissions";
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute} from '@react-navigation/native';
import useTabBarVisibility from '../useTabBarVisibility';

import CameraOn from '../../assets/Icons/CameraOn.svg';
import CameraOff from '../../assets/Icons/CameraOff.svg';
import GalleryOn from '../../assets/Icons/GalleryOn.svg';
import GalleryOff from '../../assets/Icons/GalleryOff.svg';
import Scan from '../../assets/Icons/Scan.svg';

const CameraScreen = () => {
  useTabBarVisibility(false);
  const navigation = useNavigation();  
  const [cameraPosition, setCameraPosition] = useState('back');
  const [showCamera, setShowCamera] = useState(true);
  const [showGallery, setShowGallery] = useState(false);
  const [activeIcon, setActiveIcon] = useState('camera'); // 아이콘 상태 추가
  const [imageSource, setImageSource] = useState('');
  const [Filepath, setFilepath] = useState('');
  const devices = useCameraDevice(cameraPosition);
  const camera = useRef(null);
  const [loading, setLoading] = useState(false);

  // 카메라 권한 및 파일 접근 권한 요청
  useEffect(() => {
    async function getPermission() {
      const newCameraPermission = await Camera.requestCameraPermission();
      const readPermission = Platform.OS === 'ios' ? await request(PERMISSIONS.IOS.PHOTO_LIBRARY) : await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
      const writePermission = Platform.OS === 'ios' ? await request(PERMISSIONS.IOS.PHOTO_LIBRARY) : await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
      
      console.log(newCameraPermission);
      console.log(readPermission);
      console.log(writePermission);
    }
    getPermission();
    setShowCamera(true);
  }, []);

  // 사진 촬영 함수
  const capturePhoto = async () => {
    if (!camera.current) return;
    const photo = await camera.current.takePhoto({});
    console.log(photo);
    setImageSource(photo.path);
    setShowCamera(false);
    await CameraRoll.save(`file://${photo.path}`, {
      type: 'Photos',
      MimeTypes: 'image/jpeg',
    });
    
    const fileName = photo.path.split('mrousavy-')[1];
    const newPath = `file://${RNFS.PicturesDirectoryPath}/${fileName}`;
    await RNFS.moveFile(photo.path, newPath);
    console.log(newPath);
    setFilepath(newPath);
    uploadPhoto(newPath);
  };

  // 사진 서버 업로드 함수
  const uploadPhoto = async (photoUri) => {
    if (loading) return;
    setLoading(true);
    try {
      const TOKEN = await AsyncStorage.getItem('userAccessToken');

      const image = {
        uri: photoUri,
        type: 'image/jpeg',
        name: 'receipt',
      };
      const formData = new FormData();
      formData.append('receipt', image);

      const headers = {
        "Content-Type": 'multipart/form-data',
        Authorization: `Bearer ${TOKEN}`,
      };

      console.log('Image:', formData);

      const response = await axios.post('http://www.sm-project-refrigerator.store/api/food/receipt', formData, { headers: headers });

      console.log('Response:', response.data.result);
      const foodList = response.data.result.foodList || [];
      console.log('foodList:', foodList);
      if (response.status == 200) {
        navigation.navigate("ScanFoodCheck", { foodList });
      }

    } catch (error) {
      console.error('Error uploading photo:', error);
    } finally {
      setLoading(false);
    }
  };

  // 갤러리에서 사진 선택 함수
  const selectPhotoFromGallery = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
    });
    if (result.didCancel) {
      return null;
    }
    const localUri = result.assets[0].uri;
    const uriPath = localUri.split("//").pop();
    const imageName = localUri.split("/").pop();
    console.log('path:', uriPath);
    console.log('name:', imageName);
    uploadPhoto("file://" + uriPath);
  };

  // 아이콘 상태를 변경하는 함수
  const toggleCameraGallery = (iconType) => {
    if (iconType === 'camera') {
      setShowCamera(true);
      setActiveIcon('camera'); // 카메라 아이콘 활성화
    } else {
      setShowCamera(false);
      setActiveIcon('gallery'); // 갤러리 아이콘 활성화
      selectPhotoFromGallery(); // 갤러리 열기
    }
  };

  if (devices == null) {
    return <Text>Camera not available</Text>;
  }

  return (
    <View style={styles.container}>
      {showCamera ? (
        <>
          <Camera
            ref={camera}
            style={styles.cam}
            device={devices}
            isActive={showCamera}
            photo={true}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.camButton}
              onPress={() => capturePhoto()}
            >
              <Scan />
            </TouchableOpacity>
          </View>

          <View style={styles.selectContainer}>
            {/* 갤러리 아이콘 */}
            <TouchableOpacity onPress={() => toggleCameraGallery('gallery')}>
              {activeIcon === 'gallery' ? (
                <GalleryOn /> // 갤러리 아이콘 활성화
              ) : (
                <GalleryOff /> // 갤러리 아이콘 비활성화
              )}
              <Text style={activeIcon === 'gallery' ? styles.activeText : styles.text}>
                앨범
              </Text>
            </TouchableOpacity>

            {/* 카메라 아이콘 */}
            <TouchableOpacity onPress={() => toggleCameraGallery('camera')}>
              {activeIcon === 'camera' ? (
                <CameraOn /> // 카메라 아이콘 활성화
              ) : (
                <CameraOff /> // 카메라 아이콘 비활성화
              )}
              <Text style={activeIcon === 'camera' ? styles.activeText : styles.text}>
                카메라
              </Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
            <>
              <Image
                style={styles.cam}
                source={{
                  uri: `file://${imageSource}`,
                }}
              />
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.camButton}>
                  <Scan />
                </TouchableOpacity>
              </View>

              <View style={styles.selectContainer}>
                <TouchableOpacity onPress={() => selectPhotoFromGallery()}>
                  <GalleryOff />
                  <Text style={styles.text}>앨범</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setShowCamera(true)}>
                  <CameraOn />
                  <Text style={[styles.text, { color: '#3873EA' }]}>카메라</Text>
                </TouchableOpacity>
              </View>
            </>
      )}  
    </View>
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
    width: AllWidth,
    height: AllHeight,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  buttonContainer: {
    backgroundColor: 'black',
    position: 'absolute',
    alignItems: 'center',
    width: '100%',
    height: 246,
    bottom: 0,
  },
  selectContainer: {
    backgroundColor: 'black',
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    bottom: 60,
  },
  text: {
    color: 'white',
    fontFamily: 'NotoSansKR-Bold',
  },
  activeText: {
    color: '#3873EA',
    fontFamily: 'NotoSansKR-Bold',
  },
  cam: {
    height: BasicHeight * 505,
    width: AllWidth,
    bottom: 100,
  },
  camButton: {
    height: BasicHeight * 60,
    width: BasicWidth * 60,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
});

export default CameraScreen;
