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

const LocationAuth = () => {
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
    const LocationHandler= async() => {
        try {
          const AccessToken = await AsyncStorage.getItem('userAccessToken');
          const Latitude = latitude;
            const Longitude = longitude;
            const data ={
                latitude: Latitude,
                longitude: Longitude,
            }
          // API request to save location
          const response = await axios.post(
            'http://www.sm-project-refrigerator.store/api/post/location',
           data,
              {
                headers: {
                  'Authorization': `Bearer ${AccessToken}`,
                  'Content-Type': 'application/json',
                },
              }
            );
    
          if (response.status === 200) {
            console.log('Success', 'Location saved successfully!');
            console.log('Response Data:', response.data);
            navigation.navigate('LocationScreen');
          } else {
            console.log('Error', 'Failed to save location.');
          }
        } catch (error) {
          console.error('Error:', error.response ? error.response.data : error.message);
        }
      }

    // Update map style to force a re-render to make sure the geolocation button appears
    useEffect(() => {
        geoLocation();
        
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
                onPress={() => LocationHandler()}
                style={styles.LocationButton}
                >
                <Text style={styles.Text}> 위치 인증하기 </Text>
            </TouchableOpacity>
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
        marginTop: BasicHeight*228,
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

export default LocationAuth;