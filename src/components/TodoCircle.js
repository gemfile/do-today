/* @flow */

import React, { Component } from 'react';
import { View, Text, Animated, Easing } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { clearPomodoro, completePomodoro } from 'actions';
import Sound from 'react-native-sound';
import { Color } from './common';
import CanvasView from './native/CanvasView';
import AnimatedValueSubscription from './util/AnimatedValueSubscription';
import { secondsToMinutes } from './util/TimeFormat';

const WIDTH_OF_CIRCLE = 300;
const HEIGHT_OF_CIRCLE = 300;
const WIDTH_OF_STROKE = 12;
const tickSound = new Sound('pomodoro_tick.mp3', Sound.MAIN_BUNDLE);
const stopSound = new Sound('pomodoro_turn.mp3', Sound.MAIN_BUNDLE);
const ringSound = new Sound('pomodoro_ring.mp3', Sound.MAIN_BUNDLE);
const repeatPlaying = (sound, count) => {
  sound.play(success => {
    count -= 1;
    if (success && count > 0) {
      repeatPlaying(sound, count);
    }
  });
};

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
  completePomodoro: () => Object,
  loaded: boolean,
};

type State = {
  widthOfTitle: number,
  heightOfTitle: number,
  opacityOfTitle: number,
  widthOfTime: number,
  heightOfTime: number,
  opacityOfTime: number,
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
  updatingData: boolean;

  constructor(props) {
    super(props);

    const minutesAtATime = .1;
    const secondsLeft = minutesAtATime * 60;
    this.state = {
      widthOfTitle: 0,
      heightOfTitle: 0,
      opacityOfTitle: 0,
      widthOfTime: 0,
      heightOfTime: 0,
      opacityOfTime: 0,
      progress: 0,
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
    const stopped = (
      this.props.pomodoroState.currentState === 'started' &&
      nextProps.pomodoroState.currentState === 'stopped'
    ) || (
      this.props.pomodoroState.currentState === 'completed' &&
      nextProps.pomodoroState.currentState === 'got'
    );

    if (nextProps.loaded) {
      if (started) {
        this.animateProgress(-1);
        tickSound.play();

        this.timer = setInterval(
          () => {
            const nextSecondsLeft = this.animateProgress(-1);
            tickSound.play();
            if (nextSecondsLeft <= 0) {
              setTimeout( () => ringSound.play(), 1000);
              clearInterval(this.timer);
              this.props.completePomodoro();
            }
          },
          1000
        );
      }
      if (stopped) {
        this.animateProgress(this.fullSeconds - this.secondsLeft, Easing.sin, 400);
        repeatPlaying(stopSound, 4);

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

  animateProgress(offset: number, easing: Easing = Easing.linear, duration: number = 1000) {
    const nextSecondsLeft = this.secondsLeft + offset;
    this.secondsLeft = nextSecondsLeft;

    const progress = (this.fullSeconds - nextSecondsLeft) / this.fullSeconds;
    Animated.timing(this.animatedValueForProgress, {
      toValue: progress,
      easing,
      duration
    }).start();

    return nextSecondsLeft;
  }

  render() {
    const { containerStyle, titleTextStyle, timeTextStyle, rotate } = styles;
    const { width, height } = this.props.style;
    const {
      widthOfTitle,
      heightOfTitle,
      opacityOfTitle,
      widthOfTime,
      heightOfTime,
      opacityOfTime,
      progress,
    } = this.state;

    return (
      <View
        style={[
          containerStyle,
          {
            width: height,
            height: width,
            transform: [{ translateY: (height - width) }]
          },
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
            timeTextStyle,
            rotate,
            { left: (height-widthOfTitle)/2, bottom: (width-heightOfTitle)/2, opacity: opacityOfTitle }
          ]}
          onLayout={event => {
            const layout = event.nativeEvent.layout;
            this.setState({
              widthOfTitle: layout.width,
              heightOfTitle: layout.height,
              opacityOfTitle: 1
            });
          }}
        >
          {secondsToMinutes(this.secondsLeft)}
        </Text>

        <Text
          style={[
            titleTextStyle,
            rotate,
            { left: (height-widthOfTime)/2 - 60, bottom: (width-heightOfTime)/2, opacity: opacityOfTime }
          ]}
          onLayout={event => {
            const layout = event.nativeEvent.layout;
            this.setState({
              widthOfTime: layout.width,
              heightOfTime: layout.height,
              opacityOfTime: 1
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
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 20,
    fontFamily: 'sans-serif-light'
  },
  timeTextStyle: {
    position: 'absolute',
    color: 'white',
    fontSize: 48,
    fontFamily: 'sans-serif-light'
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
  completePomodoro
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TodoCircle);
