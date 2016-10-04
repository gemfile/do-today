import React, { Component } from 'react';
import { Text, View, TouchableWithoutFeedback } from 'react-native';
import { CardSection, TouchableWithPressEffect } from './common';
import TodoProgress from './TodoProgress';
import TodoButton from './TodoButton';
import { secondsToMinutes } from './util/TimeFormat';

class TodoSubmenu extends Component {
  constructor(props) {
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
      console.log('get');
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

  stopTimer(submenuButton, secondsLeft) {
    this.setState({
      submenuButton,
      secondsLeft
    });
    clearInterval(this.timer);
  }

  render() {
    const { expanded } = this.props;
    const {
      leftSideContainerStyle,
      rightSideContainerStyle,
      progressTextStyle
    } = styles;
    const ratioOfProgress =
      (this.state.fullSeconds - this.state.secondsLeft) / this.state.fullSeconds;
    const timeLefts = secondsToMinutes(this.state.secondsLeft);

    if (expanded) {
      return (
        <CardSection style={{ backgroundColor: '#f8f8f8' }}>
          <TouchableWithoutFeedback>

            <View style={{ flex: 1, height: 48, flexDirection: 'row' }}>
              <View style={leftSideContainerStyle}>
                <TodoProgress
                  ratio={ratioOfProgress}
                  style={{ flex: 1 }}
                />
                <Text style={progressTextStyle}>
                  {timeLefts}
                </Text>
              </View>

              <TouchableWithPressEffect
                style={rightSideContainerStyle}
                onPress={this.onPress.bind(this)}
              >
                <TodoButton submenuButton={this.state.submenuButton} />

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
  leftSideContainerStyle: {
    flex: 8,
    paddingLeft: 0,
    paddingRight: 5,
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

export default TodoSubmenu;
