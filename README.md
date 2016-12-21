[![dependencies](https://david-dm.org/gemfile/do-today.svg)](https://david-dm.org/gemfile/do-today)
[![react-native](https://img.shields.io/badge/react--native-v0.39.2-05A5D1.svg)](https://facebook.github.io/react-native)
[![gitter](https://img.shields.io/gitter/room/nwjs/nw.js.svg)](https://gitter.im/do-today/Lobby)
[![buddybuild](https://dashboard.buddybuild.com/api/statusImage?appID=581045aafe5e8501000ad4e6&branch=master&build=latest)](https://dashboard.buddybuild.com/apps/581045aafe5e8501000ad4e6/build/latest)

# Do Today

[Pomodoro](https://en.wikipedia.org/wiki/Pomodoro_Technique) App written in React Native for demo purpose. (available only on Android)

## Features
- Make a task
- Set the timer
- Focus
- Get the pomodoro
- Record a task

## To do
- Visualize what I've done
- Running on iOS

## Plugins used

- [redux](https://github.com/reactjs/redux)
- [redux-thunk](https://github.com/gaearon/redux-thunk)
- [immutable-js](https://github.com/facebook/immutable-js/)
- [react-native-activity-android](https://github.com/jaysoo/react-native-activity-android)
- [react-native-device-info](https://github.com/rebeccahughes/react-native-device-info)
- [react-native-firestack](https://github.com/fullstackreact/react-native-firestack)
- [react-native-indicator](https://github.com/wangdicoder/react-native-indicator)
- [react-native-material-kit](https://github.com/xinthink/react-native-material-kit)
- [react-native-push-notification](https://github.com/zo0r/react-native-push-notification)
- [react-native-sound](https://github.com/zmxv/react-native-sound)

## Running
#### Clone & install

- Clone this repo `git clone git@github.com:gemfile/do-today.git`
- Run `cd do-today; npm install`

#### Android

- Run `android avd` and start an emulator
- Run `cd android; ./gradlew installRelease`

#### iOS

- Not available yet.
