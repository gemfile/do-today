/* @flow */

import React, { Component } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import RootNavigator from './components/RootNavigator';
import RootTabs from './components/RootTabs';

class App extends Component {
  render() {
    const { navigatorStyle, tabsStyle } = styles;

    return (
      <Provider store={createStore(reducers, applyMiddleware(thunk))}>
        <View style={styles.containerStyle}>
          <RootNavigator style={navigatorStyle} />
          <RootTabs style={tabsStyle} />
        </View>
      </Provider>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1
  },
  navigatorStyle: {
    zIndex: 1
  },
  tabsStyle: {
    zIndex: 0
  }
};

export default App;
