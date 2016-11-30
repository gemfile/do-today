/* @flow */

import React, { Component } from 'react';
import { View, Text, Animated, Easing } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { clearPomodoro, completePomodoro, finishRest } from 'actions';
import type { ReducersState } from '../FlowType';
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
  finishRest: (todo: Object) => Object,
  loaded: boolean,
  completed: boolean,
  minutesAtATime: number,
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
  startOnce: boolean;
  colorMap: {[name: string]: string};

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
    };
    this.colorMap = {
      start: Color.Red,
      stop: Color.Red,
      get: Color.Red,
      take: Color.Green,
      skip: Color.Green,
      ['']: Color.Dim,
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
    this.startOnce = true;
  }

  componentWillReceiveProps(nextProps) {
    const { todo, clearPomodoro, loaded, completePomodoro, finishRest } = this.props;
    const { pomodoro: currentPomodoro } = todo;
    const { pomodoro: nextPomodoro } = nextProps.todo;

    if (currentPomodoro && nextPomodoro) {
      const now = new Date().getTime();

      const started = ((
          currentPomodoro.currentState === '' ||
          currentPomodoro.currentState === 'stopped' ||
          currentPomodoro.currentState === 'skipped' ||
          currentPomodoro.currentState === 'finished'
        ) || (
          currentPomodoro.currentState === 'started' &&
          this.startOnce &&
          nextPomodoro.endTime > now
        )) &&
        nextPomodoro.currentState === 'started';

      const taken = ((
          currentPomodoro.currentState === 'got'
        ) || (
          currentPomodoro.currentState === 'taken' &&
          this.startOnce &&
          nextPomodoro.endTime > now
        )) &&
        nextPomodoro.currentState === 'taken';

      const stopped =
        currentPomodoro.currentState === 'started' &&
        nextPomodoro.currentState === 'stopped';

      const notYetCompleted =
        nextPomodoro.currentState === 'started' &&
        nextPomodoro.endTime < now;

      const completed =
        nextPomodoro.currentState === 'completed';

      const got =
        currentPomodoro.currentState === 'completed' &&
        nextPomodoro.currentState === 'got';

      const skipped =
        currentPomodoro.currentState === 'taken' &&
        nextPomodoro.currentState === 'skipped';

      const notYetFinished =
        nextPomodoro.currentState === 'taken' &&
        nextPomodoro.endTime < now;

      const finished =
        currentPomodoro.currentState === 'taken' &&
        nextPomodoro.currentState === 'finished';

      // console.log('1', currentPomodoro.currentState, nextPomodoro.currentState);
      // console.log('2', started, taken, stopped, notYetCompleted, completed, got, skipped, notYetFinished, finished);
      // console.log('3', nextPomodoro.endTime, now);

      if (completed) {
        this.animatedValueForProgress.setValue(1);
        this.secondsLeft = 0;
      }

      if (loaded) {
        if (notYetCompleted) {
          completePomodoro(todo);
        }
        if (started) {
          this.ticking( nextPomodoro.startTime, ()=>completePomodoro(todo) );
        }

        if (notYetFinished) {
          finishRest(todo);
        }
        if (taken) {
          this.ticking( nextPomodoro.startTime, ()=>finishRest(todo) );
        }

        if ( stopped || got || skipped || finished ) {
          SoundPlayer.play( 'stop', 4 );
          this.animateProgress( this.fullSeconds - this.secondsLeft, Easing.sin, 395 );

          clearPomodoro();
        }
      }

      this.startOnce = false;
    }
  }

  ticking( startTime, onComplete ) {
    const currentTime = new Date().getTime();
    const elapsedTime = (currentTime - startTime) / 1000;
    const nextTargetTime = Math.max(this.fullSeconds - elapsedTime - 1, 0);

    const { nextSecondsLeft, nextTimeOffset }
      = this.animateProgress(nextTargetTime - this.secondsLeft);

    if (nextSecondsLeft > 0) {
      SoundPlayer.play('tick');
      setTimeout(
        ()=>{
          const { currentState } = this.props.todo.pomodoro;
          if (currentState === 'started' || currentState === 'taken' ) this.ticking(startTime, onComplete)
        },
        1000
      );
    } else {
      setTimeout(onComplete, nextTimeOffset);
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

  animateProgress(offset: number, easing: Easing = Easing.linear, duration: number = 1000, callback = null) {
    const nextSecondsLeft = this.secondsLeft + offset;
    if (nextSecondsLeft === 0) {
      duration = 0;
    }
    this.secondsLeft = nextSecondsLeft;

    const progress = (this.fullSeconds - nextSecondsLeft) / this.fullSeconds;
    Animated.timing(this.animatedValueForProgress, {
      toValue: progress,
      easing,
      duration
    }).start( callback );

    return {nextSecondsLeft, nextTimeOffset: duration};
  }

  render() {
    const { containerStyle, titleTextStyle, timeTextStyle, rotate } = styles;
    const { style: styleProps, todo } = this.props;
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
    const color = this.colorMap[todo.pomodoro.nextState];
    const timeTextColor = progress === 1 ? color : Color.White;


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
          doneColor={color}
          headColor={color}
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

const mapStateToProps = ({ todosState }: ReducersState, { todo }: Props) => {
  const { currentPage, minutesAtATime } = todosState.toObject();
  return {
    loaded: currentPage === todo.index,
    minutesAtATime: minutesAtATime
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  clearPomodoro,
  completePomodoro,
  finishRest
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TodoCircle);
