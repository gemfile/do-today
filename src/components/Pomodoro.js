/* @flow */

import React, { Component, PropTypes } from 'react';
import { Text, View, TouchableWithoutFeedback } from 'react-native';
import { CardSection, TouchableWithPressEffect } from './common';
import PomodoroProgress from './PomodoroProgress';
import PomodoroButton from './PomodoroButton';
import { secondsToMinutes } from './util/TimeFormat';

type Props = {
  expanded: boolean,
};
type SubmenuButton = 'start' | 'stop' | 'get';

class Pomodoro extends Component {
  state: {
    minutesAtATime: number,
    secondsLeft: number,
    fullSeconds: number,
    submenuButton: SubmenuButton
  };
  timer: number;
  
  constructor(props: Props) {
    super(props);
    const minutesAtATime = 1;
    const secondsLeft = minutesAtATime * 60;
    this.state = {
      minutesAtATime,
      secondsLeft,
      fullSeconds: secondsLeft,
      submenuButton: 'start'
    };
  }

  componentWillUnmount() {
    clearInterval(this.timer);
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
    const { expanded } = this.props;
    const {
      backgroundStyle,
      wholeContainerStyle,
      leftSideContainerStyle,
      rightSideContainerStyle,
      progressStyle,
      progressTextStyle
    } = styles;
    const ratioOfProgress =
      (this.state.fullSeconds - this.state.secondsLeft) / this.state.fullSeconds;
    const timeLefts = secondsToMinutes(this.state.secondsLeft);

    if (expanded) {
      return (
        <CardSection style={backgroundStyle}>
          <TouchableWithoutFeedback>

            <View style={wholeContainerStyle}>
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
            </View>

          </TouchableWithoutFeedback>
        </CardSection>
      );
    }

    return null;
  }
}

const styles = {
  backgroundStyle: {
    backgroundColor: '#f8f8f8'
  },
  wholeContainerStyle: {
    flex: 1,
    height: 48,
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
    flex: 8,
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

export default Pomodoro;
