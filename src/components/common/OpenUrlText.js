/* @flow */

import React, { Component } from 'react';
import {
  Linking,
  Animated,
  Easing
} from 'react-native';

type Props = {
  text: string,
  url: string
};

class OpenUrlText extends Component {
  props: Props;
  colorAnimation: Animated.Value;

  constructor(props: Props) {
    super(props);

    this.colorAnimation = new Animated.Value(0);
  }

  handleClick = () => {
    const { colorAnimation } = this;

    colorAnimation.setValue(0);
    Animated.timing(colorAnimation, {
      toValue: 100,
      easing: Easing.quad,
      duration: 100
    }).start( () => {
      Animated.timing(colorAnimation, {
        toValue: 0,
        easing: Easing.elastic(1),
        duration: 295
      }).start();
    });

    const { url } = this.props;

    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        // console.log('Don\'t know how to open URI: ' + url);
      }
    });
  };

  render() {
    const { textStyle } = styles;
    const color = this.colorAnimation.interpolate({
      inputRange: [0, 100],
      outputRange: ['rgba(85, 142, 252, 1.0)', 'rgba(168, 0, 252, 1.0)']
    });

    return (
      <Animated.Text
        onPress={this.handleClick}
        style={[ textStyle, { color } ]}
      >
        {this.props.text}
      </Animated.Text>
    );
  }
}

const styles = {
  textStyle: {
    color: '#558efc',
    textDecorationLine: 'underline',
    padding: 10,
  },
};

export { OpenUrlText };
