import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Dimensions,
  TouchableWithoutFeedback,
  ViewProperties,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

const DEFAULT_NOTIFICATION_WIDTH = Dimensions.get('window').width * 0.9;

/**
 * Calculates the notification width based on default or user provided style prop
 * @param {object} containerWidth The width was passed to the notification or null
 */
function calculateNotificationWidth(
  containerWidth: string | number | undefined
) {
  let notificationWidth: string | number = DEFAULT_NOTIFICATION_WIDTH;

  // If we were provided a style prop and a width style in it
  if (containerWidth) {
    // If the provided value is in percantage
    if (typeof containerWidth !== 'number' && containerWidth.includes('%')) {
      notificationWidth =
        (Dimensions.get('window').width *
          parseInt(containerWidth.replace('%', ''), 10)) /
        100;
    } else {
      // Provided value was as a number
      notificationWidth = containerWidth;
    }
  }

  return notificationWidth;
}

interface BeautifulNotificationProps extends ViewProperties {
  /** The type of animation to be used when showing the notification. Default to fadeIn animation.
   *  See react-native-animatable for possible value */
  entranceAnimationType?: Animatable.Animation;

  /** The type of animation to be used when hiding the notification. Defaults to fadeOut animation.
   *  See react-native-animatable for possible value */
  exitAnimationType?: Animatable.Animation;

  /** the duration of the entrance animation in miliseconds. Default to 1 seocnd */
  entranceAnimationDuration?: number;

  /** the duration of the exit animation in miliseconds. Default to 1 seocnd */
  exitAnimationDuration?: number;

  /** The number of milliseconds after which the notification will auto disappear. 0 means it will stay until the user press it. Default to 0. */
  disappearAutomaticallyAfter?: number;

  /** The width of the notification. You can pass a number or a percantage string like '80% */
  containerWidth?: number | string;

  /** For internal use only. */
  onDisappear?: () => void;

  /** Additional styles or styles to override default style */
  style?: StyleProp<ViewStyle>;
}

/**
 * A notification component
 */
const BeautifulNotification: React.FC<BeautifulNotificationProps> = ({
  entranceAnimationType = 'fadeIn',
  exitAnimationType = 'fadeOut',
  entranceAnimationDuration = 1000,
  exitAnimationDuration = 1000,
  disappearAutomaticallyAfter = 0,
  containerWidth,
  style,
  children,
  onDisappear,
  ...rest
}) => {
  const [
    shouldDissapearAutoamtically,
    setShouldDissapearAutomatically,
  ] = useState(false);
  const viewRef = useRef(null);
  const notificationWidth = calculateNotificationWidth(containerWidth);

  // This effect controls the start of the animations
  useEffect(() => {
    const animtableView: any = viewRef.current!;
    animtableView.animate(entranceAnimationType, entranceAnimationDuration);

    return () => {};
  }, [entranceAnimationType, entranceAnimationDuration]);

  // This effect controls the end of the animations
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (shouldDissapearAutoamtically) {
      timer = setTimeout(() => {
        const animtableView: any = viewRef.current!;

        animtableView
          .animate(exitAnimationType, exitAnimationDuration)
          .then(() => {
            if (onDisappear) onDisappear();
          });
      }, 1);
    } else if (disappearAutomaticallyAfter > 0) {
      timer = setTimeout(() => {
        const animtableView: any = viewRef.current!;

        animtableView
          .animate(exitAnimationType, exitAnimationDuration)
          .then(() => {
            if (onDisappear) onDisappear();
          });
      }, disappearAutomaticallyAfter);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [
    disappearAutomaticallyAfter,
    exitAnimationDuration,
    exitAnimationType,
    shouldDissapearAutoamtically,
    onDisappear,
  ]);

  const onPress = () => {
    setShouldDissapearAutomatically(true);
  };

  return (
    <Animatable.View
      ref={viewRef}
      style={[styles.container, { width: notificationWidth }, style]}
      {...rest}
    >
      <TouchableWithoutFeedback onPress={() => onPress()}>
        <View style={styles.touchContainer}>{children}</View>
      </TouchableWithoutFeedback>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: '#000',
    padding: 10,
    marginVertical: 5,
  },

  touchContainer: {
    width: '100%',
  },
});

export default BeautifulNotification;
