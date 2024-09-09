import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Screen1 = () => {

  return (
    <View style={Styles.container}>      
      <Text style={Styles.HomeText}>Home</Text>
    </View>
  )
}

export default Screen1;

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