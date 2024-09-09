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
import Camera from '../../assets/Icons/camera.svg';
import Frame from '../../assets/Icons/Frame.svg';
import LocationPin from '../../assets/Icons/location-pin.svg';
import Notification from '../../assets/Icons/notification.svg';


const PermissionModal = ({ isVisible, onClose})=>{
    const [includeFontPadding, setIncludeFontPadding] = useState(false);
    const storeData = async (Alert) => {
        //
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
/*
      const requestPermission = async () => {
        const camera = Platform.OS === 'ios' ? await request(PERMISSIONS.IOS.CAMERA) : await request(PERMISSIONS.ANDROID.CAMERA);
        const photo = Platform.OS === 'ios' ? await request(PERMISSIONS.IOS.PHOTO_LIBRARY) : await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
        const media = Platform.OS === 'ios' ? await request(PERMISSIONS.IOS.PHOTO_LIBRARY) : await request(PERMISSIONS.ANDROID.ACCESS_MEDIA_LOCATION);
        const location = Platform.OS === 'ios' ? await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE) : await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        const notification = Platform.OS === 'ios' ? await request(PERMISSIONS.IOS.NOTIFICATIONS) : await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
    
        console.log('Camera Permission : ', camera);
        console.log('Photo Permission : ', photo);
        console.log('Photo Permission : ', media);
        console.log('Location Permission : ', location);
        console.log('Notification Permission : ', notification);
    
        storeData();
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
                        <Camera />
                        <View style={Styles.explarea}>
                            <Text style={Styles.exptitle}>카메라(필수)</Text>
                            <Text style={Styles.expmin}>영수증 및 음식 촬영</Text>
                        </View>
                    </View>

                    <View style={Styles.Pearea}>
                        <Frame />
                        <View style={Styles.explarea}>
                            <Text style={Styles.exptitle}>사진(필수)</Text>
                            <Text style={Styles.expmin}>영수증 및 음식 품목 읽기</Text>
                        </View>
                    </View>

                    <View style={Styles.Pearea}>
                        <LocationPin/>
                        <View style={Styles.explarea}>
                            <Text style={Styles.exptitle}>위치정보(선택)</Text>
                            <Text style={Styles.expmin}>위치기반 서비스 제공 시 필요</Text>
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
                    onPress={storeData}
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
        justifyContent: 'flex-end',
        alignSelf: 'center',
    },
    Title:{
        width: BasicWidth*150,
        height: BasicHeight*45,
        marginLeft: BasicWidth*20,
        marginTop: BasicHeight*50,
        color: '#000000',
        fontSize: 25,
        //fontFamily: 'NotoSansKR-SemiBold',
        includeFontPadding: false,
    },
    Minititle: {
        width: BasicWidth*195,
        height: BasicHeight*26,
        marginLeft: BasicWidth*20,
        fontSize: 18,
        marginBottom: BasicHeight*71,
        //fontFamily: 'NotoSansKR-SemiBold',
        includeFontPadding: false,
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
        color: '#000000',
        //fontFamily: 'NotoSansKR-SemiBold',
        includeFontPadding: false,
    },
    expmin:{
        width: BasicWidth*191,
        height: BasicHeight*23,
        fontSize: 16,
        //fontFamily: 'NotoSansKR-Regular',
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
    Pearea1:{
        width:BasicWidth*177,
        height: BasicHeight*72,
        marginLeft: BasicWidth*21,
        flexDirection: 'row',
        alignItems: "center",
    },
    explarea1:{
        width: BasicWidth*237,
        height: BasicHeight*72,
        marginLeft: BasicWidth*18,
    },
    expmin1:{
        width: BasicWidth*211,
        height: BasicHeight*46,
        fontSize: 16,
        //fontFamily: 'NotoSansKR-Regular',
        includeFontPadding: false,
    },
    buttontext:{
        //fontFamily: 'NotoSansKR-Bold',
        includeFontPadding: false,
        fontSize: 20,
        color: '#FFFFFF',
    }
});

export default PermissionModal;
