import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';
import { Header } from './components/common';
import Writing from './components/Writing';
import Listing from './components/Listing';

const App = () => (
  <Provider store={createStore(reducers)}>
    <View style={{ flex: 1 }}>
      <Header headerText="TODO TODAY" />
      <Writing />
      <Listing />
    </View>
  </Provider>
);

export default App;
