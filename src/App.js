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
    return (
      <Provider store={createStore(reducers, applyMiddleware(thunk))}>
        <View style={styles.containerStyle}>
          <RootNavigator style={{ zIndex: 1 }} />
          <RootTabs style={{ zIndex: 0 }} />
        </View>
      </Provider>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1
  }
};

export default App;
