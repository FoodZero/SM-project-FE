import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  View,
  Image,
  Text,
  Dimensions,
  StyleSheet,
  Modal,
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Splashimage from '../../src/assets/splash.png';
import { useNavigation } from "@react-navigation/native";
import PermissionModal from './PermissionModal';

const SplashScreen = ({navigation}) => {
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);
  const [isModalVisible, setModalVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      //Check if user_id is set or not
      //If not then send for Authentication
      //else send to Home Screen
      AsyncStorage.getItem('user_id').then((value) =>
        navigation.replace(value === null ? 'Login' : 'Home'),
      );
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
        <Image
          style = {styles.image}
          source={Splashimage}
        />
    </View>
  );
}

const AllWidth = Dimensions.get("window").width;
const AllHeight = Dimensions.get("window").height;

const FigmaWidth = 390;
const FigmaHeight = 844;

const BasicWidth =(
    AllWidth / FigmaWidth
).toFixed(2);

const BasicHeight =(
    AllHeight / FigmaHeight
).toFixed(2);

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#CAF6FF',
    },

    image: {
        resizeMode: "contain",
    },
  });
export default SplashScreen;
