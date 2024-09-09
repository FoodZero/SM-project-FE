import React, {useEffect, useState, useRef, useCallback} from 'react';
import {
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
  Text,
  Dimensions,
  Linking,
  Image,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ICON from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';


const CameraScreen = () => {
  const [cameraPosition, setCameraPosition] = useState('back')
  const [showCamera, setShowCamera] = useState(true);
  const [imageSource, setImageSource] = useState('');
  const [Filepath, setFilepath] = useState('');
  const devices = useCameraDevice(cameraPosition);
  const camera = useRef(null);
  const [ galleryCursor, setGalleryCursor ] = useState(null);
  const [ galleryList, setGalleryList ] = useState([]);

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
        type: 'Photos',
        MimeTypes: 'image/jpeg',
      })
      
      const fileName = photo.path.split('mrousavy-')[1];
      const newPath = `file://${RNFS.PicturesDirectoryPath}/${fileName}`;
      await RNFS.moveFile(photo.path, newPath);
      console.log(newPath);
      setFilepath(newPath);
      //찍은 사진으로 서버에 업로드
      uploadPhoto(newPath);
      !showCamera;

    };

    //사진 업로드
    const uploadPhoto = async (photoUri) => {
      try {
          const TOKEN = await AsyncStorage.getItem('userAccessToken');

          const image = {
            uri: photoUri,
            type: 'image/jpeg',
            name: 'receipt',
          }
          const formData = new FormData();
          formData.append('receipt', image);
  
          const headers = {
              "Content-Type": 'multipart/form-data',
              Authorization: `Bearer ${TOKEN}`,
          };
  
          const response = await axios.post('http://www.sm-project-refrigerator.store/api/food/receipt', formData, { headers: headers });
  
          console.log('Server response:', response.data);
  
          if (response.status !== 200) {
              console.error('Server response:', response);
              return;
          }
  
            } catch (error) {
          console.error('Error uploading photo:', error);
      }
  };
  const selectPhotoFromGallery = async() => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
    });
    if (result.didCancel){
      return null;
    }
    const localUri = result.assets[0].uri;
    const uriPath = localUri.split("//").pop();
    const imageName = localUri.split("/").pop();
    console.log('path:', uriPath);
    console.log('name:', imageName);
    uploadPhoto("file://" + uriPath);
   }
  
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

          <View 
            style={styles.selectContainer}
          >
            <TouchableOpacity
              onPress={() => selectPhotoFromGallery()}
            >
              <ICON name = "images-sharp" size = {40} color = 'white'/>
              <Text style = {styles.text}>앨범</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setShowCamera(true)}
            >
              <Feather name = "camera" size = {40} color = '#3873EA' />
              <Text style = {[styles.text, {color :'#3873EA'}]}>카메라</Text>
            </TouchableOpacity>
          </View>
         
        </>
      ) : (
        <>
          {imageSource !== '' ? (
            <Image
              style={styles.cam}
              source={{
                uri: `file://'${imageSource}`,
              }}
            />
          ) : null}

          <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.camButton}
              >
              <ICON name = "scan" size = {40} color = 'black'/>
              </TouchableOpacity>
            </View>

          <View 
            style={styles.selectContainer}
          >
            <TouchableOpacity
              onPress={() => selectPhotoFromGallery()}
              style = {styles.selectbutton}
            >
              <ICON name = "images-sharp" size = {40} color = 'white'/>
              <Text style = {styles.text}>앨범</Text>
            </TouchableOpacity>

            <TouchableOpacity
            style = {styles.selectbutton}
            onPress={() => setShowCamera(true)}
            >
              <Feather name = "camera" size = {40} color = 'white'/>
              <Text style = {styles.text}>카메라</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

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

export default CameraScreen;
const styles = StyleSheet.create({
  container: {
    width: AllWidth,
    height: AllHeight,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
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
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  selectbutton: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    color: 'white',
    fontFamily: 'NotoSansKR-Bold',
  },
  cam: {
    height: BasicHeight*505,
    width: AllWidth,
    bottom: 100,
  },
  camButton: {
    height: BasicHeight*60,
    width: BasicWidth*60,
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
