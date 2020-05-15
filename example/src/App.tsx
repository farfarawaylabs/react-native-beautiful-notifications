import * as React from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import {
  Billboard,
  NOTIFICATIONS_POSITION,
  showNotification,
  showRoundedNotification,
  showMaterialStyleTextNotification,
  showErrorNotification,
  showWarningNotification,
  showInfoNotification,
} from '@farfarawaylabs/react-native-beautiful-notifications';

export default function App() {
  return (
    <View style={styles.container}>
      <Billboard position={NOTIFICATIONS_POSITION.TOP} />
      <Button
        title="Add Rounded Notification"
        onPress={() => {
          showRoundedNotification({
            text: 'This is a notification message',
            backgroundColor: 'pink',
            color: 'black',
            autoDisappearTime: 3000,
          });
        }}
      />

      <Button
        title="Add Material Style Notification"
        onPress={() => {
          showMaterialStyleTextNotification({
            text: 'This is a notification message',
            backgroundColor: '#82c4c3',
            color: '#FFF',
            autoDisappearTime: 0,
          });
        }}
      />

      <Button
        title="Add Error Notification"
        onPress={() => {
          showErrorNotification({ text: 'This is an error message' });
        }}
      />

      <Button
        title="Add Warning Notification"
        onPress={() => {
          showWarningNotification({ text: 'This is just a warning' });
        }}
      />

      <Button
        title="Add an Info Notification"
        onPress={() => {
          showInfoNotification({ text: 'This is just a for your information' });
        }}
      />

      <Button
        title="Show a custom notification"
        onPress={() => {
          showNotification({
            text: 'This is a custom notification',
            entranceAnimationType: 'shake',
            exitAnimationType: 'fadeOutDownBig',
            entranceAnimationDuration: 1500,
            exitAnimationDuration: 1000,
            autoDisappearTime: 1500,
            style: { paddingVertical: 30, backgroundColor: '#f5a8a8' },
            textStyle: { color: '#dddddd', fontWeight: 'bold' },
          });
        }}
      />
      <Button
        title="Show custom element notification"
        onPress={() => {
          showNotification({
            entranceAnimationType: 'fadeInDown',
            exitAnimationType: 'fadeOutUp',
            style: { backgroundColor: 'rgba(52, 52, 52, 0.2)' },
            notificationUI: (
              <View>
                <Text>This is a fully custom element based notification</Text>
                <Button
                  title="you can even add buttons here"
                  onPress={() => {}}
                />
              </View>
            ),
          });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
