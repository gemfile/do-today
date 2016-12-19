/* @flow */

import React, { Component } from 'react';
import { TouchableWithoutFeedback, Animated, Easing } from 'react-native';

const MAX_BOUNCE = 0.87;

type Props = {
  style: Object,
  onPress: ()=>void,
  onPressIn: ()=>void,
  children?: React.Element<*>
};

class TouchableWithPressEffect extends Component {
  bounceValue: Animated.Value

  constructor(props: Props) {
    super(props);
    this.bounceValue = new Animated.Value(1);
  }

  onPress() {
    this.bounceValue.setValue(MAX_BOUNCE);
    Animated.spring(this.bounceValue, {
      toValue: 1,
      friction: 7,
    }).start();

    const { onPress } = this.props;
    if (onPress) {
      onPress();
    }
  }

  onPressIn() {
    Animated.timing(this.bounceValue, {
      toValue: MAX_BOUNCE,
      easing: Easing.cubic,
      duration: 100
    }).start();

    const { onPressIn } = this.props;
    if (onPressIn) {
      onPressIn();
    }
  }

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={this.onPress.bind(this)}
        onPressIn={this.onPressIn.bind(this)}
      >
        <Animated.View
          style={{ ...this.props.style,
            transform: [{ scale: this.bounceValue }] }}
        >
          { this.props.children }
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}

export { TouchableWithPressEffect };
