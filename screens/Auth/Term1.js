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

import Back from '../../assets/Icons/back.svg';

const Term1 = () => {
    const navigation = useNavigation();
  
    return (
      <SafeAreaView style={Styles.Container}>
        <ScrollView style = {Styles.Scroll}>

          <View style={Styles.Body}>
            <View style={Styles.Header}>
                <Text style={Styles.HeaderText}>이용약관(필수)</Text>
            </View>
            <TouchableOpacity onPress ={()=>navigation.goBack()} style={Styles.Back}>
                  <Back/> 
            </TouchableOpacity>
            <Text style={Styles.BodyText}>
                제 1조(목적){"\n"}본 약관은 사용자가 냉장고 해결사 어플리케이션(이하 "서비스")을 이용함에 있어 회사와 사용자 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
                {"\n"}제 2조 (정의)
                {"\n"}1. "서비스"란 사용자가 식재료 관리 및 유통기한 관리를 할 수 있도록 제공하는 모든 기능을 의미합니다.
                {"\n"}2. "사용자"란 서비스에 접속하여 본 약관에 따라 서비스를 이용하는 모든 개인을 의미합니다.
                {"\n"}제 3조 (약관의 효력 및 변경)
                {"\n"}1. 본 약관은 사용자가 서비스에 동의함으로써 효력이 발생합니다.
                {"\n"}2. 회사는 필요 시 약관을 변경할 수 있으며, 변경된 약관은 공지 후 효력이 발생합니다.
                {"\n"}제 4조 (서비스의 제공 및 변경)
                {"\n"}1. 서비스는 식재료 유통기한 관리 및 재료 등록 기능을 제공합니다.
                {"\n"}2. 회사는 기술적 필요에 따라 서비스 내용을 변경할 수 있으며, 이 경우 변경 사항을 사전에 공지합니다.
                {"\n"}제 5조 (서비스 이용 제한)회사는 사용자가 본 약관을 위반하거나 부정한 방법으로 서비스를 이용하는 경우 서비스 이용을 제한할 수 있습니다.
            </Text>
          </View>

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
      marginBottom: BasicHeight*150,
    },
    Header:{
      height: BasicHeight*26,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    },
    Back:{
      position: 'absolute',
      marginLeft: BasicWidth*320,
      marginTop: BasicHeight*2,
    },
    HeaderText:{
      fontSize: 18,
      fontFamily: 'NotoSansKR-Regular',
      includeFontPadding: false,
      color: '#000000',

    },
    BodyText:{
      marginTop: BasicHeight*30,
      fontSize: 16,
      fontFamily: 'NotoSansKR-Regular',
      includeFontPadding: false,
      color: '#000000',
      flexWrap: "wrap",
    },

  });
export default Term1;
