class AnimatedValueSubscription {
  constructor(animatedValue, callback) {
    this.animatedValue = animatedValue;
    this.token = animatedValue.addListener(callback);
  }

  remove() {
    this.animatedValue.removeListener(this.token);
  }
}

export default AnimatedValueSubscription;
