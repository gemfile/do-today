/* @flow */

import React, { Component } from 'react';
import { View, Text, Animated, Easing } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { clearPomodoro } from 'actions';
import { Color } from './common';
import CanvasView from './native/CanvasView';
import AnimatedValueSubscription from './util/AnimatedValueSubscription';
import { secondsToMinutes } from './util/TimeFormat';

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
  widthOfTitle: number,
  heightOfTitle: number,
  widthOfTime: number,
  heightOfTime: number,
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
      widthOfTitle: 0,
      heightOfTitle: 0,
      widthOfTime: 0,
      heightOfTime: 0,
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
    const { widthOfTitle, widthOfTime, progress } = this.state;
    const {
      widthOfTitle: nextWidthOfTitle,
      widthOfTime: nextWidthOfTime,
      progress: nextProgress
    } = nextState;

    const { width, height } = this.props.style;
    const { width: nextWidth, height: nextHeight } = nextProps.style;

    return (
      width !== nextWidth ||
      height !== nextHeight ||
      widthOfTitle !== nextWidthOfTitle ||
      widthOfTime !== nextWidthOfTime ||
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
    const { containerStyle, titleTextStyle, timeTextStyle, rotate } = styles;
    const { width, height } = this.props.style;
    const {
      widthOfTitle,
      heightOfTitle,
      widthOfTime,
      heightOfTime,
      progress
    } = this.state;

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
            titleTextStyle,
            rotate,
            { left: (height-widthOfTitle)/2, bottom: (width-heightOfTitle)/2 }
          ]}
          onLayout={event => {
            const layout = event.nativeEvent.layout;
            this.setState({
              widthOfTitle: layout.width,
              heightOfTitle: layout.height
            });
          }}
        >
          {secondsToMinutes(this.secondsLeft)}
        </Text>

        <Text
          style={[
            timeTextStyle,
            rotate,
            { left: (height-widthOfTime)/2 - 60, bottom: (width-heightOfTime)/2 }
          ]}
          onLayout={event => {
            const layout = event.nativeEvent.layout;
            this.setState({
              widthOfTime: layout.width,
              heightOfTime: layout.height
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
  titleTextStyle: {
    position: 'absolute',
    color: 'white',
    fontSize: 48,
    fontFamily: 'monospace'
  },
  timeTextStyle: {
    position: 'absolute',
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 20,
    fontFamily: 'monospace'
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
