import React, {Component, useState} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
} from 'react-native';


const SignUp = ({navigation}) =>{
    const [userEmail, setUserEmail] = useState("");
    const [userID, setUserID] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setrePassword] = useState("");


    
    return (
        <View>
            <View>
                <Text>회원가입</Text>
            </View>
            <View>
                <TextInput 
                    placeholder= "닉네임"
                    value = {userID}
                    onChangeText = {setUserID}
                    />
                <TextInput
                    placeholder={"이메일"}
                    value = {userEmail}
                    onChangeText = {setUserEmail}
                    />
                <TextInput
                    placeholder={"비밀번호"}
                    value = {password}
                    onChangeText = {setPassword}
                    secureTextEntry
                    />
                <TextInput
                    placeholder={"비밀번호 확인"}
                    value = {rePassword}
                    onChangeText = {setrePassword}
                    secureTextEntry
                    rules={
                          required = "비밀번호를 확인해주세요",
                            validate = {
                              matchPassword: (value) => {
                                const { password } = getValues();
                                return password === value || '비밀번호가 일치하지 않습니다'
                              }
                            }
                        }
                    />
                    
            </View>
            <TouchableOpacity activeOpacity={0.8} onPress ={()=> this.props.navigation.navigate('Login')}>
                <Text>회원가입</Text>
            </TouchableOpacity>
        </View>
    );
}
export default SignUp;
/*
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