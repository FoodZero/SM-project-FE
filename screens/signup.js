import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
const Signup = () => {

  const navigation = useNavigation();

  useEffect(() => {

    async function getData() {
      try {
        const value = await AsyncStorage.getItem('userAccessToken')
        if(value !== null) {
          console.log(value);
        }
      } catch(e) {
        console.log('error', value);
      }
    }
    getData();
  },[]);

  return (
    <View style={Styles.container}>      
      <Text style={Styles.HomeText}>회원가입 화면</Text>
      <TouchableOpacity
          onPress={() => navigation.navigate( "screen3", { screen: "screen3"} )}
          style={Styles.NextBottom}
        >
          <Text style={Styles.BottomText}>screen3</Text>
        </TouchableOpacity>
    </View>
  )
}

export default Signup;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24,
    backgroundColor: '#fff',
  },
  HomeText: {
    marginTop: 100,
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
  }
})