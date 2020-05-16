import React, { useEffect, useState } from 'react';
import { StyleSheet, StyleProp, ViewStyle, SafeAreaView } from 'react-native';
import PubSub from 'pubsub-js';
import BillboardDataSource from '../datasources/NotificationsDataSource';
import { Col, Alignment } from '@farfarawaylabs/react-native-layout';

export enum NOTIFICATIONS_POSITION {
  TOP = 'top',
  BOTTOM = 'bottom',
}

interface BillboardProps {
  /** Set if the notifications will be shown from the top or the bottom of the screen. Defaults to top. */
  position?: NOTIFICATIONS_POSITION;

  /**
   * Additional styles or styles to override default style
   */
  style?: StyleProp<ViewStyle>;
}

/**
 * The container element for all notifications. Add this element to the top of your app once
 * compose it in your render method
 */
const Billboard: React.FC<BillboardProps> = ({
  style,
  position = NOTIFICATIONS_POSITION.TOP,
  ...rest
}) => {
  const [, setLastNotificationTime] = useState();

  useEffect(() => {
    const token = PubSub.subscribe('notifications', addNoficiation);
    return () => {
      PubSub.unsubscribe(token);
    };
  }, []);

  const addNoficiation = () => {
    setLastNotificationTime(new Date());
  };

  const notificationsAlignment =
    position === NOTIFICATIONS_POSITION.TOP ? Alignment.Start : Alignment.End;

  return (
    <SafeAreaView style={styles.container} pointerEvents="box-none">
      <Col
        style={[style]}
        height="100%"
        pointerEvents="box-none"
        horizontalAlign={Alignment.Center}
        verticalAlign={notificationsAlignment}
        {...rest}
      >
        {BillboardDataSource.notifications.map((currNotification) => {
          return currNotification;
        })}
      </Col>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 100000,
    width: '100%',
    height: '100%',
  },
});

export default Billboard;
