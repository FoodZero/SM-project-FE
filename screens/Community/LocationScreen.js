import React from 'react';
import { Alert, View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from 'expo-location';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'; // Ensure to import the right icon library

function LocationPicker() {
  const navigation = useNavigation();
  const route = useRoute();
  const AccessToken = route.params?.AccessToken;
  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();

  const close = () => {
    navigation.navigate("CommunityScreen", { AccessToken: AccessToken });
  };

  async function verifyPermissions() {
    if (
      locationPermissionInformation.status === PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    if (locationPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Insufficient Permissions!',
        'You need to grant location permissions to use this app.'
      );
      return false;
    }

    return true;
  }

  async function getLocationHandler() {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    try {
      const location = await getCurrentPositionAsync();
      const { latitude, longitude } = location.coords;

      console.log('Latitude:', latitude);
      console.log('Longitude:', longitude);

      // API request to save location
      const response = await axios.post(
        'http://www.sm-project-refrigerator.store/api/post/location',
        {
          latitude,
          longitude,
        },
        {
          headers: {
            'Authorization': `Bearer ${AccessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        Alert.alert('Success', 'Location saved successfully!');
        console.log('Response Data:', response.data);
      } else {
        Alert.alert('Error', 'Failed to save location.');
      }
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      Alert.alert('Error', 'An error occurred while fetching location or saving it.');
    }
  }

  async function SaveLocationHandler() {
    try {
      // API request to retrieve saved location
      const response = await axios.get(
        'http://www.sm-project-refrigerator.store/api/post/location',
        {
          headers: {
            'Authorization': `Bearer ${AccessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        const locationList = response.data.result.locationList;
        if (locationList.length > 0) {
          const savedLocation = locationList[0];
          const address = savedLocation.address; // Extract the address

          Alert.alert(
            'Saved Location',
            `Address: ${address}`
          );
          console.log('Response Data:', response.data);
          console.log('Saved Location:', savedLocation);

          // Navigate to CommunityScreen with the address
          navigation.navigate("CommunityScreen", {
            AccessToken: AccessToken,
            address: address,
          });
        } else {
          Alert.alert('No Saved Locations', 'No location data found.');
        }
      } else {
        Alert.alert('Error', 'Failed to retrieve saved location.');
      }
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      Alert.alert('Error', 'An error occurred while retrieving saved location.');
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={close} style={styles.icon}>
        <Icon name="chevron-back" size={24} color="#000" />
      </TouchableOpacity>
      <View style={styles.actions}>
        <Button title="Locate User" onPress={getLocationHandler} />
        <Button title="Save the Location" onPress={SaveLocationHandler} />
      </View>
    </View>
  );
}

export default LocationPicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
    position: 'relative',
  },
  icon: {
    position: 'absolute',
    top: 16,
    left: 16,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
