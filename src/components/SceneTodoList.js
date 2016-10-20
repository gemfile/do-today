import React, { Component } from 'react';
import { View } from 'react-native'
import Writing from './Writing';
import TodoList from './TodoList';
import { Color } from './common';

class SceneTodoList extends Component {
  state = {
    width: 0
  };

  render() {
    const {
      writingContainerStyle,
      listingContainerStyle,
      wholeContainerStyle,
      listMenuStyle
    } = styles;

    return (
      <View
        style={wholeContainerStyle}
        onLayout={ event => {
          this.setState({ width: event.nativeEvent.layout.width });
        }}
      >
        <View style={writingContainerStyle}>
          <Writing />
        </View>

        <View style={listingContainerStyle}>
          <TodoList />
        </View>

        <View style={[listMenuStyle, {width: this.state.width}]}>
        </View>
      </View>
    );
  }
}

const styles = {
  wholeContainerStyle: {
    flex: 1,
    backgroundColor: Color.Background,
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
  },
  listMenuStyle: {
    flex: 1,
    height: 48,
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    bottom: 0
  }
};

export default SceneTodoList;
