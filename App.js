import React, { useEffect } from 'react';
import Navigation from './Navigation';
import messaging from '@react-native-firebase/messaging';
import { messageHandler } from './messageHandler';
import Toast from 'react-native-toast-message'; // Import toast message
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  useEffect(() => {
    // Request user permission for push notifications
    const requestPermission = async () => {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
      }
    };

    // Call function to request permission on app start
    requestPermission();

    // Handle incoming messages when the app is in the foreground
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('A new foreground message arrived!', remoteMessage);
      AsyncStorage.setItem('message', JSON.stringify(remoteMessage.notification));

      // Optionally, you can also handle the notification via Notifee for background cases
      await messageHandler(remoteMessage);
    });

    return unsubscribe; // Cleanup on unmount
  }, []);


  return (
    <>
      <Navigation />
      <Toast />
    </>
  );
}
