import React, { Component } from 'react';
import { View, Text } from 'react-native';

class SceneBoilerplate extends Component {
  render() {
    const { containerStyle, textStyle } = styles;

    return (
      <View style={containerStyle}>
        <Text style={textStyle}>
          Not implemented yet.
        </Text>
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    color: 'white'
  }
}

export default SceneBoilerplate;
