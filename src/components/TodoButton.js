import React from 'react';
import { View, Image } from 'react-native';
import { TouchableWithPressEffect } from './common';
import doneImage from './img/done.png';

const TodoButton = () => {
  const { containerStyle } = styles;
  return (
    <TouchableWithPressEffect>
      <View style={containerStyle}>
        <Image source={doneImage} />
      </View>
    </TouchableWithPressEffect>
  );
};

const styles = {
  containerStyle: {
    width: 24,
    height: 24,
    backgroundColor: '#eee',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  }
};

export default TodoButton;
