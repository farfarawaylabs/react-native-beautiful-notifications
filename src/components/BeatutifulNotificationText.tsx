import React from 'react';
import { Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';

interface BeautifulNotificationTextProps {
  /**
   * Additional styles or styles to override default style
   */
  style?: StyleProp<ViewStyle>;
}

/** description */
const BeautifulNotificationText: React.FC<BeautifulNotificationTextProps> = ({
  style,
  children,
  ...rest
}) => {
  return (
    <Text style={[styles.text, style]} {...rest}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    color: '#FFF',
    fontSize: 18,
  },
});

export default BeautifulNotificationText;
