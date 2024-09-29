import React, {useState, useEffect} from 'react';
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    SafeAreaView,
    ScrollView,
} from "react-native";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


import Back from '../../assets/Icons/back.svg';
import Bullet from '../../assets/Icons/Bullet .svg';
import Navigation from '../../Navigation';
import { useNavigation } from '@react-navigation/native';

const AlertPage = () => {
    const [Title, setTitle] = useState('');
    const [Content, setContent] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        AlertMessaging();
    }, []);

    const AlertMessaging = async () => {
        try {
          const message = await AsyncStorage.getItem('message');
          const parsedMessage = JSON.parse(message);  // Assuming it's stored as a JSON string
          setTitle(parsedMessage.title);
          setContent(parsedMessage.body);
        } catch (error) {
          console.error("Error fetching message:", error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.Header}>
                    <Text style={styles.HeaderText}>알림</Text>
                    <TouchableOpacity onPress={()=> navigation.goBack()}>
                        <Back/>
                    </TouchableOpacity>
                </View>
                {Title?
                (
                <View style={styles.Content}>
                <View style={{flexDirection:'row',}}>
                    <Bullet style={{marginTop:BasicHeight*7, marginRight:BasicWidth*15}}/>
                    <Text style={styles.titleText}>유통기한 임박</Text>
                </View>

                <Text style={styles.contentText}>{Content}</Text>
            </View>):(
                <View style={styles.null}>
                    <Text style={styles.titleText}>알림이 없습니다.</Text>
                </View>
            )
                }
            </ScrollView>
        </SafeAreaView>
    );
};


const AllWidth = Dimensions.get("window").width;
const AllHeight = Dimensions.get("window").height;

const FigmaWidth = 390;
const FigmaHeight = 844;

const BasicWidth = (AllWidth / FigmaWidth).toFixed(2);
const BasicHeight = (AllHeight / FigmaHeight).toFixed(2);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    Header:{
        height: BasicHeight*44,
        flexDirection: 'row',
        alignItems: 'center',
    },
    HeaderText: {
        fontSize: 20,
        fontFamily: 'NotoSansKR-Regular',
        includeFontPadding: false,
        color: '#000000',
        marginLeft: BasicWidth*177,
        marginRight: BasicWidth*133,
    },
    Content: {
        width: BasicWidth*390,
        //height: BasicHeight*117,
        paddingLeft: BasicWidth*25,
        paddingTop: BasicHeight*30,
        paddingBottom: BasicHeight*29,
        backgroundColor: '#6E9EFD26',
    },
    titleText: {
        fontSize: 15,
        fontFamily: 'NotoSansKR-SemiBold',
        includeFontPadding: false,
        color: '#000000',
        marginBottom: BasicHeight*20,
    },
    contentText: {
        fontSize: 14,
        fontFamily: 'NotoSansKR-Regular',
        includeFontPadding: false,
        color: '#808080',
        marginLeft: BasicWidth*28,
    },
    null: {
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        marginTop: BasicHeight*200,     
    },
});

export default AlertPage;
