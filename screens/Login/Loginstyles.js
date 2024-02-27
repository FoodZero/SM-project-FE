//로그인 스타일시트만
import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

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
      backgroundColor: "#F9E000",
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
    minibuttoncontainor: {
      flexDirection: 'row',
      marginBottom: 20,
    },
    minitext:{
      fontSize : 16,
    }
  })