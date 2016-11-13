/* @flow */

import React, { Component } from 'react';
import { View, DeviceEventEmitter } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { deviceInfoLogger } from './components/util/DeviceInfoLogger';
import RootNavigator from './RootNavigator';
import RootTabs from './RootTabs';
import SceneTodoCircleList from './components/SceneTodoCircleList';
import { ImageView, Color } from './components/common';
import TodoListImage from './components/img/todo_list.png';
import StatsImage from './components/img/stats.png';
import PushNotificationAndroid from 'react-native-push-notification'

class App extends Component {
  componentDidMount() {
    deviceInfoLogger();

    // Register all the valid actions for notifications here and add the action handler for each action
    PushNotificationAndroid.registerNotificationActions(['Stop']);
    DeviceEventEmitter.addListener('notificationActionReceived', action => {
      const info = JSON.parse(action.dataJSON);
      if (info.action == 'Stop') {
      } else if (info.action == 'Play') {
      }
    });
  }

  renderScene(sceneName: string) {
    switch (sceneName) {
      case 'scene_todo_list':
        return <SceneTodoCircleList />

      case 'scene_todo':
      default:
        return (
          <View />
        );
    }
  }

  renderTabIcon(tabIndex: string, isSelected: boolean) {
    const { iconStyle, highlightingStyle, iconImageMap } = styles;
    const iconImage = iconImageMap[tabIndex];

    return (
      (isSelected) ?
        <ImageView
          imageSource={iconImage}
          imageStyle={{...iconStyle, ...highlightingStyle}}
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
      <Provider store={createStore(reducers, applyMiddleware(thunk))}>
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
    '1': StatsImage
  },
  iconStyle: {
    width: 24,
    height: 24,
    tintColor: Color.Clickable
  },
  highlightingStyle: {
    tintColor: Color.Red
  }
};

export default App;
