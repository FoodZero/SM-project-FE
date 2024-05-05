import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Signin = () => {

  const navigation = useNavigation();

  return (
    <View style={Styles.container}>      
      <Text style={Styles.HomeText}>로그인 화면</Text>
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
  }
})