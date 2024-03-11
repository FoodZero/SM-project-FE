import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FindEmailscreen from './screens/FindEmailscreen'; 
import EmailNoticescreen from './screens/EmailNoticescreen'; 
import FindPasswordscreen from './screens/FindPasswordscreen'; 
import PasswordResetscreen from './screens/PasswordResetscreen';
const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="FindEmail">
        <Stack.Screen name="FindEmail" component={FindEmailscreen} />
        <Stack.Screen name="EmailNotice" component={EmailNoticescreen} />
        <Stack.Screen name="FindPassword" component={FindPasswordscreen} />
        <Stack.Screen name="PasswordReset" component={PasswordResetscreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;