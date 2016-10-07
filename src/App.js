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

        <View style={writingContainerStyle}>
          <Writing />
        </View>

        <View style={listingContainerStyle}>
          <ListingOfTodo />
        </View>

        <Header />

      </View>
    </Provider>
  );
};

const styles = {
  wholeContainerStyle: {
    flex: 1,
    backgroundColor: '#eee',
  },
  writingContainerStyle: {
    borderWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  listingContainerStyle: {
    flex: 1,
  }
};

export default App;
