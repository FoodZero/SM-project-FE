import { AppRegistry } from 'react-native';
import App from './App.js';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';
import { messageHandler } from './messageHandler';

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
  await messageHandler(remoteMessage);
});

AppRegistry.registerComponent(appName, () => App);
