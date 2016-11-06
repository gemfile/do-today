import React, { Component } from 'react';
import { Color, ImageView } from './common';
import { MKButton } from 'react-native-material-kit';
import DeleteImage from './img/delete.png';

const PlainFab = MKButton.plainFab().withBackgroundColor('argb(255, 255, 255, 0)').build();

class PomodoroButtonRemove extends Component
{
  onPress() {

  }

  render() {
    const { deleteImageStyle, buttonStyle } = styles;

    return (
      <PlainFab style={buttonStyle} onPress={this.onPress.bind(this)}>
        <ImageView imageSource={DeleteImage} imageStyle={deleteImageStyle} />
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
    alignItems: 'center'
  },
  deleteImageStyle: {
    tintColor: Color.White,
    width: 24,
    height: 24
  },
};

export default PomodoroButtonRemove;
