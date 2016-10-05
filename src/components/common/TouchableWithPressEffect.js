import React, { Component } from 'react';
import { TouchableWithoutFeedback, Animated, Easing } from 'react-native';

const MAX_BOUNCE = 0.87;

class TouchableWithPressEffect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bounceValue: new Animated.Value(1)
    };
  }

  onPress() {
    this.state.bounceValue.setValue(MAX_BOUNCE);
    Animated.spring(this.state.bounceValue, {
      toValue: 1,
      friction: 7,
    }).start();

    const { onPress } = this.props;
    if (onPress) {
      onPress();
    }
  }

  onPressIn() {
    Animated.timing(this.state.bounceValue, {
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
                   transform: [{ scale: this.state.bounceValue }] }}
        >
          { this.props.children }
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}

export { TouchableWithPressEffect };
