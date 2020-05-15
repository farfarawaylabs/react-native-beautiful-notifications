import * as React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import {
  Billboard,
  NOTIFICATIONS_POSITION,
  showNotification,
} from '@farfarawaylabs/react-native-beautiful-notifications';

export default function App() {
  return (
    <View style={styles.container}>
      <Billboard position={NOTIFICATIONS_POSITION.TOP} />
      <Button
        title="Add notification"
        onPress={() => {
          showNotification({ text: 'message' });
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
