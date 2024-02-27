import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createRef, useState} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    CheckBox,
    Image,
    ScrollView
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

  
const Signup = () => {

  const navigation = useNavigation();
  useEffect(() => {

    async function getData() {
      try {
        const value = await AsyncStorage.getItem('userAccessToken')
        if(value !== null) {
          console.log(value);
        }
      } catch(e) {
        console.log('error', value);
      }
    }
    getData();
  },[]);
  
    const [userEmail, setUseremail] = useState("");
    const [userName, setUsername] = useState("");
    const [userPassword, setUserpassword] = useState("");
    const [userBirth, setUserbirth] = useState("");
    const [userPnum, setUserpnum] = useState("");

    const [errortext, setErrortext] = useState('');
    const [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);

    const idInputRef = createRef();
    const gradeInputRef = createRef();
    const passwordInputRef = createRef();
    const passwordchkInputRef = createRef();
    const nameInputRef = createRef();
    const [isSelected, setSelection] = useState(false); 

    const SubmitButton = () => {
        setErrortext('');

        if(!userEmail){
            alert('이메일을 입력해주세요');
            return;
        }
        if(!userPassword){
            alert('비밀번호를 입력해주세요');
            return;
        }
        if(!userName){
            alert('이름을 입력해주세요');
            return;
        }
        if(!userBirth){
            alert('생년월일을 입력해주세요');
            return;
        }
        if(!userPnum){
            alert('전화번호를 입력해주세요');
            return;
        }

        var dataToSend = {
            db_Email : userEmail,
            db_Password : userPassword,
            db_Name : userName,
            db_Birth : userBirth,
            db_Pnum : userPnum,
        };

        var formBody = [];
        for (var key in dataToSend){
            var encodedKey = encodeURIComponent(key);
            var encodedValue = encodeURIComponent(dataToSend(key));
            formBody.push(encodedKey + '=' + encodedValue)
        }
        formBody =  formBody.join('&');

        fetch('/api/members/register',
        {
            method : 'POST',
            body : formBody,
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },
        })
        .then((response) => response.json())
        .then((responseJson) => {
            //Hide Loader
            setLoading(false);
            setErrortext2('');
            console.log(responseJson);
            // If server response message same as Data Matched
            if (responseJson.status === 'success') {
            setIsRegistraionSuccess(true);
            console.log('Registration Successful. Please Login to proceed');
            } else if (responseJson.status === 'duplicate') {
            setErrortext2('이미 존재하는 아이디입니다.');
            }
        })
        .catch((error) => {
            //Hide Loader
            setLoading(false);
            console.error(error);
      });
  };
    return (
        <View style={Styles.container}>
                <Text style={Styles.HomeText}>회원가입</Text>
            <View style={Styles.formArea}>
                <TextInput
                    style={Styles.textForm}
                    placeholder={"이메일"}
                    value = {userEmail}
                    onChangeText = {setUseremail}
                    />
                <TextInput
                    style={Styles.textForm}
                    placeholder={"비밀번호"}
                    value = {userPassword}
                    onChangeText = {setUserpassword}
                    secureTextEntry
                    />
            </View>
              <Text style={Styles.HomeText}>본인인증</Text>
              <View style={Styles.formArea}>
                <TextInput
                    style={Styles.textForm}
                    placeholder= "이름"
                    value = {userName}
                    onChangeText = {setUsername}
                    />
                <TextInput 
                    style={Styles.textForm}
                    placeholder= "생년월일"
                    value = {userBirth}
                    onChangeText = {setUserbirth}
                    />
                <TextInput
                    style={Styles.textForm}
                    placeholder= "전화번호"
                    value = {userPnum}
                    onChangeText = {setUserpnum}
                    />
                    <CheckBox
                    value={isSelected}
                    onValueChange={setSelection}
                    style={Styles.checkbox}
                  />
                    </View>
                    <View style={Styles.buttonArea}>
            <TouchableOpacity
              style={Styles.button}
              activeOpacity={0.8} 
              onPress ={()=> navigation.navigate('Login')}>
                <Text style={Styles.BottomText}>회원가입</Text>
            </TouchableOpacity>
            </View>
            <View>
            <TouchableOpacity
              onPress={() => navigation.navigate( "Home", { screen: "Home"} )}
              style={Styles.NextBottom}>
            <Text style={Styles.BottomText}>홈 화면으로</Text>
          </TouchableOpacity>
            </View>
      </View>

    );

}
export default Signup;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24,
    backgroundColor: '#fff',
  },
  HomeText: {
    marginTop: 100,
    fontSize: 30,
    textAlign: "center",
  },
  NextBottom: {
    backgroundColor: "purple",
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
})

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