/* @flow */

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Color } from './common';
import CanvasView from './native/CanvasView';

const WIDTH_OF_CIRCLE = 300;
const HEIGHT_OF_CIRCLE = 300;
const WIDTH_OF_STROKE = 12;

type Props = {
  todo: Object,
  style: {
    width: number,
    height: number,
  }
}
type State = {
  widthOfText: number
}

class TodoCircle extends Component {
  props: Props;
  state: State;

  state = {
    widthOfText: 0
  };

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    const { widthOfText } = this.state;
    const { widthOfText: nextWidthOfText } = nextState;
    const { width, height } = this.props.style;
    const { width: nextWidth, height: nextHeight } = nextProps.style;

    return ( width !== nextWidth || height !== nextHeight || widthOfText !== nextWidthOfText );
  }

  render() {
    const { containerStyle, textStyle, rotate } = styles;
    const { width, height } = this.props.style;
    const halfWidthOfText = this.state.widthOfText/2;

    return (
      <View
        style={[
          containerStyle,
          {
            width: height,
            height: width,
            transform: [
              {translateY: (height - width)},
            ]
          }
        ]}>
        <CanvasView
          angle={360.0 * 0.1}
          frontColor={Color.White}
          doneColor={Color.Red}
          headColor={Color.Green}
          strokeWidth={WIDTH_OF_STROKE}
          height={WIDTH_OF_CIRCLE}
          width={HEIGHT_OF_CIRCLE}
          style={rotate}
        />
        <Text
          style={[
            textStyle,
            rotate,
            { left: -halfWidthOfText + height/2, bottom: halfWidthOfText+width/2-halfWidthOfText-13 }
          ]}
          onLayout={event => {
            this.setState({
              widthOfText: event.nativeEvent.layout.width
            });
          }}
        >
          {this.props.todo.title}
        </Text>
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    margin: 0,
    backgroundColor: Color.Background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    position: 'absolute',
    color: 'white',
    fontSize: 20
  },
  rotate: {
    transform: [{ rotate: '-90deg' }]
  }
}

export default TodoCircle;
