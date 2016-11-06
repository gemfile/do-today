/* @flow */

import React, { Component } from 'react';
import { Color, ImageView } from './common';
import { MKButton } from 'react-native-material-kit';
import WriteImage from './img/write.png';

const PlainFab = MKButton.plainFab().withBackgroundColor('argb(255, 255, 255, 0)').build();

class PomodoroButtonAdd extends Component
{
  props: {
    onAddClick: () => void
  }

  render() {
    const { writeImageStyle, buttonStyle } = styles;

    return (
      <PlainFab style={buttonStyle} onPress={this.props.onAddClick}>
        <ImageView imageSource={WriteImage} imageStyle={writeImageStyle} />
      </PlainFab>
    );
  }
}

const styles = {
  buttonStyle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  writeImageStyle: {
    tintColor: Color.White,
    width: 22,
    height: 22
  },
};

export default PomodoroButtonAdd;
