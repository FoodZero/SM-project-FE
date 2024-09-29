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

const DeleteComplete = () => {
    const navigation = useNavigation();
    const Clear = () =>{
      navigation.reset({
        routes: [{
            name: 'Splash',
          }]
      })
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
            
            <Text style={{marginLeft:BasicWidth*40,marginTop:BasicHeight*36, fontSize: 24,fontFamily:'NotoSansKR-Bold', includeFontPadding:false, color:'#000000'}}> 회원탈퇴가 완료되었어요</Text>
              <View style={{justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                <Text style={Styles.BodyText}>
                  그동안 냉장고 해결사를 이용해주셔서{'\n'}감사합니다.
                </Text>
              </View>
          </View>
          <TouchableOpacity
                onPress={() => Clear()}
                style={Styles.LocationButton}
                >
                <Text style={Styles.Text}> 닫기 </Text>
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
      marginBottom: BasicHeight*150,
      justifyContent: 'center',
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
      marginTop: BasicHeight*231,
      fontSize: 16,
      fontFamily: 'NotoSansKR-Regular',
      includeFontPadding: false,
      color: '#000000',
    },
    LocationButton:{
      width: BasicWidth*300,
      height: BasicHeight*58,
      backgroundColor: '#3873EA',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: BasicWidth*45,
      marginTop: BasicHeight*100,
  },
  Text:{
    fontSize: 18,
    color: '#FFFFFF',
    fontFamily: 'NotoSansKR-SemiBold',
    includeFontPadding: false,
}

  });
export default DeleteComplete;
