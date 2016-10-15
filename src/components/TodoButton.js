/* @flow */

import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { TouchableWithPressEffect } from './common';
import doneBlackImage from './img/done_black.png';
import doneWhiteImage from './img/done_white.png';
import closeBlackImage from './img/close_black.png';
import closeWhiteImage from './img/close_white.png';

type Props = {
  type: 'close' | 'done'
};

class TodoButton extends Component {
  state: {
    condition: 'normal' | 'pressed';
  };
  iconMap: Object;

  constructor(props: Props) {
    super(props);

    this.state = {
      condition: 'normal'
    };

    this.iconMap = {
      close: { normal: closeWhiteImage, pressed: closeBlackImage },
      done: { normal: doneWhiteImage, pressed: doneBlackImage }
    };
  }

  onPressIn() {
    this.setState({ condition: 'pressed' });
  }

  render() {
    const { type = 'close' } = this.props;
    const { containerStyle } = styles;

    const iconImage = this.iconMap[type][this.state.condition];

    return (
      <TouchableWithPressEffect onPressIn={this.onPressIn.bind(this)}>
        <View style={containerStyle}>
          <Image source={iconImage} />
        </View>
      </TouchableWithPressEffect>
    );
  }
}

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
