# @farfarawaylabs/react-native-beautiful-notifications

Highly customizable UI library to show animatable and highly customizable toast style notifications in React Native.

## Installation

This library is using the awesome react-native-animatable for all animations, you should install it as well.
https://github.com/oblador/react-native-animatable

** Please note: ** Starting version 2.0.0 this library is is using the popular react-native-vector-icons to support showing icons inside notifications. If you are using version 2 and up, please follow the installaitions instructions of react-native-vector-icons here: https://github.com/oblador/react-native-vector-icons#installation

If you want to use this library without this dependency, please use any version between 1.0.0 and 2.0.0. You can also checkout the Tag V1.0.0 from this repository.

```sh
npm install @farfarawaylabs/react-native-beautiful-notifications
```

## Demo

Please note that the following is an animated gif which is why the animations looks "choppy".
You can also download this repository and run the exmaple project using:
yarn example ios
yarn example android

<img width="300" height="600" src="https://github.com/nechmads/demo_images/blob/master/fflabs_react_native_beautiful_animations/demo2.gif?raw=true">

## Architecture and design choices

The goal was to create a highly customizable notifications while at the same time allow ease of usage with some sensible defaults.
This library also support showing multiple notifications, even with different styles, at the same time.

As such, there are multiple ways you can show a notification:

- using helper "API" methods such as showRoundedTextNotification, showMaterialStyleTextNotification, showErrorNotifications and others.
  Even when using these helper methods, you can still further customize the look of the notification if you want.

- Using the more generic showNotification method which allows you to customize all aspects of the notification.

- using the showNotification method and providing it with your own UI element as notification. This allows you to create a totally new notification UI while still enjoying the animations, dislay/hide infrastructure of this library.
  You can also use the BeautifulNotification element as a starting point for your own UI.

## How to use this library?

All you need to do is render a Billboard component somewhere in your app tree, ideally somewhere in the top.
Then simply use one of the API methods to add notifications to it. The Billboard will be display above all of your app UI and will hide itself automatically when there are no notifications to show.

```js
import {
    Billboard,
    NOTIFICATIONS_POSITION,
} from '@farfarawaylabs/react-native-beautiful-notifications';

export default function App() {
  return (
    <View style={styles.container}>
      <Billboard position={NOTIFICATIONS_POSITION.TOP} />
    </View>
  );
```

You can customize most notifications with the following props (see exmaple project for exmaple code). All the props has some default values so you can decide what to customize and what to leave as is.

- text: The text of the notification. If you pass this prop, the notificationUI one will be ignored

- textStyle: Additional styles to attach to the text element of the notification

- width: The notification component width

- autoDisappearTime: The number of milliseconds after which the notification will auto disappear. 0 means it will stay until the user press it.

- entranceAnimationType: The type of animation to be used when showing the notification. Default to fadeIn animation.

- entranceAnimationDuration: the duration of the entrance animation in miliseconds.

- exitAnimationType: The type of animation to be used when hiding the notification.

- exitAnimationDuration: the duration of the exit animation in miliseconds.

- notificationUI: Pass your own custom notification element. If this prop is passed, the text prop will be ignored

- style: Additional styles to attach to the notification component

## API methods to show a notification

### showNotification

Show a notification and have full control on how to cuztomize it.

```js
import {
    Billboard,
    NOTIFICATIONS_POSITION,
} from '@farfarawaylabs/react-native-beautiful-notifications';

export default function App() {
  return (
    <View style={styles.container}>
      <Billboard position={NOTIFICATIONS_POSITION.TOP} />
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
    </View>
  );
```

### showNotificartionWithIcon

Very similar to showNotification, this method accpet the same props plus props to control the icon itself.
It allows you to also show an icon on the notification.

```js
import {
    Billboard,
    NOTIFICATIONS_POSITION,
} from '@farfarawaylabs/react-native-beautiful-notifications';

export default function App() {
  return (
    <View style={styles.container}>
      <Billboard position={NOTIFICATIONS_POSITION.TOP} />
      <Button
        title="Add Notification With Icon"
        onPress={() => {
          showNotificationWithIcon({
            text: 'This notification has an icon',
            iconType: 'font-awesome',
            iconName: 'smile-o',
            iconColor: '#FFF',
            iconSize: 36,
            autoDisappearTime: 2000,
          });
        }}
      />
    </View>
  );
```

### showRoundedNotification

Show a notification with a rounded style

```js
import {
    Billboard,
    NOTIFICATIONS_POSITION,
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
            autoDisappearTime: 5000,
          });
        }}
      />
    </View>
  );
```

### showMaterialStyleTextNotification

Show a notification with a Material style look

```js
import {
    Billboard,
    NOTIFICATIONS_POSITION,
} from '@farfarawaylabs/react-native-beautiful-notifications';

export default function App() {
  return (
    <View style={styles.container}>
      <Billboard position={NOTIFICATIONS_POSITION.TOP} />
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
    </View>
  );
```

### showErrorNotification

Show a notification styles as an error notification

```js
import {
    Billboard,
    NOTIFICATIONS_POSITION,
} from '@farfarawaylabs/react-native-beautiful-notifications';

export default function App() {
  return (
    <View style={styles.container}>
      <Billboard position={NOTIFICATIONS_POSITION.TOP} />
      <Button
        title="Add Error Notification"
        onPress={() => {
          showErrorNotification({ text: 'This is an error message' });
        }}
      />
    </View>
  );
```

### showWarningNotification

Show a notification styles as a warning notification

```js
import {
    Billboard,
    NOTIFICATIONS_POSITION,
} from '@farfarawaylabs/react-native-beautiful-notifications';

export default function App() {
  return (
    <View style={styles.container}>
      <Billboard position={NOTIFICATIONS_POSITION.TOP} />
      <Button
        title="Add Warning Notification"
        onPress={() => {
          showWarningNotification({ text: 'This is just a warning' });
        }}
      />
    </View>
  );
```

### showInfoNotification

Show a notification styles as an information notification

```js
import {
    Billboard,
    NOTIFICATIONS_POSITION,
} from '@farfarawaylabs/react-native-beautiful-notifications';

export default function App() {
  return (
    <View style={styles.container}>
      <Billboard position={NOTIFICATIONS_POSITION.TOP} />
     <Button
        title="Add an Info Notification"
        onPress={() => {
          showInfoNotification({ text: 'This is just a for your information' });
        }}
      />
    </View>
  );
```

### showNotification: Show your own UI element as a notification

```js
import {
    Billboard,
    NOTIFICATIONS_POSITION,
} from '@farfarawaylabs/react-native-beautiful-notifications';

export default function App() {
  return (
    <View style={styles.container}>
      <Billboard position={NOTIFICATIONS_POSITION.TOP} />
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
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
