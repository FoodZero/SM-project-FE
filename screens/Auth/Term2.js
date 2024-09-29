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

const Term2 = () => {
    const navigation = useNavigation();
  
    return (
      <SafeAreaView style={Styles.Container}>
        <ScrollView style = {Styles.Scroll}>

          <View style={Styles.Body}>
          <View style={Styles.Header}>
              <Text style={Styles.HeaderText}>개인정보 수집 및 이용(필수)</Text>
            </View>
            <TouchableOpacity onPress ={()=>navigation.goBack()} style={Styles.Back}>
                  <Back/> 
            </TouchableOpacity>
            <Text style={Styles.BodyText}>
                제 1조 (수집하는 개인정보 항목)
                {"\n"}회사는 서비스 제공을 위해 아래와 같은 개인정보를 수집합니다.
                {"\n"}1. 필수 항목: 이름, 이메일 주소, 로그인 정보(아이디/비밀번호)
                {"\n"}2. 선택 항목: 전화번호
                {"\n"}제 2조 (개인정보의 수집 및 이용 목적)
                {"\n"}회사는 다음과 같은 목적으로 개인정보를 수집 및 이용합니다.
                {"\n"}1. 사용자 인증 및 서비스 이용을 위한 본인 확인
                {"\n"}2. 식재료 관리 서비스 제공을 위한 사용자 맞춤 정보 제공
                {"\n"}3. 서비스 이용 관련 문의 응대 및 처리
                {"\n"}제 3조 (개인정보의 보유 및 이용 기간)
                {"\n"}회사는 개인정보 수집 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 단, 법령에 따라 일정 기간 보관이 필요한 경우 해당 기간 동안 보관합니다.
                {"\n"}제 4조 (개인정보 제3자 제공)
                {"\n"}회사는 사용자의 동의 없이는 개인정보를 외부에 제공하지 않습니다.
                {"\n"}제 5조 (개인정보의 파기 절차 및 방법)
                {"\n"}회사는 수집된 개인정보의 이용 목적이 달성된 후에는 해당 정보를 파기합니다. 파기 방법은 전자적 파일의 경우 기술적 방법을 이용하여 복구 불가능하게 삭제합니다.
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
export default Term2;
