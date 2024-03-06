//로그인 스타일시트만
import { StyleSheet, Dimensions } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Constants from 'expo-constants';

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

const Styles = StyleSheet.create({
    Container: {
      paddingTop: Constants.statusBarHeight,
      width : AllWidth,
      height : AllHeight,
      backgroundColor: '#FFFFFF',
      borderColor : "#CAF6FF",
      borderWidth : 1,
    },

    BackContainer: {
      width: BasicWidth*390,
      height: BasicHeight*695,
      backgroundColor: '#FFFFFF',
      paddingBottom: BasicHeight*102,
      borderColor : "#CAF6FF",
      borderWidth : 1,
    },
    IconContainer:{
      backgroundColor: '#FFFFFF',
      width: BasicWidth*390,
      height: BasicHeight*20,
      alignItems: 'flex-end',
      paddingRight : BasicWidth*25,
      borderColor : "#CAF6FF",
      borderWidth : 1,
    },

    HomeContainer :{
      width: BasicWidth*83,
      height: BasicHeight*45,
      marginTop : BasicHeight*54,
      marginLeft: BasicWidth*20,
      borderColor : "#CAF6FF",
      borderWidth : 1,
    },

    HomeText : {
      width: BasicWidth*83,
      height: BasicHeight*45,
      fontSize: 30,
      fontFamily : 'NotoSansKR',
    },

    InputArea : {
      width: BasicWidth*325,
      height: BasicHeight*84,
      marginTop : BasicHeight*55,
      marginRight: BasicWidth*32,
      marginLeft : BasicWidth*32,
      borderColor : "#CAF6FF",
      borderWidth : 1,

    },

    Lables : {
      fontSize : 20,
      marginBottom : BasicHeight*5
    },

    TextForm : {
      fontSize : 20,
      borderColor : "#E2E2E2",
      borderWidth : 1,
      paddingHorizontal : 10,
    },

    CheckboxesContainer : {

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

      paddingRight: 40,
      paddingLeft : 40,
      flexDirection: 'row',
      alignSelf: 'center',
    },

    MiniText : {

    },

    ButtonArea : {

      paddingRight: 32,
      paddingLeft : 32,
    },

    FastButtonArea : {
 
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

      fontSize : 20,
      marginTop : 25,
      marginBottom : 5,
      textAlign : 'center',
    },
  });

  export default Styles;