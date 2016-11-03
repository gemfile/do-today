import React, { Component } from 'react';
import {
  Text, View, Animated, Easing
 } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { notifyExpandingPosition } from 'actions';
import { TouchableWithPressEffect } from './common';
import PomodoroProgress from './PomodoroProgress';
import PomodoroButton from './PomodoroButton';
import { secondsToMinutes } from './util/TimeFormat';
import AnimatedValueSubscription from './util/AnimatedValueSubscription';

type Props = {
  expanded: boolean,
  notifyExpandingPosition: (position: number) => Object,
  expandingPosition: number
};
type SubmenuButton = 'start' | 'stop' | 'get';

const MAX_HEIGHT = 48;

class Pomodoro extends Component {
  state: {
    minutesAtATime: number,
    secondsLeft: number,
    fullSeconds: number,
    submenuButton: SubmenuButton,
    height: Animated.Value
  };
  timer: number;
  positionListener: AnimatedValueSubscription;
  animatedView: Animated.View;
  latestHeight: number;

  constructor(props: Props) {
    super(props);

    const minutesAtATime = 1;
    const secondsLeft = minutesAtATime * 60;
    this.state = {
      minutesAtATime,
      secondsLeft,
      fullSeconds: secondsLeft,
      submenuButton: 'start',
      height: new Animated.Value(0),
      latestHeight: 0
    };
  }

  componentDidMount() {
    this.positionListener = new AnimatedValueSubscription(
      this.state.height,
      (data: Object) => {
        this.latestHeight = data.value;
        this.props.notifyExpandingPosition(this.latestHeight);
      },
      false
    );
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  componentWillReceiveProps(nextProps: Props) {
    const { expanded, expandingPosition } = nextProps;

    this.positionListener.enable(expanded);

    if (this.props.expanded !== expanded && expanded) {
      Animated.timing(this.state.height, {
        toValue: MAX_HEIGHT,
        easing: Easing.inOut(Easing.ease),
        duration: 250
      }).start();
    }

    if (
      this.props.expandingPosition !== expandingPosition &&
      !expanded &&
      this.latestHeight > 0
    ) {
      this.latestHeight = MAX_HEIGHT - expandingPosition
      this.state.height.setValue(this.latestHeight);
    }
  }

  onPress() {
    const submenuButton = this.state.submenuButton;
    if (submenuButton === 'start') {
      this.startTimer();
    } else if (submenuButton === 'stop') {
      this.stopTimer('start', this.state.fullSeconds);
    } else if (submenuButton === 'get') {
      // console.log('get');
    }
  }

  startTimer() {
    this.setState({ submenuButton: 'stop' });
    this.timer = setInterval(() => {
      const secondsLeft = this.state.secondsLeft - 1;
      this.setState({ secondsLeft });
      if (secondsLeft <= 0) {
        this.stopTimer('get', 0);
      }
    }, 1000);
  }

  stopTimer(submenuButton: SubmenuButton, secondsLeft: number) {
    this.setState({
      submenuButton,
      secondsLeft
    });
    clearInterval(this.timer);
  }

  render() {
    const {
      wholeContainerStyle,
      leftSideContainerStyle,
      rightSideContainerStyle,
      progressStyle,
      progressTextStyle
    } = styles;
    const ratioOfProgress =
      (this.state.fullSeconds - this.state.secondsLeft) / this.state.fullSeconds;
    const timeLefts = secondsToMinutes(this.state.secondsLeft);

    return (
      <Animated.View
        ref={(component) => { this.animatedView = component; }}
        style={[ wholeContainerStyle, {height: this.state.height} ]}
      >
        <View style={leftSideContainerStyle}>
          <PomodoroProgress
            ratio={ratioOfProgress}
            style={progressStyle}
          />
          <Text style={progressTextStyle}>
            {timeLefts}
          </Text>
        </View>

        <TouchableWithPressEffect
          style={rightSideContainerStyle}
          onPress={this.onPress.bind(this)}
        >
          <PomodoroButton type={this.state.submenuButton} />

        </TouchableWithPressEffect>
      </Animated.View>
    );
  }
}

const styles = {
  backgroundStyle: {
    backgroundColor: '#f8f8f8'
  },
  wholeContainerStyle: {
    flex: 1,
    flexDirection: 'row'
  },
  leftSideContainerStyle: {
    flex: 8,
    paddingLeft: 0,
    paddingRight: 5,
  },
  progressStyle: {
    flex: 1
  },
  progressTextStyle: {
    flex: 9,
    textAlign: 'right',
    color: '#666'
  },
  rightSideContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 24,
    backgroundColor: '#eee'
  }
};

const mapDispatchToProps = dispatch => bindActionCreators({
  notifyExpandingPosition
}, dispatch);

const mapStateToProps = ({ expandingPosition }) => ({
  expandingPosition,
});

export default connect(mapStateToProps, mapDispatchToProps)(Pomodoro);
