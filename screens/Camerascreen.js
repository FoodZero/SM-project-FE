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
        type: 'photo',
      })
      
      const fileName = photo.path.split('mrousavy-')[1];
      const newPath = `${RNFS.PicturesDirectoryPath}/${fileName}`;
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

        const formData = new FormData();
        formData.append({
          uri: photoUri,
          name: 'receipt.jpg',
          });

        const response = await fetch('http://www.sm-project-refrigerator.store/api/food/receipt', {
          method: 'POST',
          body: formData,
          headers: {
            Authorization: `Bearer ${TOKEN}`,
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
    const getPhotos = async () => {
      ImageCropPicker.openPicker({
        multiple: true,
        mediaType: 'photo',
        includeBase64: true,
        includeExif: true,
        }).then(res => {
          setImgInfo(res);
      });
    };
    */
    const selectPhotoFromGallery = () => {
      const options = {
        mediaType: 'photo',
        quality: 1,
      };
    
      launchImageLibrary(options, (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else {
          const source = {uri: response.assets[0].uri};
          console.log('Selected image: ', source);
          // 선택된 이미지의 경로를 RNFS를 사용하여 읽습니다.
          setImageSource(source);
        }
      });
    };

    const readImageFile = (filePath) => {
      // 'file://' 접두사를 제거합니다. RNFS에서 필요하지 않을 수 있습니다.
      const cleanPath = filePath.replace('file://', '');
      RNFS.readFile(cleanPath, 'base64')
        .then(contents => {
          console.log('File contents:', contents);
          // 여기에서 파일 내용을 사용할 수 있습니다. 예를 들어 base64 인코딩된 이미지 데이터를 상태에 저장하거나 UI에 표시할 수 있습니다.
        })
        .catch(err => {
          console.error('Error reading file:', err.message);
        });
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

          <View 
            style={styles.selectContainer}
          >
            <TouchableOpacity
              onPress={() => selectPhotoFromGallery()}
            >
              <ICON name = "images-sharp" size = {40} color = 'white'/>
              <Text style = {{color: 'white'}}>앨범</Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Feather name = "camera" size = {40} color = 'white'/>
              <Text style = {{color: 'white'}}>카메라</Text>
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
              <Text style = {{color: 'white'}}>앨범</Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Feather name = "camera" size = {40} color = 'white'/>
              <Text style = {{color: 'white'}}>카메라</Text>
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
