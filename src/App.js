/* @flow */

import React, { Component } from 'react';
import { View, DeviceEventEmitter } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import RootNavigator from './RootNavigator';
import RootTabs from './RootTabs';
import SceneTodoCircles from './components/SceneTodoCircles';
import SceneArchives from './components/SceneArchives';
import SceneSettings from './components/SceneSettings';
import { ImageView, Color } from './components/common';
import TodoListImage from './assets/img/todo_list.png';
import StatsImage from './assets/img/stats.png';
import SettingsImage from './assets/img/settings.png';
import PushNotification from 'react-native-push-notification'

const initPushNotification = () => {
  PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: (/*token*/) => {
        // console.log( 'TOKEN:', token );
      },
      // (required) Called when a remote or local notification is opened or received
      onNotification: (/*notification*/) => {
          // console.log( 'NOTIFICATION:', notification );
      },
      // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
      senderID: "806030056707",
      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
          alert: true,
          badge: true,
          sound: true
      },
      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,
      /**
        * (optional) default: true
        * - Specified if permissions (ios) and token (android and ios) will requested or not,
        * - if not, you must call PushNotificationsHandler.requestPermissions() later
        */
      requestPermissions: true,
  });

  PushNotification.registerNotificationActions(['Get', 'Abandone']);
  DeviceEventEmitter.addListener('notificationActionReceived', (/*action*/) => {
    // const info = JSON.parse(action.dataJSON);
    // if (info.action == 'Get') {
    //
    // } else if (info.action == 'Abandone') {
    //
    // }
  });
};

class App extends Component {
  componentDidMount() {
    initPushNotification();
  }

  renderScene(sceneName: string) {
    switch (sceneName) {
      case 'scene_todo_circles':
        return <SceneTodoCircles />

      case 'scene_archives':
        return <SceneArchives />

      case 'scene_settings':
      default:
        return <SceneSettings />
    }
  }

  renderTabIcon(tabIndex: string, isSelected: boolean) {
    const { iconStyle, highlightingStyle, iconImageMap } = styles;
    const iconImage = iconImageMap[tabIndex];

    return (
      (isSelected) ?
        <ImageView
          imageSource={iconImage}
          imageStyle={{ ...iconStyle, ...highlightingStyle }}
        /> :
        <ImageView
          imageSource={iconImage}
          imageStyle={iconStyle}
        />
    )
  }

  render() {
    const { containerStyle } = styles;

    return (
      <Provider store={ createStore(reducers, applyMiddleware(thunk)) }>
        <View style={containerStyle}>
          <RootTabs
            renderTabIcon={this.renderTabIcon.bind(this)}
          />
          <RootNavigator
            renderScene={this.renderScene.bind(this)}
          />
        </View>
      </Provider>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    backgroundColor: Color.Background,
  },
  iconImageMap: {
    '0': TodoListImage,
    '1': StatsImage,
    '2': SettingsImage
  },
  iconStyle: {
    width: 20,
    height: 20,
    tintColor: Color.Deactivated,
  },
  highlightingStyle: {
    tintColor: Color.White
  }
};

export default App;
