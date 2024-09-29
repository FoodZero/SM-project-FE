import React, { useState } from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import X from '../../assets/Icons/X.svg';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import Back from '../../assets/Icons/back.svg';

const DeleteUser = () => {
    const navigation = useNavigation();

    const Delete = async () => {
      try {
        const TOKEN = await AsyncStorage.getItem('userAccessToken');
        const response = await axios.delete('http://www.sm-project-refrigerator.store/api/members/delete', {
          headers: { Authorization:  `Bearer ${TOKEN}` }
        });
  
        if (response.status === 200) {
          await AsyncStorage.clear();
          console.log('Reset log:', response);

          navigation.navigate('DeleteComplete')
        } else {
          console.error('Server returned non-200 status code:', response.status);
        }
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };
  
    return (
      <SafeAreaView style={Styles.Container}>
        <ScrollView style = {Styles.Scroll}>

          <View style={Styles.Body}>
            <View style={Styles.Header}>
                <Text style={Styles.HeaderText}>회원탈퇴</Text>
            
            <TouchableOpacity onPress ={()=>navigation.goBack()} style={Styles.Back}>
                  <Back/> 
            </TouchableOpacity>
            </View>
            <Text style={{marginLeft:BasicWidth*10,marginTop:BasicHeight*36, fontSize: 24,fontFamily:'NotoSansKR-Bold', includeFontPadding:false, color:'#000000'}}> 마지막으로 꼭 확인해주세요!</Text>
            <Text style={Styles.BodyText}>
            1. 데이터 삭제{"\n"}탈퇴 후에는 계정에 저장된 모든 데이터(식재료 목록, 유통기한 정보 등)가 영구적으로 삭제되며, 삭제된 데이터는 복구가 불가능합니다.
            {"\n"}{"\n"}2. 로그인 및 계정 복구 불가{"\n"}탈퇴 후에는 해당 계정으로 다시 로그인할 수 없으며, 동일한 이메일로 재가입이 가능하더라도, 기존 데이터는 복구되지 않습니다.
            {"\n"}{"\n"}3. 탈퇴 처리 소요 시간{"\n"}탈퇴 요청 후 처리가 완료되기까지 최대 7일이 소요될 수 있습니다. 이 기간 동안 일부 서비스 이용이 제한될 수 있습니다.
            </Text>
          </View>
          <TouchableOpacity
                onPress={() => Delete()}
                style={Styles.LocationButton}
                >
                <Text style={Styles.Text}> 서비스 탈퇴하기 </Text>
            </TouchableOpacity>

        </ScrollView>
      </SafeAreaView>
    );
}

const AllWidth = Dimensions.get("window").width;
const AllHeight = Dimensions.get("window").height;

const FigmaWidth = 390;
const FigmaHeight = 806;

const BasicWidth =(
    AllWidth / FigmaWidth
).toFixed(2);

const BasicHeight =(
    AllHeight / FigmaHeight
).toFixed(2);


const Styles = StyleSheet.create({
    Container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
    },
    Scroll:{
      flex: 1,
    },
    Body:{
      width: BasicWidth*330,
      marginLeft: BasicWidth*30,
      marginTop: BasicHeight*10,
    },
    Header:{
      height: BasicHeight*26,
      
      flexDirection: 'row',
    },
    Back:{
      position: 'absolute',

      marginTop: BasicHeight*2,
    },
    HeaderText:{
      fontSize: 18,
      fontFamily: 'NotoSansKR-Regular',
      includeFontPadding: false,
      color: '#000000',
      marginLeft: BasicWidth*117,

    },
    BodyText:{
      marginTop: BasicHeight*50,
      fontSize: 16,
      fontFamily: 'NotoSansKR-Regular',
      includeFontPadding: false,
      color: '#000000',
      flexWrap: "wrap",
    },
    LocationButton:{
      width: BasicWidth*300,
      height: BasicHeight*58,
      backgroundColor: '#3873EA',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: BasicWidth*45,
      marginTop: BasicHeight*47,
  },
  Text:{
    fontSize: 18,
    color: '#FFFFFF',
    fontFamily: 'NotoSansKR-SemiBold',
    includeFontPadding: false,
}

  });
export default DeleteUser;
