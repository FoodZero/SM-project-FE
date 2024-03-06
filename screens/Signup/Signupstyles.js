import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Constants from 'expo-constants';

const Styles = StyleSheet.create({
  Container: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: '#CAF6FF',
  },
  BackContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-end',
    paddingRight : 25,
  },

  HomeContainer :{
    flex : 2,
  },

  HomeText : {
      fontSize: 30,
      fontWeight : '700',
      textAlign: "left",
      marginTop : 65,
      marginLeft : 10,
  },

  InputArea : {
      flex : 2,
      paddingRight: 32,
      paddingLeft : 32,

  },

  Lables : {
    flex :2,
    fontSize : 20,
    marginTop : 25,
    marginBottom : 5,
  },

  TextForm : {
    flex : 3,
    fontSize : 20,
    borderColor : "#E2E2E2",
    borderWidth : 1,
    paddingHorizontal : 10,
  },

  CheckboxesContainer : {
    flex : 1,
    flexDirection: 'row',
    alignSelf: 'center',
  },

  CheckboxContainer : {
    flexDirection: 'row',
    alignSelf: 'center',
    paddingRight: 32,
    paddingLeft : 32,
    marginRight: 10,
    marginLeft : 10,
  },

  Checkbox : {
  },

  CheckboxText : {
    marginLeft : 10,
  },

  MiniButtonContainer : {
    flex : 1,
    paddingRight: 40,
    paddingLeft : 40,
    flexDirection: 'row',
    alignSelf: 'center',
  },

  MiniText : {

  },

  ButtonArea : {
    flex: 2,
    paddingRight: 32,
    paddingLeft : 32,
  },

  FastButtonArea : {
    flex: 3,
    paddingRight: 32,
    paddingLeft : 32,
  },

  Button : {
    height : 65,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor : '#3873EA',
    backgroundColor : '#3873EA',
    
  },
  ButtonText :{
        alignSelf : 'center',
        fontWeight : '700',
        fontSize : 20,
        color : '#FFFFFF',
      },

  FastButton : {
    height : 65,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor : '#F9E000',
    backgroundColor : '#F9E000',
    marginBottom : 30,
    
  },

  
  
  FastButtonText :{
    alignSelf : 'center',
    fontWeight : '700',
    fontSize : 20,
    color : '#332024',
  },
  
  FastLables : {
    flex :2,
    fontSize : 20,
    marginTop : 25,
    marginBottom : 5,
    textAlign : 'center',
  },
  });
  export default Styles;
  /*
  
  rules={
                            required = "비밀번호를 확인해주세요",
                              validate = {
                                matchPassword: (value) => {
                                  const { password } = getValues();
                                  return password === value || '비밀번호가 일치하지 않습니다'
                                }
                              }
                          }
                          
  const styles = StyleSheet.create({
      container: {
          flex: 1,
          backgroundColor: 'white',
          paddingLeft: wp('10%'),
          paddingRight: wp('10%'),
          justifyContent: 'center',
      },
      titleArea: {
          width: '100%',
          padding: wp('10%'),
          alignItems: 'center',
          resizeMode : 'contain',
      },
      title: {
          fontSize: wp('10%'),
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
          backgroundColor: "#46c3ad",
          width: "100%",
          height: "100%",
          justifyContent: 'center',
          alignItems: 'center',
      },
      buttonTitle: {
          color: 'white',
      },
  })
  */