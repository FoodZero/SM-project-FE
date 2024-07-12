import React, {useState, useEffect} from 'react';
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    Alert,
    PermissionsAndroid
} from "react-native";
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Camera, CameraType } from 'expo-camera';

const PermissionModal = ({ isVisible, onClose})=>{
    const storeData = async (Alert) => {
        try {
          // 'tasks' 라는 항목에 tasks 저장
          await AsyncStorage.setItem('alert', 'Alert');
        } catch (e) {
          // saving error
        }
        finally{
          onClose();
        }
      };

      useEffect(() => {
        const permissionCheck = () => {
          if (Platform.OS !== "ios" && Platform.OS !== "android") return;
          const platformPermissions =
            Platform.OS === "ios"
              ? PERMISSIONS.IOS.CAMERA
              : PERMISSIONS.ANDROID.CAMERA;
          const requestCameraPermission = async () => {
            try {
              const result = await request(platformPermissions);
              result === RESULTS.GRANTED
                ? setOpenScanner(true)
                : Alert.alert("카메라 권한을 허용해주세요");
            } catch (err) {
              Alert.alert("Camera permission err");
              console.warn(err);
            }
          };
          requestCameraPermission();
        };
      }, []);
    /*
    const [hasPermission, setHasPermission] = useState(null);

      const openCameraHandler = async() =>{
        const {response} = await Permissions.requestPermssions(Permissions.CAMERA);
        console.log(response);
      };
      useEffect(() => {
        openCameraHandler();
        console.log(response);
        onClose();
      }, []);
*/
    /*
    const requestPermisison = async () => {
        const response = await Permissions.askAsync(Permissions.CAMERA);
        console.log(response);
      };
      useEffect(() => {
        requestPermisison();
      }, []);
      */
/*
    const AndroidRP  = () => {
        requestMultiple([
            PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
            PERMISSIONS.ANDROID.CAMERA,
            PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
            PERMISSIONS.ANDROID.POST_NOTIFICATIONS,
        ]).then(response => {
            console.log('Permission Request : ',response);
        });
    };
    
    const AndroidCP  = () => {
        checkMultiple([
            PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
            PERMISSIONS.ANDROID.CAMERA,
            PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
            PERMISSIONS.ANDROID.POST_NOTIFICATIONS,
        ]).then(response => {
            console.log('Permission Check : ',response);
        });
    };
    const IosRP  = () => {
        requestMultiple([
            PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
            PERMISSIONS.IOS.CAMERA,
            PERMISSIONS.IOS.PHOTO_LIBRARY,
            PERMISSIONS.IOS.REMINDERS,
        ]).then(response => {
            console.log('Permission Request : ',response);
        });
    };
    
    const IosCP  = () => {
        checkMultiple([
            PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
            PERMISSIONS.IOS.CAMERA,
            PERMISSIONS.IOS.PHOTO_LIBRARY,
            PERMISSIONS.IOS.REMINDERS,
        ]).then(response => {
            console.log('Permission Check : ',response);
        });
    };
*/

    
    return(
        <Modal 
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={onClose}
        >
            <View style={Styles.modalcontainer}>
                <View style={Styles.container}>
                <View>
                <View>
                    <Text style={Styles.Title}>접근 권한 허용</Text>
                    <Text style={Styles.Minititle}>냉장고 해결사 이용을 위해</Text>
                </View>
                <View>
                    <View style={Styles.Pearea}>
                        <Icon name = "camera" size = {25} color= "#3873EA"/>
                        <View style={Styles.explarea}>
                            <Text style={Styles.exptitle}>카메라(필수)</Text>
                            <Text style={Styles.expmin}>영수증 및 음식 촬영</Text>
                        </View>
                    </View>

                    <View style={Styles.Pearea}>
                        <Icon name = "picture" size = {25} color= "#3873EA"/>
                        <View style={Styles.explarea}>
                            <Text style={Styles.exptitle}>사진(필수)</Text>
                            <Text style={Styles.expmin}>영수증 및 음식 품목 읽기</Text>
                        </View>
                    </View>

                    <View style={Styles.Pearea}>
                        <Icon name = "location-pin" size = {25} color= "#3873EA"/>
                        <View style={Styles.explarea}>
                            <Text style={Styles.exptitle}>위치정보(선택)</Text>
                            <Text style={Styles.expmin}>위치기반 서비스 제공 시 필요</Text>
                        </View>
                    </View>

                    <View style={Styles.Pearea1}>
                        <Icon name = "bell" size = {25} color= "#3873EA"/>
                        <View style={Styles.explarea1}>
                            <Text style={Styles.exptitle1}>알림(선택)</Text>
                            <Text>유통기한 마감 디데이 확인, 레시피 추천 팝업, 커뮤니티 알림</Text>
                        </View>  
                    </View>
                </View>
                </View>
                 
                <TouchableOpacity 
                    style={Styles.ButtonArea}
                    onPress={storeData}
                >
                    <Text>확인</Text>
                </TouchableOpacity>
                </View>
            </View>
        </Modal>
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

const Styles = StyleSheet.create({
    modalcontainer:{
        width: AllWidth,
        height: AllHeight,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    container:{
        width: BasicWidth*325,
        height: BasicHeight*615,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        justifyContent: 'flex-end',
        alignSelf: 'center',
    },
    Title:{
        width: BasicWidth*150,
        height: BasicHeight*45,
        marginLeft: BasicWidth*20,
        marginTop: BasicHeight*50,
        fontSize:25,
    },
    Minititle: {
        width: BasicWidth*195,
        height: BasicHeight*26,
        marginLeft: BasicWidth*20,
        fontSize: 18,
        marginBottom: BasicHeight*71
    },
    Pearea:{
        width:BasicWidth*177,
        height: BasicHeight*49,
        marginLeft: BasicWidth*21,
        flexDirection: 'row',
        alignItems: "center",
        marginBottom: BasicHeight*25,
    },
    explarea:{
        width: BasicWidth*237,
        height: BasicHeight*49,
        marginLeft: BasicWidth*18,
    },
    exptitle:{
        width: BasicWidth*113,
        height: BasicHeight*26,
        fontSize: 18,
    },
    expmin:{
        width: BasicWidth*191,
        height: BasicHeight*23,
        fontSize: 16,
    },
    ButtonArea:{
        width: BasicWidth*325,
        height: BasicHeight*65,
        marginTop: BasicHeight*64,
        backgroundColor: '#3873EA',
        alignItems: "center",
        justifyContent: 'center',
        alignSelf: 'end',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    Pearea1:{
        width:BasicWidth*177,
        height: BasicHeight*49,
        marginLeft: BasicWidth*21,
        flexDirection: 'row',
        alignItems: "center",
    },
    explarea1:{
        width: BasicWidth*237,
        height: BasicHeight*49,
        marginLeft: BasicWidth*18,
    },
    exptitle1:{
        width: BasicWidth*113,
        height: BasicHeight*26,
        fontSize: 18,
    },
});

export default PermissionModal;
