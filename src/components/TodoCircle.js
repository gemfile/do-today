/* @flow */

import React, { Component } from 'react';
import { View, Text, Animated, Easing } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { clearPomodoro, completePomodoro, tickPomodoro } from 'actions';
import { Color } from './common';
import CanvasView from 'natives/CanvasView';
import AnimatedValueSubscription from 'utils/AnimatedValueSubscription';
import { secondsToMinutes } from 'utils/TimeFormat';
import SoundPlayer from 'utils/SoundPlayer';

const WIDTH_OF_CIRCLE = 300;
const HEIGHT_OF_CIRCLE = 300;
const WIDTH_OF_STROKE = 10;

type Props = {
  todo: Object,
  style: {
    width: number,
    height: number,
  },
  clearPomodoro: () => Object,
  completePomodoro: (todo: Object) => Object,
  tickPomodoro: (todo:Object, secondsLeft: number) => Object,
  loaded: boolean,
  completed: boolean,
  minutesAtATime: number
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

    const secondsLeft = this.props.minutesAtATime * 60;
    this.state = {
      widthOfTitle: 0,
      heightOfTitle: 0,
      opacityOfTitle: 0,
      widthOfTime: 0,
      heightOfTime: 0,
      opacityOfTime: 0,
      progress: 0,
      colorOfTitle: Color.White,
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
    const { todo, completePomodoro, clearPomodoro, loaded } = this.props;
    const { pomodoro: currentPomodoro } = todo;
    const { pomodoro: nextPomodoro } = nextProps.todo;

    if (currentPomodoro && nextPomodoro) {
      const started = (
          currentPomodoro.currentState === '' ||
          currentPomodoro.currentState === 'stopped' ||
          currentPomodoro.currentState === 'get'
        ) &&
        nextPomodoro.currentState === 'started';

      const stopped =
        currentPomodoro.currentState === 'started' &&
        nextPomodoro.currentState === 'stopped';

      const completed =
        currentPomodoro.currentState === 'started' &&
        nextPomodoro.currentState === 'completed';

      const get =
        currentPomodoro.currentState === 'completed' &&
        nextPomodoro.currentState === 'get';

      if (nextPomodoro.currentState === 'completed') {
        this.setState({ progress: 1 });
      }

      if (loaded) {
        if (started) {
          SoundPlayer.play('tick');
          this.animateProgress(-1);

          this.timer = setInterval(
            () => {
              const currentTime = new Date().getTime();
              const elapsedTime = (currentTime - nextPomodoro.startTime) / 1000;
              const nextTargetTime = Math.max(this.fullSeconds - elapsedTime - 1, 0);

              const { nextSecondsLeft, nextTimeOffset }
                = this.animateProgress(nextTargetTime - this.secondsLeft);

              if (nextSecondsLeft > 0) {
                SoundPlayer.play('tick');
              }

              if (nextSecondsLeft <= 0) {
                setTimeout(
                  () => {
                    completePomodoro(todo);
                  },
                  nextTimeOffset
                );
                clearInterval(this.timer);
              }
            },
            1000
          );
        }
        if (stopped || get) {
          SoundPlayer.play('stop', 4);
          this.animateProgress(this.fullSeconds - this.secondsLeft, Easing.sin, 395);

          clearInterval(this.timer);
          clearPomodoro();
        }
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
    if (nextSecondsLeft === 0) {
      duration = Math.abs(offset) * 1000;
    }
    this.secondsLeft = nextSecondsLeft;

    const progress = (this.fullSeconds - nextSecondsLeft) / this.fullSeconds;
    Animated.timing(this.animatedValueForProgress, {
      toValue: progress,
      easing,
      duration
    }).start();

    return {nextSecondsLeft, nextTimeOffset: duration};
  }

  render() {
    const { containerStyle, titleTextStyle, timeTextStyle, rotate } = styles;
    const { style: styleProps } = this.props;
    const { width, height } = styleProps;
    const {
      widthOfTitle,
      heightOfTitle,
      opacityOfTitle,
      widthOfTime,
      heightOfTime,
      opacityOfTime,
      progress,
    } = this.state;
    const timeTextColor = this.state.progress === 1 ? Color.Red : Color.White;

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
            {
              left: (height-widthOfTitle)/2,
              bottom: (width-heightOfTitle)/2,
              opacity: opacityOfTitle,
              color: timeTextColor
            }
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
    color: Color.Deactivated,
    fontSize: 20,
    fontFamily: 'sans-serif-light'
  },
  timeTextStyle: {
    position: 'absolute',
    fontSize: 48,
    fontFamily: 'sans-serif-light'
  },
  rotate: {
    transform: [{ rotate: '-90deg' }]
  }
};

const mapStateToProps = ({ todosState }, { todo }) => {
  const { currentPage, minutesAtATime } = todosState.toObject();
  return {
    loaded: currentPage === todo.index,
    minutesAtATime: minutesAtATime
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  clearPomodoro,
  completePomodoro,
  tickPomodoro
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TodoCircle);
