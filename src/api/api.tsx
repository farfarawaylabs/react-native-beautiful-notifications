import React, { ReactElement } from 'react';
import PubSub from 'pubsub-js';
import BillboadDataSource from '../datasources/NotificationsDataSource';
import { StyleProp, ViewStyle, TextStyle, ViewProps } from 'react-native';
import * as Animatable from 'react-native-animatable';
import BeautifulNotification from '../components/BeatufiulNotification';
import BeautifulNotificationText from '../components/BeatutifulNotificationText';

const publishNotification = (notification: any) => {
  BillboadDataSource.addNotification(notification);

  PubSub.publish('notifications', {
    event: 'notification_added',
  });
};

interface NotificationProps extends ViewProps {
  /** The text of the notification. If you pass this prop, the notificationUI one will be ignored */
  text?: string;

  /** Additional styles to attach to the text element of the notification */
  textStyle?: StyleProp<TextStyle>;

  /** The notification component width. Defaults to '%100' */
  width?: number | string;

  /** The number of milliseconds after which the notification will auto disappear. 0 means it will stay until the user press it. Default to 3000. */
  autoDisappearTime?: number;

  /** The type of animation to be used when showing the notification. Default to fadeIn animation.
      See react-native-animatable for possible value */
  entranceAnimationType?: Animatable.Animation;

  /** the duration of the entrance animation in miliseconds. Default to 1 seocnd */
  entranceAnimationDuration?: number;

  /** The type of animation to be used when hiding the notification. Default to fadeIn animation.
      See react-native-animatable for possible value */
  exitAnimationType?: Animatable.Animation;

  /** the duration of the exit animation in miliseconds. Default to 1 seocnd */
  exitAnimationDuration?: number;

  /** Pass your own custom notification element. If this prop is passed, the text prop will be ignored */
  notificationUI?: ReactElement;

  /** Additional styles to attach to the notification component */
  style?: StyleProp<ViewStyle>;
}
/**
 *
 * @param param0
 */
export const showNotification = ({
  text,
  style = {},
  width = '100%',
  autoDisappearTime = 3000,
  entranceAnimationType = 'fadeIn',
  entranceAnimationDuration = 1000,
  exitAnimationType = 'fadeOut',
  exitAnimationDuration = 1000,
  notificationUI,
  textStyle,
  ...rest
}: NotificationProps) => {
  const notification = (
    <BeautifulNotification
      containerWidth={width}
      style={style}
      entranceAnimationType={entranceAnimationType}
      entranceAnimationDuration={entranceAnimationDuration}
      exitAnimationType={exitAnimationType}
      exitAnimationDuration={exitAnimationDuration}
      disappearAutomaticallyAfter={autoDisappearTime}
      {...rest}
    >
      {text ? (
        <BeautifulNotificationText style={textStyle}>
          {text}
        </BeautifulNotificationText>
      ) : (
        notificationUI
      )}
    </BeautifulNotification>
  );

  publishNotification(notification);
};
