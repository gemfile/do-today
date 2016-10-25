/* @flow */

import { Animated } from 'react-native';

class AnimatedValueSubscription {
  animatedValue: Animated.Value;
  token: string;

  constructor(animatedValue: Animated.Value, callback: (animatedData: Object) => void) {
    this.animatedValue = animatedValue;
    this.token = animatedValue.addListener(callback);
  }

  remove() {
    this.animatedValue.removeListener(this.token);
  }
}

export default AnimatedValueSubscription;
