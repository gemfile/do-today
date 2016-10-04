import React, { Component } from 'react';
import { View, Animated, Easing } from 'react-native';

class TodoProgress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      filledWidth: new Animated.Value(0)
    };
  }

  onLayout(event) {
    const { width } = event.nativeEvent.layout;
    this.setState({ width });
  }

  render() {
    const { emptyBarStyle, barStyle } = styles;
    const filledWidth = this.state.width * this.props.ratio;
    Animated.timing(this.state.filledWidth, {
      toValue: filledWidth,
      easing: Easing.linear,
      duration: 1000
    }).start();

    return (
      <View style={emptyBarStyle} onLayout={this.onLayout.bind(this)}>
        <Animated.View style={{ ...barStyle, width: this.state.filledWidth }} />
      </View>
    );
  }
}

const styles = {
  emptyBarStyle: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 1,
    flexDirection: 'row'
  },
  barStyle: {
    borderRadius: 1,
    backgroundColor: 'rgba(255, 0, 0, 0.6)'
  }
};

export default TodoProgress;
