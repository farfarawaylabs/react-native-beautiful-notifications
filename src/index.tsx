import { NativeModules } from 'react-native';

type ReactNativeBeautifulNotificationsType = {
  multiply(a: number, b: number): Promise<number>;
};

const { ReactNativeBeautifulNotifications } = NativeModules;

export default ReactNativeBeautifulNotifications as ReactNativeBeautifulNotificationsType;
