import React, { ReactElement } from 'react';
import { StyleSheet } from 'react-native';
import PubSub from 'pubsub-js';
import BillboadDataSource from '../datasources/NotificationsDataSource';
import { StyleProp, ViewStyle, TextStyle, ViewProps } from 'react-native';
import * as Animatable from 'react-native-animatable';
import BeautifulNotification from '../components/BeatufiulNotification';
import BeautifulNotificationText from '../components/BeatutifulNotificationText';
import BeautifulNotificationBody, {
  BeautifulNotififcationBodyProps,
} from '../components/BeautifulNotificationBody';

const publishNotification = (notification: any) => {
  BillboadDataSource.addNotification(notification);

  PubSub.publish('notifications', {
    event: 'notification_added',
  });
};

export interface NotificationProps extends ViewProps {
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
 * Show your own custom notification
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

export interface IconApiNotificationProps
  extends NotificationProps,
    Omit<BeautifulNotififcationBodyProps, 'containerStyle'> {}

export const showNotificationWithIcon = ({
  iconType,
  iconName,
  iconSize,
  iconColor,
  iconStyle,
  textStyle,
  text,
  style = {},
  width = '100%',
  autoDisappearTime = 3000,
  entranceAnimationType = 'fadeIn',
  entranceAnimationDuration = 1000,
  exitAnimationType = 'fadeOut',
  exitAnimationDuration = 1000,
}: IconApiNotificationProps) => {
  const notification = (
    <BeautifulNotification
      containerWidth={width}
      style={style}
      entranceAnimationType={entranceAnimationType}
      entranceAnimationDuration={entranceAnimationDuration}
      exitAnimationType={exitAnimationType}
      exitAnimationDuration={exitAnimationDuration}
      disappearAutomaticallyAfter={autoDisappearTime}
    >
      <BeautifulNotificationBody
        containerStyle={style}
        iconType={iconType}
        iconName={iconName}
        iconSize={iconSize}
        iconColor={iconColor}
        iconStyle={iconStyle}
        textStyle={textStyle}
      >
        {text}
      </BeautifulNotificationBody>
    </BeautifulNotification>
  );

  publishNotification(notification);
};

export interface RoundedNotificationProps {
  /** The text of the notification. */
  text?: string;

  /** The notification container background color. Defaults to '#000' */
  backgroundColor?: string;

  /** The notification text color. Defaults to '#FFF' */
  color?: string;

  /** The amount of time it takes the notification to appear or disappear. Defaults to 3000 */
  autoDisappearTime?: number;
}

export const showRoundedNotification = ({
  text,
  backgroundColor = '#000',
  color = '#FFF',
  autoDisappearTime = 3000,
}: RoundedNotificationProps) => {
  showNotification({
    text: text,
    autoDisappearTime: autoDisappearTime,
    style: [{ backgroundColor: backgroundColor }, styles.roundedNotification],
    textStyle: { color: color },
    width: '90%',
  });
};

export interface MaterialNotificationProps extends RoundedNotificationProps {}

export const showMaterialStyleTextNotification = ({
  text,
  backgroundColor = '#000',
  color = '#FFF',
  autoDisappearTime = 3000,
}: MaterialNotificationProps) => {
  showNotification({
    text: text,
    autoDisappearTime: autoDisappearTime,
    style: [{ backgroundColor: backgroundColor }, styles.materialNotification],
    textStyle: { color: color },
  });
};

export interface ApiNotificationProps extends RoundedNotificationProps {
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
}

export const showErrorNotification = ({
  text,
  backgroundColor = '#c70039',
  color = '#fff',
  autoDisappearTime = 3000,
  entranceAnimationType = 'bounceInDown',
  exitAnimationType = 'bounceOutUp',
  exitAnimationDuration = 1000,
  entranceAnimationDuration = 1000,
}: ApiNotificationProps) => {
  showNotificationWithIcon({
    iconType: 'font-awesome',
    iconName: 'exclamation',
    iconColor: color,
    text,
    style: [{ backgroundColor: backgroundColor }, styles.iconNotification],
    textStyle: { color: color },
    autoDisappearTime,
    entranceAnimationType,
    exitAnimationType,
    exitAnimationDuration,
    entranceAnimationDuration,
  });
};

export const showWarningNotification = ({
  text,
  backgroundColor = '#ffcc00',
  color = '#fff',
  autoDisappearTime = 3000,
  entranceAnimationType = 'bounceInDown',
  exitAnimationType = 'bounceOutUp',
  exitAnimationDuration = 1000,
  entranceAnimationDuration = 1000,
}: ApiNotificationProps) => {
  showNotificationWithIcon({
    iconType: 'entypo',
    iconName: 'warning',
    iconColor: color,
    text,
    style: [{ backgroundColor: backgroundColor }, styles.iconNotification],
    textStyle: { color: color },
    autoDisappearTime,
    entranceAnimationType,
    exitAnimationType,
    exitAnimationDuration,
    entranceAnimationDuration,
  });
};

export const showInfoNotification = ({
  text,
  backgroundColor = '#63b7af',
  color = '#fff',
  autoDisappearTime = 3000,
  entranceAnimationType = 'bounceIn',
  exitAnimationType = 'bounceOut',
  exitAnimationDuration = 1000,
  entranceAnimationDuration = 1000,
}: ApiNotificationProps) => {
  showNotificationWithIcon({
    iconType: 'entypo',
    iconName: 'info',
    iconColor: color,
    text,
    style: [{ backgroundColor: backgroundColor }, styles.iconNotification],
    textStyle: { color: color },
    autoDisappearTime,
    entranceAnimationType,
    exitAnimationType,
    exitAnimationDuration,
    entranceAnimationDuration,
  });
};

const styles = StyleSheet.create({
  roundedNotification: {
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },

  materialNotification: {
    paddingVertical: 20,
  },

  iconNotification: {
    paddingVertical: 10,
  },
});
