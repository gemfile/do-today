/* @flow */

import React, { Component } from 'react';
import { View, Animated, Easing } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { startPomodoro, stopPomodoro, getPomodoro, takeRest, skipRest } from 'actions';
import { MKButton } from 'react-native-material-kit';
import type { ReducersState } from '../../FlowType';
import { Color, ImageView, Style } from '../common';
import PlayImage from './img/play.png';
import CompleteImage from './img/tomato.png';
import RestImage from './img/coffee.png';

const PlainFabRed = MKButton.plainFab().withBackgroundColor(Color.Red).build();
const PlainFabDim = MKButton.plainFab().withBackgroundColor(Color.Dim).build();
const PlainFabGreen = MKButton.plainFab().withBackgroundColor(Color.Green).build();

class PomodoroButtonPlay extends Component {
  props: {
    startPomodoro: (todo: Object, minutesForPomodoro: number) => Object,
    stopPomodoro: (todo: Object) => Object,
    getPomodoro: (todo: Object) => Object,
    takeRest: (todo: Object, minutesForBreak: number) => Object,
    currentTodo: Object,
    minutesForPomodoro: number,
    minutesForBreak: number
  }
  aniCount: number;
  buttonMap: {[name: string]: MKButton};
  buttonColorMap: {[name: string]: string};
  iconMap: {[name: string]: View};
  state: {
    renderingIcon: string,
    isAnimating: boolean
  };
  bounceValue: Animated.Value;

  constructor(props) {
    super(props);

    this.state = {
      renderingIcon: '',
      isAnimating: false,
    };
    this.bounceValue = new Animated.Value(1),
    this.aniCount = 0;
    this.buttonMap = {
      start: PlainFabRed,
      stop: PlainFabRed,
      get: PlainFabRed,
      take: PlainFabGreen,
      skip: PlainFabGreen,
      ['']: PlainFabDim,
    };
    this.buttonColorMap = {
      start: Color.Red,
      stop: Color.Red,
      get: Color.Red,
      take: Color.Green,
      skip: Color.Green,
      ['']: Color.Dim,
    };

    const { playImageStyle, stopImageStyle, getImageStyle, takeImageStyle } = styles;
    this.iconMap = {
      start: <ImageView imageSource={PlayImage} imageStyle={playImageStyle} />,
      stop: <View style={stopImageStyle} />,
      get: <ImageView imageSource={CompleteImage} imageStyle={getImageStyle} />,
      take: <ImageView imageSource={RestImage} imageStyle={takeImageStyle}/>,
      skip: <View style={stopImageStyle} />,
      ['']: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { currentTodo } = this.props;
    const { currentTodo: nextTodo } = nextProps;
    const { bounceValue } = this;

    const needUpdate =
      ( !currentTodo && nextTodo ) ||
      currentTodo &&
      nextTodo &&
      ( currentTodo.pomodoro.nextState !== nextTodo.pomodoro.nextState ||
        currentTodo.id !== nextTodo.id );

    if (needUpdate) {
      if (this.aniCount === 0) {
        this.setState({ isAnimating: true });
      }
      this.aniCount++;
      bounceValue.setValue(1);
      Animated.timing(bounceValue, {
        toValue: 0,
        easing: Easing.quad,
        duration: 100
      }).start( () => {
        this.setState({ renderingIcon: nextTodo.pomodoro.nextState });
        Animated.timing(bounceValue, {
          toValue: 1,
          easing: Easing.elastic(1), // Springy
          duration: 295
        }).start( () => {
          this.aniCount--;
          if (this.aniCount === 0) {
            this.setState({ isAnimating: false })
          }
        });
      });
    }
  }

  onPress() {
    const {
      startPomodoro,
      stopPomodoro,
      getPomodoro,
      takeRest,
      currentTodo
    } = this.props;

    if (currentTodo) {
      switch (currentTodo.pomodoro.nextState) {
        case 'start':
        return startPomodoro(currentTodo, this.props.minutesForPomodoro);

        case 'stop':
        return stopPomodoro(currentTodo);

        case 'get':
        return getPomodoro(currentTodo);

        case 'take':
        return takeRest(currentTodo, this.props.minutesForBreak);

        case 'skip':
        return skipRest(currentTodo);
      }
    }
  }

  render() {
    const { buttonStyle, animationStyle } = styles;
    const { renderingIcon } = this.state;

    const buttonOpacity = this.state.isAnimating ? 0 : 1;
    const animationOpacity = this.state.isAnimating ? 1 : 0;
    const buttonColor = this.buttonColorMap[renderingIcon];
    const Button = this.buttonMap[renderingIcon];
    const Icon = this.iconMap[renderingIcon];
    return (
      <View>
        <Animated.View
          style={[
            animationStyle,
            {
              backgroundColor: buttonColor,
              transform: [{ scale: this.bounceValue }],
              opacity: animationOpacity
            }
          ]}
        >
          { Icon }
        </Animated.View>
        <Button
          style={[
            buttonStyle,
            {
              opacity: buttonOpacity
            }
          ]}
          onPress={this.onPress.bind(this)}
        >
          { Icon }
        </Button>
      </View>
    );
  }
}

const styles = {
  buttonStyle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    ...Style.shadowStyle
  },
  animationStyle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    backgroundColor: Color.Red,
    ...Style.shadowStyle
  },
  playImageStyle: {
    tintColor: Color.White,
    marginLeft: 3
  },
  stopImageStyle: {
    backgroundColor: Color.White,
    width: 16,
    height: 16
  },
  getImageStyle: {
    tintColor: Color.White,
    marginBottom: 2,
    width: 28,
    height: 28
  },
  takeImageStyle: {
    tintColor: Color.White,
    marginLeft: 7,
    width: 28,
    height: 28
  }
};

const mapStateToProps = ({ todosState }: ReducersState) => {
  const { currentTodo, minutesForPomodoro, minutesForBreak } = todosState.toObject();

  return {
    currentTodo,
    minutesForPomodoro,
    minutesForBreak
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  startPomodoro,
  stopPomodoro,
  getPomodoro,
  takeRest,
  skipRest
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PomodoroButtonPlay);
