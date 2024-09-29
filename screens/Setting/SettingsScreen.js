import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LogOut from './LogOut';
import axios from 'axios';

import Pencil from '../../assets/Icons/Pencil.svg';

const Settings = () => {
  const navigation = useNavigation();
  const [isVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [nick, setNick] = useState('');  // Fix the useState

  useEffect(() => {
    const GetUserinfo = async () => {
      try {
        const AccessToken = await AsyncStorage.getItem('userAccessToken');
        const response = await axios.get('http://www.sm-project-refrigerator.store/api/members/profile', {
          headers: { Authorization: `Bearer ${AccessToken}` },
        });
        if (response.status === 200) {
          console.log('프로필:', response.data);
          const { email, nickname } = response.data.result;  // Access result object correctly
          setEmail(email);
          setNick(nickname);  // Set nickname to state
        }
      } catch (error) {
        console.error('Error :', error);
      }
    };
    GetUserinfo();
  }, []);

  const ChangeNick = async () => {
    try {
      const AccessToken = await AsyncStorage.getItem('userAccessToken');
      data = { nickname: nick };
      const response = await axios.put('http://www.sm-project-refrigerator.store/api/members/nickname/update',data, {
        headers: { Authorization: `Bearer ${AccessToken}` }
      });
      if (response.status === 200) {
        console.log('프로필:', response.data);

      }
    } catch (error) {
      console.error('Error :', error);
    }
  };

  return (
    <SafeAreaView style={Styles.Container}>
      <ScrollView style={Styles.Scroll}>
        <View style={Styles.NickContainer}>
          <View style={{ flexDirection: 'row' }}>
            {/* Display and update the nickname in the TextInput */}
            <TextInput
              style={Styles.nick}
              value={nick}  // Use 'nick' directly from state
              onChangeText={(text) => setNick(text)}  // Update state when changed
              onSubmitEditing={()=>ChangeNick()}
            />
            <Pencil style={{ marginTop: BasicHeight * 20 }} />
          </View>
          <Text style={Styles.email}>{email}</Text>
        </View>

        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SavedRecipe');
            }}
          >
            <Text style={Styles.nav}>북마크 레시피</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('GeoLocationAPI');
            }}
          >
            <Text style={Styles.nav}>내 위치 설정</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('LocationAuth');
            }}
          >
            <Text style={Styles.nav}>위치 인증하기</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <LogOut isVisible={isVisible} onClose={() => setModalVisible(false)} />
            <Text style={Styles.nav}>로그아웃</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('DeleteUser');
            }}
          >
            <Text style={Styles.nav}>회원탈퇴</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const AllWidth = Dimensions.get('window').width;
const AllHeight = Dimensions.get('window').height;

const FigmaWidth = 390;
const FigmaHeight = 844;

const BasicWidth = (AllWidth / FigmaWidth).toFixed(2);
const BasicHeight = (AllHeight / FigmaHeight).toFixed(2);

const Styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  Scroll: {
    marginLeft: BasicWidth * 30,
  },
  nav: {
    fontSize: 18,
    fontFamily: 'NotoSansKR-Regular',
    color: '#000000',
    marginBottom: BasicHeight * 27,
    marginLeft: BasicWidth * 14,
  },
  NickContainer: {
    width: BasicWidth * 330,
    height: BasicHeight * 100,
    borderWidth: 1.5,
    borderColor: '#3873EA',
    borderRadius: 10,
    marginTop: BasicHeight * 40,
    paddingLeft: BasicWidth * 27,
    marginBottom: BasicHeight * 49,
  },
  nick: {
    fontSize: 18,
    fontFamily: 'NotoSansKR-SemiBold',
    color: '#000000',
    includeFontPadding: false,
    marginBottom: BasicHeight * 10,
    padding: 0,
    margin: 0,
  },
  email: {
    fontSize: 16,
    fontFamily: 'NotoSansKR-Regular',
    color: '#AFAFAF',
    includeFontPadding: false,
  },
});

export default Settings;
