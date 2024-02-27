import React from "react";
import {createRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  CheckBox,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import { useNavigation } from "@react-navigation/native";

const Signin = () => {
  const [loginSelected, setloginSelection] = useState(false); 
  const [idSelected, setidSelection] = useState(false);
  const navigation = useNavigation();

  return (
    <View style={Styles.container}> 
      <Text style={Styles.HomeText}>로그인 화면</Text>
        <View style={Styles.formArea}>
          <TextInput 
            style={Styles.textForm}
            placeholder={"ID"}/>
          <TextInput 
            style={Styles.textForm}
            placeholder={"Password"}/>
            <View style = {Styles.checkboxContainer}>
            <View style = {Styles.checkboxContainer}>
            <CheckBox
                    value={loginSelected}
                    onValueChange={setloginSelection}
                    style={Styles.checkbox}
                  />
                  <Text style={Styles.label}>자동로그인</Text>
                  </View>
              <View style = {Styles.checkboxContainer}>
                  <CheckBox
                    value={idSelected}
                    onValueChange={setidSelection}
                    style={Styles.checkbox}
                  />
                  <Text style={Styles.label}>아이디 저장</Text>
                  </View>
            </View>
        </View>
      <View style={Styles.buttonArea}>
      <TouchableOpacity
        style={Styles.button}
        activeOpacity={0.8}
        onPress ={()=> navigation.navigate("Signin", {screen : 'Signin'})}>
          <Text style={Styles.buttonTitle}>Login</Text>
      </TouchableOpacity>
      </View>
      <TouchableOpacity
          onPress={() => navigation.navigate("Signup", { screen: 'Signup' })}
          style={Styles.NextBottom}
        >
          <Text style={Styles.BottomText}>회원가입으로</Text>
        </TouchableOpacity>
      <TouchableOpacity
          onPress={() => navigation.navigate("KaKaoLogin", { screen: 'KaKaoLogin' })}
          style={Styles.NextBottom}
        >
          <Text style={Styles.BottomText}>카카오 화면으로</Text>
        </TouchableOpacity>
    </View>
  )
}

export default Signin;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  HomeText: {
    fontSize: 30,
    textAlign: "center",
  },
  NextBottom: {
    backgroundColor: "purple",
    padding: 10,
    marginTop: "20%",
    width: "50%",
    alignSelf: "center",
    borderRadius: 10,
  },
  BottomText: {
    fontSize: 15,
    color: 'white',
    textAlign: "center",
  },
  formArea: {
    width: '100%',
    paddingBottom: wp('10%'),
  },
  textForm: {
      borderWidth: 0.5,
      borderColor: '#888',
      width: '100%',
      height: hp('5%'),
      paddingLeft: 5,
      paddingRight: 5,
      marginBottom: 5,
  },
  buttonArea: {
      width: '100%',
      height: hp('5%'),
  },
  button: {
      backgroundColor: "#3873EA",
      width: "100%",
      height: "100%",
      justifyContent: 'center',
      alignItems: 'center',
  },
  buttonTitle: {
      color: 'white',
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
  },
})