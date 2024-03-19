//'

import React from "react";
import { View, StyleSheet } from "react-native";
import { WebView } from 'react-native-webview';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";

const REST_API_KEY = '09d652793b5af3f3b4e1587039feb0c4';
const REDIRECT_URI = 'http://localhost:8081/api/members/callback/kakao';
const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('message from webView')`;

const KaKaoLogin = () => {

    const navigation = useNavigation();
  
    function KakaoLoginWebView (data) {
      const exp = "code=";
      var condition = data.indexOf(exp);    
      if (condition != -1) {
        var authorize_code = data.substring(condition + exp.length);
        console.log(authorize_code);
        requestToken(authorize_code);
      };
    }
  
    const requestToken = async (authorize_code) => {
      var AccessToken = "none";
      axios ({
        method: 'post',
        url: 'http://www.sm-project-refrigerator.store/api/members/callback/kakao',
        params: {
          code: authorize_code,
        },
      }).then((response) => {
        AccessToken = response.data.access_token;
        //console.log(AccessToken);
          //requestUserInfo(AccessToken);
        storeData(AccessToken);
      }).catch(function (error) {
        console.log('error', error);
      })
      navigation.navigate("Signup", { screen: "Signup" } );
    };
  
     function requestUserInfo(AccessToken)  {
       axios ({
         method: 'GET',
         url: 'https://kapi.kakao.com/v2/user/me',
         headers: {
           Authorization : `Bearer ${AccessToken}`
         },
       }).then((response) => {
         var user_emil = response.data.kakao_account.email;
         var user_range = response.data.kakao_account.age_range;
         var user_gender = response.data.kakao_account.gender;
         console.log("user_emil", user_emil);
         console.log("user_range", user_range);
         console.log("user_gender", user_gender);
       }).catch(function (error) {
         console.log('error', error);
       })
       return;
     }
  
    const storeData = async (returnValue) => {
      try {
        await AsyncStorage.setItem('userAccessToken', returnValue);
      } catch (error) {
      }
    }
  
    return (
      <View style={Styles.container}>      
        <WebView
          style={{ flex: 1 }}
          originWhitelist={['*']}
          scalesPageToFit={false}
          source={{
            uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`,
          }}
          injectedJavaScript={INJECTED_JAVASCRIPT}
          javaScriptEnabled
          onMessage={event => { KakaoLoginWebView(event.nativeEvent["url"]); }}
        />
      </View>
    )
  }
  
  export default KaKaoLogin;
  
  const Styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 24,
      backgroundColor: '#fff',
    },    
  });