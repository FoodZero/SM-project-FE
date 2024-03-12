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
      flex: 1,
      backgroundColor: '#FFFFFF'
    },

    BackContainer: {
      width : AllWidth,
      height : AllHeight,
      paddingTop: BasicHeight*13,
      backgroundColor: '#FFFFFF',
    },
    IconContainer:{
      backgroundColor: '#FFFFFF',
      width: BasicWidth*390,
      height: BasicHeight*20,
      alignItems: 'flex-end',
      paddingRight : BasicWidth*25,
    },

    HomeContainer :{
      width: BasicWidth*83,
      height: BasicHeight*45,
      marginTop : BasicHeight*54,
      marginLeft: BasicWidth*20,
      marginBottom: BasicHeight*55,
    },

    HomeText : {
      width: BasicWidth*83,
      height: BasicHeight*45,
      fontSize: 30,
    },

    InputArea1 : {
      width: BasicWidth*325,
      height: BasicHeight*114,
      marginRight: BasicWidth*32,
      marginLeft : BasicWidth*32,
      marginBottom : BasicHeight*40,
    },

    InputArea2 : {
      width: BasicWidth*325,
      height: BasicHeight*114,
      marginRight: BasicWidth*32,
      marginLeft : BasicWidth*32,
    },

    Lables : {
      fontSize : 20,
      marginBottom : BasicHeight*5
    },

    TextForm : {
      width: BasicWidth*325,
      height: BasicHeight*50,
      fontSize : 20,
      borderColor : "#E2E2E2",
      borderWidth : 1,
      paddingHorizontal : 10,
    },
    Text : {
        width: BasicWidth*141,
        height: BasicHeight*30,
        marginLeft: BasicWidth*10,
        color: '#E82323',
        fontSize: 13,
        //alignSelf: 'stretch',
      },

    CheckboxesContainer : {
      flexDirection: 'row',
      width: BasicWidth*267,
      height: BasicHeight*26,
      marginRight: BasicWidth*58,
      marginLeft : BasicWidth*65,
      marginBottom : BasicHeight*30,
      justifyContent: 'center',
    },

    CheckboxContainer : {
      flexDirection: 'row',
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      
    },

    Checkbox : {
    },

    CheckboxText : {
      width: BasicWidth*87,
      height: BasicHeight*26,
      fontSize: 18,
      alignContent: 'center',
    },

    MiniButtonContainer : {
      width: BasicWidth*264,
      height: BasicHeight*23,
      marginRight: BasicWidth*65,
      marginLeft : BasicWidth*61,
      marginTop: BasicHeight*25,
      marginBottom: BasicHeight*25,
      flexDirection: 'row',
      justifyContent: 'center',
    },

    MiniText : {

    },

    ButtonArea : {

      paddingRight: 32,
      paddingLeft : 32,
    },

    FastButtonArea : {
      width: BasicWidth*325,
      height: BasicHeight*104,
      marginRight: BasicWidth*32,
      marginLeft : BasicWidth*33,
    },

    Button : {
      width: BasicWidth*325,
      height: BasicHeight*65,
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
      width: BasicWidth*325,
      height: BasicHeight*65,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor : '#F9E000',
      backgroundColor : '#F9E000',
      
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

    Scroll:{
      flex: 1,
    },
  });

  export default Styles;