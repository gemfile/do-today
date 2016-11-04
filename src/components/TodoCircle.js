/* @flow */

import React, { Component } from 'react';
import { View, Text, Animated, Easing } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { clearPomodoro } from 'actions';
import { Color } from './common';
import CanvasView from './native/CanvasView';
import AnimatedValueSubscription from './util/AnimatedValueSubscription';

const WIDTH_OF_CIRCLE = 300;
const HEIGHT_OF_CIRCLE = 300;
const WIDTH_OF_STROKE = 12;

type Props = {
  todo: Object,
  style: {
    width: number,
    height: number,
  },
  pomodoroState: {
    currentState: '' | 'started' | 'stopped',
    currentPage: number,
    nextState: '' | 'started' | 'stopped',
  },
  clearPomodoro: () => Object,
  loaded: boolean,
}
type State = {
  widthOfText: number,
  progress: number,
}

class TodoCircle extends Component {
  props: Props;
  state: State;
  timer: number;
  animatedValueForProgress: Animated.Value;
  progressListener: AnimatedValueSubscription;
  secondsLeft: number;
  fullSeconds: number;

  constructor(props) {
    super(props);

    const minutesAtATime = 1;
    const secondsLeft = minutesAtATime * 60;
    this.state = {
      widthOfText: 0,
      progress: 0
    };

    this.secondsLeft = secondsLeft;
    this.fullSeconds = secondsLeft;
    this.animatedValueForProgress = new Animated.Value(0);
    this.progressListener = new AnimatedValueSubscription(
      this.animatedValueForProgress,
      (data: Object) => {
        this.setState({ progress: data.value });
      }
    );
  }

  componentWillReceiveProps(nextProps) {
    const started =
      this.props.pomodoroState.currentState === '' &&
      nextProps.pomodoroState.currentState === 'started';
    const stopped =
      this.props.pomodoroState.currentState === 'started' &&
      nextProps.pomodoroState.currentState === 'stopped';

    if (nextProps.loaded) {
      if (started) {
        this.animateProgress(-1);

        this.timer = setInterval(
          () => {
            const nextSecondsLeft = this.animateProgress(-1);
            if (nextSecondsLeft <= 0) {
              clearInterval(this.timer);
            }
          },
          1000
        );
      }
      if (stopped) {
        this.animateProgress(this.fullSeconds - this.secondsLeft);
        clearInterval(this.timer);
        this.props.clearPomodoro();
      }
    }
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    const { widthOfText, progress } = this.state;
    const { widthOfText: nextWidthOfText, progress: nextProgress } = nextState;

    const { width, height } = this.props.style;
    const { width: nextWidth, height: nextHeight } = nextProps.style;

    return (
      width !== nextWidth ||
      height !== nextHeight ||
      widthOfText !== nextWidthOfText ||
      progress !== nextProgress
    );
  }

  animateProgress(offset: number) {
    const nextSecondsLeft = this.secondsLeft + offset;
    this.secondsLeft = nextSecondsLeft;

    const progress = (this.fullSeconds - nextSecondsLeft) / this.fullSeconds;
    Animated.timing(this.animatedValueForProgress, {
      toValue: progress,
      easing: Easing.linear,
      duration: 1000
    }).start();

    return nextSecondsLeft;
  }

  render() {
    const { containerStyle, textStyle, rotate } = styles;
    const { width, height } = this.props.style;
    const { widthOfText, progress } = this.state;

    const halfWidthOfText = widthOfText / 2;

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
          angle={360 * progress}
          frontColor={Color.White}
          doneColor={Color.Red}
          headColor={Color.Red}
          strokeWidth={WIDTH_OF_STROKE}
          height={WIDTH_OF_CIRCLE}
          width={HEIGHT_OF_CIRCLE}
          style={rotate}
        />
        <Text
          style={[
            textStyle,
            rotate,
            { left: -halfWidthOfText + height/2, bottom: halfWidthOfText + width/2 - halfWidthOfText - 13 }
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
};

const mapStateToProps = ({ pomodoroState }, { todo }) => {
  const nextPomodoroState = pomodoroState.toObject();
  return {
    pomodoroState: nextPomodoroState,
    loaded: nextPomodoroState.currentPage === todo.index
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  clearPomodoro,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TodoCircle);
