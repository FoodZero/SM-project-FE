import React, {useState, useEffect} from 'react';
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    Alert,
} from "react-native";
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PERMISSIONS, RESULTS, request, requestMultiple, Permission, check, checkNotifications } from "react-native-permissions";

import Camera from '../../assets/Icons/camera.svg';
import Frame from '../../assets/Icons/Frame.svg';
import LocationPin from '../../assets/Icons/location-pin.svg';
import Notification from '../../assets/Icons/notification.svg';


const PermissionModal = ({ isVisible, onClose})=>{
    const storeData = async (Alert) => {
        //
        try {
          // 'tasks' 라는 항목에 tasks 저장
          //await AsyncStorage.setItem('alert', 'Alert');
        } catch (e) {
          // saving error
        }
        finally{
          onClose();
        }
      };

      const requestPermission = async () => {
        try {
            // 카메라 권한
            const cameraPermission = Platform.OS === 'ios' ? 
                await request(PERMISSIONS.IOS.CAMERA) : 
                await request(PERMISSIONS.ANDROID.CAMERA);
            
            // 사진 라이브러리 권한 (iOS) 또는 저장소 권한 (Android)
            const photoPermission = Platform.OS === 'ios' ? 
                await request(PERMISSIONS.IOS.PHOTO_LIBRARY) : 
                await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
            
            // 미디어 위치 권한 (Android)
            const mediaPermission = Platform.OS === 'ios' ? 
                await request(PERMISSIONS.IOS.PHOTO_LIBRARY) : 
                await request(PERMISSIONS.ANDROID.ACCESS_MEDIA_LOCATION);
            
            // 위치 권한
            const locationPermission = Platform.OS === 'ios' ? 
                await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE) : 
                await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
            
                
            // 알림 권한
            const notificationPermission = Platform.OS === 'ios' ? 
                await request(PERMISSIONS.IOS.NOTIFICATIONS) : 
                await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
    
            // 권한 결과 로그 출력
            console.log('Camera Permission: ', cameraPermission);
            console.log('Photo Permission: ', photoPermission);
            console.log('Media Permission: ', mediaPermission);
            console.log('Location Permission: ', locationPermission);
            console.log('Notification Permission: ', notificationPermission);
    
            // 결과를 AsyncStorage에 저장
            await storeData({
                cameraPermission,
                photoPermission,
                mediaPermission,
                locationPermission,
                notificationPermission
            });
        } catch (error) {
            console.error('Error requesting permissions: ', error);
        } finally {
            onClose(); // 모달 닫기
        }
    };
    

    
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

                    <Text style={Styles.Title}>접근 권한 허용</Text>
                    <Text style={Styles.Minititle}>냉장고 해결사 이용을 위해</Text>
                <View>
                    <View style={Styles.Pecamarea}>
                        <Camera />
                        <View style={Styles.explcamarea}>
                            <Text style={Styles.expcamtitle}>카메라(필수)</Text>
                            <Text style={Styles.expcammin}>영수증 및 음식 촬영</Text>
                        </View>
                    </View>

                    <View style={Styles.Pepicarea}>
                        <Frame />
                        <View style={Styles.explpicarea}>
                            <Text style={Styles.exppictitle}>사진(필수)</Text>
                            <Text style={Styles.exppicmin}>영수증 및 음식 품목 읽기</Text>
                        </View>
                    </View>

                    <View style={Styles.Pelocarea}>
                        <LocationPin/>
                        <View style={Styles.expllocarea}>
                            <Text style={Styles.exploctitle}>위치정보(선택)</Text>
                            <Text style={Styles.explocmin}>위치기반 서비스 제공 시 필요</Text>
                        </View>
                    </View>

                    <View style={Styles.Pearea1}>
                        <Notification/>
                        <View style={Styles.explarea1}>
                            <Text style={Styles.exptitle}>알림(선택)</Text>
                            <Text style={Styles.expmin1}>유통기한 마감 디데이 확인,{"\n"} 레시피 추천 팝업, 커뮤니티 알림</Text>
                        </View>  
                    </View>
                </View>
                </View>
                 
                <TouchableOpacity 
                    style={Styles.ButtonArea}
                    onPress={requestPermission}
                >
                    <Text style={Styles.buttontext} >확인</Text>
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
        alignSelf: 'center',
    },
    Title:{
        height: BasicHeight*45,
        marginLeft: BasicWidth*20,
        marginTop: BasicHeight*50,
        color: '#000000',
        fontSize: 25,
        fontFamily: 'NotoSansKR-Medium',
        includeFontPadding: false,
    },
    Minititle: {
        height: BasicHeight*26,
        marginLeft: BasicWidth*20,
        fontSize: 18,
        marginBottom: BasicHeight*71,
        fontFamily: 'NotoSansKR-Medium',
        includeFontPadding: false,
    },
    Pecamarea:{
        height: BasicHeight*49,
        marginLeft: BasicWidth*21,
        flexDirection: 'row',
        alignItems: "center",
        marginBottom: BasicHeight*25,
        padding:0,
    },
    explcamarea:{
        height: BasicHeight*49,
        marginLeft: BasicWidth*18,
    },
    expcamtitle:{
        height: BasicHeight*26,
        fontSize: 18,
        color: '#000000',
        fontFamily: 'NotoSansKR-Medium',
        includeFontPadding: false,
    },
    expcammin:{
        height: BasicHeight*23,
        fontSize: 16,
        color: '#808080',
        fontFamily: 'NotoSansKR-Regular',
        includeFontPadding: false,
    },
    Pepicarea:{
        height: BasicHeight*49,
        marginLeft: BasicWidth*25,
        flexDirection: 'row',
        alignItems: "center",
        marginBottom: BasicHeight*25,
    },
    explpicarea:{
        height: BasicHeight*49,
        marginLeft: BasicWidth*20,
    },
    exppictitle:{
        height: BasicHeight*26,
        fontSize: 18,
        color: '#000000',
        fontFamily: 'NotoSansKR-Medium',
        includeFontPadding: false,
    },
    exppicmin:{
        height: BasicHeight*23,
        color: '#808080',
        fontSize: 16,
        fontFamily: 'NotoSansKR-Regular',
        includeFontPadding: false,
    },

    Pelocarea:{
        height: BasicHeight*49,
        marginLeft: BasicWidth*23,
        flexDirection: 'row',
        alignItems: "center",
        marginBottom: BasicHeight*25,
    },
    expllocarea:{
        height: BasicHeight*49,
        marginLeft: BasicWidth*16,
    },
    exploctitle:{
        height: BasicHeight*26,
        fontSize: 18,
        color: '#000000',
        fontFamily: 'NotoSansKR-Medium',
        includeFontPadding: false,
    },
    explocmin:{
        height: BasicHeight*23,
        color: '#808080',
        fontSize: 16,
        fontFamily: 'NotoSansKR-Regular',
        includeFontPadding: false,
    },
    Pearea1:{
        height: BasicHeight*72,
        marginLeft: BasicWidth*22,
        flexDirection: 'row',
        alignItems: "center",
    },
    explarea1:{
        width: BasicWidth*237,
        height: BasicHeight*72,
        marginLeft: BasicWidth*18,
    },
    exptitle:{
        height: BasicHeight*26,
        fontSize: 18,
        color: '#000000',
        fontFamily: 'NotoSansKR-Medium',
        includeFontPadding: false,
    },
    expmin1:{
        height: BasicHeight*46,
        color: '#808080',
        fontSize: 16,
        fontFamily: 'NotoSansKR-Regular',
        includeFontPadding: false,
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
    buttontext:{
        fontFamily: 'NotoSansKR-Bold',
        includeFontPadding: false,
        fontSize: 20,
        color: '#FFFFFF',
    }
});

export default PermissionModal;
