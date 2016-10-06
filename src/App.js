import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { Header } from './components/common';
import Writing from './components/Writing';
import ListingOfTodo from './components/ListingOfTodo';

const App = () => {
  const {
    writingContainerStyle,
    listingContainerStyle,
    wholeContainerStyle
  } = styles;

  return (
    <Provider store={createStore(reducers, applyMiddleware(thunk))}>
      <View style={wholeContainerStyle}>
        <Header headerText="TODO TODAY" />

        <View style={writingContainerStyle}>
          <Writing />
        </View>

        <View style={listingContainerStyle}>
          <ListingOfTodo />
        </View>
      </View>
    </Provider>
  );
};

const styles = {
  wholeContainerStyle: {
    flex: 1,
    backgroundColor: '#eee'
  },
  writingContainerStyle: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10
  },
  listingContainerStyle: {
    flex: 1,
    marginBottom: 11,
    marginLeft: 10,
    marginRight: 10
  }
};

export default App;
