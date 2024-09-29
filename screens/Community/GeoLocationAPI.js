import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

import Back from '../../assets/Icons/back.svg';

const GeoLocationAPI = () => {
    const navigation = useNavigation();
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLogitude] = useState(0);
    const [address1, setAddress1] = useState(false);
    const [add1, setAdd1] = useState('');
    const geoLocation = async () => {
        Geolocation.getCurrentPosition(
            (position) => {
               const {latitude, longitude} = position.coords;

               console.log('Latitude:', latitude);
                console.log('Longitude:', longitude);

                setLatitude(latitude);
                setLogitude(longitude);
            },
            error => { console.log(error.code, error.message); },
            {enableHighAccuracy:true, timeout: 15000, maximumAge: 10000 },
        )
    };
      

    // Update map style to force a re-render to make sure the geolocation button appears
    useEffect(() => {
        geoLocation();
        //LocationHandler();
        const address = AsyncStorage.getItem('address1');
        setAdd1(address);
    
    }, [latitude, longitude]);


    return (
        <View>
            <View style={styles.header}>
                <Text style={{fontSize: 18,
        color: '#000000',
        fontFamily: 'NotoSansKR-Regular',
        includeFontPadding: false,
        marginRight:BasicWidth*115}}> 내 위치 설정 </Text>
                <TouchableOpacity>
                <Back/>
                </TouchableOpacity>
            </View>
            <MapView
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={styles.map}
                region={{
                    latitude: latitude,
                    longitude: longitude,
                    latitudeDelta: 0.010,
                    longitudeDelta: 0.011,
                }}
                showsUserLocation={true}
                >
            </MapView>
                    
            <TouchableOpacity
                onPress={() => navigation.navigate("LocationAuth")}
                style={styles.LocationButton}
                >
                <Text style={styles.Text}> 위치 인증하기 </Text>
            </TouchableOpacity>
            <View style={styles.SavedLocView}>
                {address1 ? ( <TouchableOpacity style={styles.detailButton}>
                    <Text style={styles.Text}> {add1} </Text>
                </TouchableOpacity>) : (<TouchableOpacity style={styles.detailButton}>
                    <Text style={styles.Text}> 위치 1 </Text>
                </TouchableOpacity>)}
               
                <TouchableOpacity style={styles.detailButton}>
                    <Text style={styles.Text}> 위치 2 </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const AllWidth = Dimensions.get("window").width;
const AllHeight = Dimensions.get("window").height;

const FigmaWidth = 390;
const FigmaHeight = 844;

const BasicWidth = (AllWidth / FigmaWidth).toFixed(2);
const BasicHeight = (AllHeight / FigmaHeight).toFixed(2);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: AllWidth,
        height: BasicHeight*400,
    },
    header:{
        flexDirection: 'row',
        marginTop: BasicHeight*17,
        marginLeft: BasicWidth*146,
        marginBottom: BasicHeight*30,
    },
    LocationButton:{
        width: BasicWidth*300,
        height: BasicHeight*58,
        backgroundColor: '#3873EA',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: BasicWidth*45,
        marginTop: BasicHeight*130,
    },
    SavedLocView:{
        flexDirection: 'row',
        marginTop: BasicHeight*40,
        marginLeft: BasicWidth*45,
    },
    detailButton:{
        width: BasicWidth*145,
        height: BasicHeight*58,
        backgroundColor: '#808080',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: BasicWidth*10,
    },
    Text:{
        fontSize: 18,
        color: '#FFFFFF',
        fontFamily: 'NotoSansKR-SemiBold',
        includeFontPadding: false,
    }
})

export default GeoLocationAPI;