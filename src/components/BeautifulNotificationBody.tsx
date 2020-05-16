import React from 'react';
import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import BeautifulIcon, { IconTypes } from './BeautifulIcon';
import BeautifulNotificationText from './BeatutifulNotificationText';

export interface BeautifulNotififcationBodyProps {
  /** The icon pack to get the icon from */
  iconType: IconTypes;

  /** The name of the icon to load */
  iconName: string;

  /** The size of the icon. Defaults to 36 */
  iconSize?: number;

  /** The icon color. Defaults to '#FFF' */
  iconColor: string;

  /** Additional styles for the icon in the notification */
  iconStyle?: StyleProp<TextStyle>;

  /** Additional styles for the text in the notification */
  textStyle?: StyleProp<TextStyle>;

  /** Additional styles or styles for the container of the notification */
  containerStyle?: StyleProp<ViewStyle>;
}

/** description */
const BeautifulNotififcationBody: React.FC<BeautifulNotififcationBodyProps> = ({
  iconType,
  iconName,
  iconSize = 36,
  iconColor = '#FFF',
  iconStyle,
  textStyle,
  containerStyle,
  children,
  ...rest
}) => {
  return (
    <View style={[styles.container, containerStyle]} {...rest}>
      <BeautifulIcon
        type={iconType}
        name={iconName}
        size={iconSize}
        color={iconColor}
        style={iconStyle}
      />
      <BeautifulNotificationText style={[styles.text, textStyle]}>
        {children}
      </BeautifulNotificationText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 20,
  },
  text: {
    color: '#FFF',
    fontSize: 20,
    width: '93%',
    marginLeft: 7,
  },
});

export default BeautifulNotififcationBody;
