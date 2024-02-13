import React, {Component, useState} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    ScrollView,
    StyleSheet,
} from 'react-native';

//const [userID, setuserID] = useState('');
//const [userPassword, setuserPassword] = useState('');
//const [Loading, setLoading] = useState(false);
//const [errorText, seterrorText] = useState('');

//로그인 정보 가져오기
/*
loginfetch = () =>{
    fetch('sm-project-database.cfucmmi4ol6f.ap-northeast-2.rds.amazonaws.com',{//API URL
        method : 'GET', //GET = 정보 가져오기만 / POST = 정보 받아오고, 수정이 일어남
        body : JSON.stringify({ //json파일로 전달하기 위함
            //이부분은 db확인 후 넣기
            ID:
            Password:
        }),
    })
    .then(response => response.json())
    .then(response => {
       if (response.message === 'SUCCESS'){
            this.props.history.push('./pages/Mainpage.js')
        }

        else{
            if(response.message === 'INVALID_USER'){
                alert('아이디 또는 비밀번호가 맞지 않습니다.')
            } else 
        }
    })
}
*/
export default class LoginScreen extends Component{
    render(){
        return (
            <View >
                <View >
                    <Text>Login</Text>
                </View>
                <View >
                    <TextInput 
                         
                        placeholder={"ID"}/>
                    <TextInput 
                         
                        placeholder={"Password"}/>
                </View>
                <View>
                <TouchableOpacity activeOpacity={0.8} onPress ={()=> this.props.navigation.navigate('Login')}>
                    <Text>Login</Text>
                </TouchableOpacity>
                </View>
            </View>
        );
    }
}
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
    },
    title: {
        fontSize: 36 ,
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