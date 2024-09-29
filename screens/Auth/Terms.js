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

import SelectOff from '../../assets/Icons/SelectOff.svg';
import SelectOn from '../../assets/Icons/SelectOn.svg';
import Term from '../../assets/Icons/Term.svg';

const Terms = () => {
  const navigation = useNavigation();
  
  const backAction = () => {
    navigation.navigate("Login");
  };


  //동의 체크 on/off
  const [chkAgree, setchkAgree] = useState(false);
  const [Allchk,setAllchk] = useState(false);
  const [Termchk,setTermchk] = useState(false);
  const [Privchk,setPrivchk] = useState(false);
  const [Locachk,setLocachk] = useState(false);
  //약관 전체보기 on/off
  const [Allexpand,setAllexpand] = useState(false);
  const [Termexpand,setTermexpand] = useState(false);
  const [Privexpand,setPrivexpand] = useState(false);
  const [Locaexpand,setLocaexpand] = useState(false);

  const AllChecked = (Allchk) =>{
    if(Allchk == true){
      setTermchk(true);
      setPrivchk(true);
      setLocachk(true);
    }
    else{
      setTermchk(false);
      setPrivchk(false);
      setLocachk(false);
    }
  };

  const Allcheck = () =>{
    setAllchk(!Allchk);
    AllChecked(!Allchk);
  };

  const Termcheck = () =>{
    setTermchk(!Termchk);
  };

  const Privcheck = () =>{
    setPrivchk(!Privchk);
  };

  const Locacheck = () =>{
    setLocachk(!Locachk);
  };

  const storeData =() => {
      navigation.navigate("Register", { screen: 'Register' })
  };

  const TermAll = () =>{
    navigation.navigate("TermDetail", { screen: 'TermDetail' })   
  };
  const Term1 = () =>{
    navigation.navigate("Term1", { screen: 'Term1' })   
  };
  const Term2 = () =>{
    navigation.navigate("Term2", { screen: 'Term2' })   
  };
  const Term3 = () =>{
    navigation.navigate("Term3", { screen: 'Term3' })   
  };

    return (
      <SafeAreaView style={Styles.Container}>
        <ScrollView style = {Styles.Scroll}>

        <View style = {Styles.IconContainer}>
          <TouchableOpacity onPress={backAction}>
            <X />
          </TouchableOpacity>
        </View>

          <View style={Styles.HometextArea}>
            <Text style={Styles.HomeText}>
              이용약관에{"\n"}동의해주세요
            </Text>
          </View>

          <View style={Styles.TermAreaAll}>
            <TouchableOpacity onPress={Allcheck}>
              {Termchk && Privchk && Locachk  ? <SelectOn/> : <SelectOff/>}
            </TouchableOpacity>
            <Text style={Styles.TermText}>
              약관 전체동의
            </Text>
            <View style = {Styles.Termicons}>
              <TouchableOpacity onPress={TermAll}>
                <Term/>
              </TouchableOpacity>
            </View>
          </View>
          <View style={Styles.Line}/>
          <View style={Styles.TermArea}>
            <TouchableOpacity onPress={Termcheck}>
              {Termchk? <SelectOn/> : <SelectOff/>}
            </TouchableOpacity>
            <Text style={Styles.TermText}>
              이용약관(필수)
            </Text>
            <View style = {Styles.Termicons}>
              <TouchableOpacity onPress={Term1}>
                <Term/>
                </TouchableOpacity>
            </View>
          </View>
          <View style={Styles.TermArea}>
            <TouchableOpacity onPress={Privcheck}>
              {Privchk? <SelectOn/> : <SelectOff/>}
            </TouchableOpacity>
            <Text style={Styles.TermText}>
              개인정보 수집 및 이용(필수)
            </Text>
            <View style = {Styles.Termicons}>
              <TouchableOpacity onPress={Term2}>
                <Term/>
              </TouchableOpacity>
            </View>
          </View>
          <View style={Styles.TermArea}>
            <TouchableOpacity onPress={Locacheck}>
             {Locachk? <SelectOn/> : <SelectOff/>}
            </TouchableOpacity>
            <Text style={Styles.TermText}>
              위치기반 서비스 이용약관(필수)
            </Text>
            <View style = {Styles.Termicons}>
              <TouchableOpacity onPress={Term3}>
                <Term/>
              </TouchableOpacity>
            </View>
          </View>
          <View style={Styles.ButtonArea}>
          {
          Termchk && Privchk && Locachk ? (<TouchableOpacity
          style={Styles.Button}
          activeOpacity={0.8}
          onPress={storeData}
          >
          <Text style={Styles.ButtonText}>다음</Text>
        </TouchableOpacity>):
        (<TouchableOpacity
          style={Styles.Buttondisabled}
          activeOpacity={0.8}
          disabled = {true}
          >
          <Text style={Styles.ButtonText}>다음</Text>
        </TouchableOpacity>)
        }
        </View>
        <View>
        <TouchableOpacity
          style = {Styles.EmailArea}
          onPress={() => navigation.navigate("FindEmail", { screen: 'FindEmail' })}>
          <Text style = {Styles.EmailText}> 이메일 찾기 </Text>
        </TouchableOpacity>
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
    IconContainer:{
      height: BasicHeight*20,
      marginTop: BasicHeight*13,
      alignItems: 'flex-end',
      paddingRight : BasicWidth*25,
    },
    HometextArea: {
      height: BasicHeight*90,
      marginLeft: BasicWidth*20,
      marginTop: BasicHeight*25,
    },

    HomeText: { 
      fontSize: 30,
      includeFontPadding: false,
      fontFamily: 'NotoSansKR-Bold',
      color: '#000000',
    },
    Button : {
      width: BasicWidth*325,
      height: BasicHeight*65,
      marginTop: BasicHeight*70,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor : '#3873EA',
      backgroundColor : '#3873EA',
    },
    Buttondisabled : {
      width: BasicWidth*325,
      height: BasicHeight*65,
      marginTop: BasicHeight*70,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor : '#AFAFAF',
      backgroundColor : '#AFAFAF',
    },

    ButtonText :{
      alignSelf : 'center',
      includeFontPadding: false,
      fontFamily: 'NotoSansKR-Bold',
      fontSize : 20,
      color : '#FFFFFF',
    },
    ButtonArea : {
      marginLeft : BasicWidth*33,
    },
    TermAreaAll:{
      height: BasicHeight*22,
      marginLeft: BasicWidth*33,
      marginTop: BasicHeight*45,
      flexDirection: 'row',
    },
    TermArea:{
      height: BasicHeight*23,
      marginLeft: BasicWidth*33,
      marginTop: BasicHeight*25, 
      flexDirection: 'row',
    },
    EmailArea:{
      width: BasicWidth*390,
      height: BasicHeight*23,
      marginTop: BasicHeight*25,
      marginLeft: BasicWidth*165,
      alignContent: "center",
    },
    EmailText:{
      width: BasicWidth*76,
      height: BasicHeight*23,

      textDecorationLine: 'underline',
      includeFontPadding: false,
      fontFamily: 'NotoSansKR-Regular',
      color: '#000000',
    },
    TermText:{
      width: BasicWidth*197,
      height: BasicHeight*22,
      marginLeft: BasicWidth*15,
      fontSize: 15,
      includeFontPadding: false,
      fontFamily: 'NotoSansKR-Regular',
      color: '#000000',
    },
    Termicons:{
      height:BasicHeight*23,
      marginLeft: BasicWidth*60,
    },
    Line:{
      width:BasicHeight*700,
      height:BasicHeight*3,
      marginTop: BasicHeight*25,
      backgroundColor: '#E2E2E2',
      alignSelf:'center'
    },

  });
export default Terms;
