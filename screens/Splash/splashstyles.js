import {
    StyleSheet,
    Dimensions,
} from 'react-native';
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

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#CAF6FF',
    },

    logocontainer: {
        width: BasicWidth*254,
        height : BasicHeight*301,
        marginTop : BasicHeight*223,
        marginBottom : BasicHeight*273


    },
    image: {
        width: 15,//BasicWidth*125,
        height: 16,//BasicHeight*177,
        resizeMode: 'contain',
        margin: 30,
    },
    
    activityIndicator: {
      alignItems: 'center',
      height: 80,
    },
    Appname: {
      width : 248,
      height : 51,
      alignItems: 'center',
      fontSize : BasicWidth*40,
    },
    info: {
      alignItems: 'center',
      fontSize : 24,
    },
  });