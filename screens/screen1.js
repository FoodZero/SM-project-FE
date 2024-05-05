import React, { useCallback, useEffect, createRef, useState } from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import axios from "axios";
import notifee from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';

const Screen1 = () => {

  const requestPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  /*
  const [loading, setLoading] = useState(false);
  const androidPermissions: PermissionsPerOS = {
    location: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    camera: PERMISSIONS.ANDROID.CAMERA,
    photo: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
};
const iosPermissions: PermissionsPerOS = {
    location: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
    camera: PERMISSIONS.IOS.CAMERA,
    photo: PERMISSIONS.IOS.PHOTO_LIBRARY,
};

const getPermission = async (
    permission: PossiblePermission,
    onSuccess?: () => void,
    onFailed?: () => void,
    essential = false
): Promise<boolean> => {
    const needPermission = permissionsPerOS[permission];
    permissionModalStore.setMessage(PERMISSION_REQUEST_MESSAGE[permission]);
    permissionModalStore.setOpen(true);

    const handlePermissionSuccess = () => {
        if (onSuccess) onSuccess();
        permissionModalStore.setOpen(false);
        permissionModalStore.setMessage('');
        return true;
    };

    const handlePermissionError = (message: string, openSetting = false) => {
        if (openSetting) goToSettings(message);
        if (onFailed) onFailed();
        permissionModalStore.setOpen(false);
        permissionModalStore.setMessage('');
        return false;
    };

    let requested: PermissionStatus;
    const checked = await check(needPermission);
    switch (checked) {
        case RESULTS.UNAVAILABLE:
            return handlePermissionError(
                strings.PERMISSION_UNAVAILABLE,
                essential
            );
        case RESULTS.GRANTED:
            return handlePermissionSuccess();
        case RESULTS.DENIED:
            requested = await request(needPermission);
            if (requested === RESULTS.GRANTED) {
                return handlePermissionSuccess();
            }
        case RESULTS.LIMITED:
        case RESULTS.BLOCKED:
        default:
            return handlePermissionError(strings.PERMISSION_BLOCKED, essential);
    }
  
};
*/
  return (
    <View style={Styles.container}>      
      <Text style={Styles.HomeText}>Screen1</Text>
      <View style={Styles.ButtonArea}>
        <TouchableOpacity
          style={Styles.Button}
          activeOpacity={0.8}
          onPress={() => requestPermission()}
          >
          <Text style={Styles.ButtonText}>로그인</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Screen1;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  HomeText: {
    fontSize: 35,
    textAlign: "center",
  },
  ButtonArea : {

    paddingRight: 32,
    paddingLeft : 32,
  },
  ButtonText :{
    alignSelf : 'center',
    fontWeight : '700',
    fontSize : 20,
    color : '#FFFFFF',
  },
  Button : {
    width: 325,
    height: 65,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor : '#3873EA',
    backgroundColor : '#3873EA',
    
  },
})