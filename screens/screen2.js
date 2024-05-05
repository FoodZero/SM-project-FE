import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Screen2 = () => {

  return (
    <View style={Styles.container}>      
      <Text style={Styles.HomeText}>Screen2</Text>
    </View>
  )
}

export default Screen2;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  HomeText: {
    fontSize: 35,
    textAlign: "center",
  },
})