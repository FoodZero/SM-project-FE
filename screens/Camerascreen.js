import React, {useEffect, useState, useRef, useCallback} from 'react';
import {
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
  Text,
  Linking,
  Image,
} from 'react-native';
import {Camera,  useCameraDevice,  useCameraDevices} from 'react-native-vision-camera';
import RNFS, { read } from "react-native-fs";
import { PERMISSIONS, RESULTS, request, requestMultiple, Permission, check } from "react-native-permissions";
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import * as ImagePicker from 'react-native-image-picker';
import axios from 'axios';
import { Platform } from 'react-native';
import { readFile } from 'react-native-fs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ICON from 'react-native-vector-icons/Ionicons';


const CameraScreen = () => {
  const [cameraPosition, setCameraPosition] = useState('back')
  const [showCamera, setShowCamera] = useState(true);
  const [imageSource, setImageSource] = useState('');
  const [Filepath, setFilepath] = useState('');
  const devices = useCameraDevice(cameraPosition);
  const camera = useRef(null);

  //카메라 화면 들어가자마자 권한 확인 및 기기(ios/android)확인
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
  }, []);

  //사진 찍기
  const capturePhoto = async () => {
    if (!camera.current) return;
      const photo = await camera.current.takePhoto({});
      console.log(photo);
      setImageSource(photo.path);
      setShowCamera(false);
      await CameraRoll.save(`file://${photo.path}`, {
        type: 'photo',
      })
      
      const fileName = photo.path.split('mrousavy-')[1];
      const newPath = `${RNFS.PicturesDirectoryPath}/${fileName}.jpg`;
      await RNFS.moveFile(photo.path, newPath);
      console.log(newPath);
      setFilepath(newPath);
      //찍은 사진으로 서버에 업로드
      uploadPhoto(newPath);

    };

    //사진 업로드
    const uploadPhoto = async (photoUri) => {
      try {
        const TOKEN = await AsyncStorage.getItem('userAccessToken');

        const base64Data = await readFile(photoUri, 'base64');

        const response = await fetch('http://www.sm-project-refrigerator.store/api/food/receipt', {
          method: 'POST',
          body: base64Data,
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        const responseText = await response.text();
        console.log('Server response:', responseText);
        
        if (!response.ok) {
          console.error('Server response:', response);
          return;
        }
    
        //const responseText = await response.text();
        //console.log('Server response:', responseText);
      } catch (error) {
        console.error('Error uploading photo', error);
      }
    };

/*
    import { readFile } from 'react-native-fs';

const loadImageBase64 = async (capturedImageURI) => {
  try {
    const base64Data = await readFile(capturedImageURI, 'base64');
    return 'data:image/jpeg;base64,' + base64Data;
  } catch (error) {
    console.error('Error converting image to base64:', error);
  }
};

const base64Image = await loadImageBase64(capturedImageURI);
axios({
    method: 'POST',
    url: 'https://example_api/endpoint',
    params: {
      api_key: 'YOUR_API_KEY'
    },
    data: base64Image,
    headers: {
      // define your headers
    }
  }).then(function (response) {
    console.log(response.data);
    return response.data;
  }).catch(function (error) {
    console.log(error.message);
    return null;
  });
*/
//기기 오류시 카메라 사용 불가
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
            <ICON name = "scan" size = {40} color = 'black'/>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          {imageSource !== '' ? (
            <Image
              style={styles.image}
              source={{
                uri: `file://'${imageSource}`,
              }}
            />
          ) : null}

          <View style={styles.backButton}>
            <TouchableOpacity
              style={{
                backgroundColor: 'rgba(0,0,0,0.2)',
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                borderWidth: 2,
                borderColor: '#fff',
                width: 100,
              }}
              onPress={() => setShowCamera(true)}>
              <Text style={{color: 'white', fontWeight: '500'}}>Back</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.buttons}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#fff',
                  padding: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: '#77c3ec',
                }}
                onPress={() => setShowCamera(true)}>
                <Text style={{color: '#77c3ec', fontWeight: '500'}}>
                  Retake
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={{
                  backgroundColor: '#77c3ec',
                  padding: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: 'white',
                }}
                onPress={() => setShowCamera(true)}>
                <Text style={{color: 'white', fontWeight: '500'}}>
                  Use Photo
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </View>
  );
}

export default CameraScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'gray',
  },
  backButton: {
    backgroundColor: 'rgba(0,0,0,0.0)',
    position: 'absolute',
    justifyContent: 'center',
    width: '100%',
    top: 0,
    padding: 20,
  },
  buttonContainer: {
    backgroundColor: 'black',
    position: 'absolute',
    //justifyContent: 'center',
    //alignItems: 'center',
    width: '100%',
    height: 246,
    bottom: 0,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cam: {
    height: 505,
    width: '100%',
    bottom: 100,
  },
  camButton: {
    height: 60,
    width: 60,
    borderRadius: 40,
    backgroundColor: '#3873EA',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 4,
    borderColor: '#3873EA',
  },
  image: {
    width: '100%',
    height: '100%',
    aspectRatio: 9 / 16,
  },
});
