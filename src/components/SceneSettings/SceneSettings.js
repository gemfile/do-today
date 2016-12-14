import React, { Component } from 'react';
import { View, Text } from 'react-native';

class SceneSettings extends Component {
  render() {
    const { containerStyle, textStyle } = styles;

    // <div>Icons made by <a href="http://www.flaticon.com/authors/madebyoliver" title="Madebyoliver">Madebyoliver</a> from <a href="http://www.flaticon.com" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>

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

export default SceneSettings;
