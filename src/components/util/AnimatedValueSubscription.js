/* @flow */

import { Animated } from 'react-native';

class AnimatedValueSubscription {
  animatedValue: Animated.Value;
  token: string;
  enabled: boolean;

  constructor(
    animatedValue: Animated.Value,
    callback: (animatedData: Object) => void,
    enabled: boolean = true
  ) {
    this.animatedValue = animatedValue;
    this.token = animatedValue.addListener((animatedData: Object) => {
      if (this.enabled) { callback(animatedData) }
    });
    this.enabled = enabled;
  }

  remove() {
    this.animatedValue.removeListener(this.token);
  }

  enable(value: boolean) {
    this.enabled = value;
  }
}

export default AnimatedValueSubscription;
