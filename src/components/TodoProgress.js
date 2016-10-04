import React, { Component } from 'react';
import { View } from 'react-native';

class TodoProgress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      ratio: props.ratio
    };
  }

  onLayout(event) {
    const { width } = event.nativeEvent.layout;
    this.setState({ width });
  }

  render() {
    const { emptyBarStyle, barStyle } = styles;
    const width = this.state.width * this.state.ratio;
    return (
      <View style={emptyBarStyle} onLayout={this.onLayout.bind(this)}>
        <View style={{ ...barStyle, width }} />
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
