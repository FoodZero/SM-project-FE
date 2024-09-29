import notifee from '@notifee/react-native';

// This function will handle all notification displays
export const messageHandler = async (message) => {
  const { title = 'Default Title', body = 'Default Body', data = {} } = message.notification || {};

  try {
    // Display notification using Notifee
    await notifee.displayNotification({
      title: title,
      body: body,
      data: {
        messageType: data.messageType || 'default',
        roomId: data.roomId || 'unknown',
      },
    });
  } catch (error) {
    console.error('Notification error:', error);
  }
};
