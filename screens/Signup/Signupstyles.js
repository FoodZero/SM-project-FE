//로그인 스타일시트만
import { StyleSheet, Dimensions } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Constants from 'expo-constants';

const AllWidth = Dimensions.get("window").width;
const AllHeight = Dimensions.get("window").height;

const FigmaWidth = 390;
const FigmaHeight = 806;

const BasicWidth =(
    AllWidth / FigmaWidth
).toFixed(2);

const BasicHeight =(
    AllHeight / FigmaHeight
).toFixed(2);


const Styles = StyleSheet.create({
    Container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
    },
    Scroll:{
      flex: 1,
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
      width: BasicWidth*111,
      height: BasicHeight*45,
      marginTop : BasicHeight*53,
      marginLeft: BasicWidth*20,
      marginBottom: BasicHeight*55,
    },

    HomeText : {
      width: BasicWidth*111,
      height: BasicHeight*45,
      fontSize: 30,
    },

    InputArea : {
      width: BasicWidth*325,
      height: BasicHeight*114,
      marginRight: BasicWidth*32,
      marginLeft : BasicWidth*32,
    },
    Lables : {
      fontSize : 20,
      marginBottom : BasicHeight*5
    },

    PnumInputArea : {
      width: BasicWidth*325,
      height: BasicHeight*144,
      marginRight: BasicWidth*33,
      marginLeft : BasicWidth*32,
      marginBottom : BasicHeight*30,
    },

    NickInputArea : {
      width: BasicWidth*325,
      height: BasicHeight*114,
      marginRight: BasicWidth*33,
      marginLeft : BasicWidth*32,
      marginBottom : BasicHeight*5,
    },

    TextForm : {
      width: BasicWidth*325,
      height: BasicHeight*50,
      fontSize : 20,
      borderColor : "#E2E2E2",
      borderWidth : 1,
      paddingHorizontal : 10,
    },

    PnumForm : {
      width: BasicWidth*225,
      height: BasicHeight*50,
      marginRight: BasicWidth*10,
      fontSize : 20,
      borderColor : "#E2E2E2",
      borderWidth : 1,
      paddingHorizontal : 10,
    },

    NickForm : {
      width: BasicWidth*193,
      height: BasicHeight*50,
      marginRight: BasicWidth*10,
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

    ButtonArea : {

      paddingRight: 32,
      paddingLeft : 32,
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

    MiniButton : {
      width: BasicWidth*90,
      height: BasicHeight*50,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor : '#3873EA',
      backgroundColor : '#3873EA',
    },
    MiniButtonText :{
      alignSelf : 'center',
      fontWeight : '700',
      fontSize : 20,
      color : '#FFFFFF',
    },
    MiniArea:{
      width: BasicWidth*325,
      height: BasicHeight*50,
      marginBottom: BasicHeight*10,
      flexDirection: 'row',
    },

    NickButton : {
      width: BasicWidth*120,
      height: BasicHeight*50,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor : '#3873EA',
      backgroundColor : '#3873EA',
    },
    NickButtonText :{
      alignSelf : 'center',
      fontWeight : '700',
      fontSize : 20,
      color : '#FFFFFF',
    },
    NickArea:{
      width: BasicWidth*325,
      height: BasicHeight*50,
      flexDirection: 'row',
    },
  });

  export default Styles;