import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  View,
  Image,
  Text
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Splashimage from '../../assets/Images/splashimg.png';
import { useNavigation } from "@react-navigation/native";
import styles from './splashstyles';

const SplashScreen = ({navigation}) => {
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      //Check if user_id is set or not
      //If not then send for Authentication
      //else send to Home Screen
      AsyncStorage.getItem('user_id').then((value) =>
        navigation.replace(value === null ? 'Login' : 'Home'),
      );
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
        <Image
          style = {styles.image}
          source={Splashimage}
        />
    </View>
  );
};
export default SplashScreen;
