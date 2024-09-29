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

const Term3 = () => {
    const navigation = useNavigation();
  
    return (
      <SafeAreaView style={Styles.Container}>
        <ScrollView style = {Styles.Scroll}>

          <View style={Styles.Body}>
          <View style={Styles.Header}>
              <Text style={Styles.HeaderText}>위치기반 서비스 이용약관(필수)</Text>
            </View>
            <TouchableOpacity onPress ={()=>navigation.goBack()} style={Styles.Back}>
                  <Back/> 
            </TouchableOpacity>
            <Text style={Styles.BodyText}>
                제 1조 (목적)
                {"\n"}본 약관은 냉장고 해결사 서비스에서 제공하는 위치기반 서비스의 이용과 관련하여 회사와 사용자 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
                {"\n"}제 2조 (위치기반 서비스의 내용)
                {"\n"}회사는 사용자의 위치 정보를 바탕으로 주변 마트 또는 관련 식재료를 추천하는 서비스를 제공합니다.
                {"\n"}제 3조 (위치정보의 수집 및 이용)
                {"\n"}1. 회사는 사용자의 위치정보를 수집하여 서비스 이용 시 필요한 위치기반 서비스를 제공합니다.
                {"\n"}2. 위치정보는 사용자 동의 후 수집되며, 서비스 제공을 위해서만 이용됩니다.
                {"\n"}제 4조 (위치정보의 보호 및 보관)
                {"\n"}회사는 사용자의 위치정보를 안전하게 보호하며, 법령에 따라 필요한 기간 동안 보관 후 파기합니다.
                {"\n"}5조 (위치기반 서비스의 중단 및 변경)
                {"\n"}회사는 서비스 제공을 위한 기술적, 운영적 필요에 따라 위치기반 서비스의 일부 또는 전부를 중단하거나 변경할 수 있습니다.
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
export default Term3;
