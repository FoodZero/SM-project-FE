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

const TermDetail = () => {
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


          <View style={Styles.Body}>
            <View style={Styles.Header}>
              <Text style={Styles.HeaderText}>개인정보 수집 및 이용(필수)</Text>
            </View>
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

          <View style={Styles.Body}>
            <View style={Styles.Header}>
              <Text style={Styles.HeaderText}>위치기반 서비스 이용약관(필수)</Text>
            </View>
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
export default TermDetail;
