/* @flow */

import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { startPomodoro, stopPomodoro } from 'actions';
import { MKButton } from 'react-native-material-kit';
import { Color, ImageView } from './common';
import PlayImage from './img/play.png';

const PlainFab = MKButton.plainFab().withBackgroundColor(Color.Red).build();

class PomodoroButton extends Component {
  props: {
    pomodoroState: {nextState: 'start' | 'stop'},
    startPomodoro: () => Object,
    stopPomodoro: () => Object
  }

  onPress() {
    const { pomodoroState, startPomodoro, stopPomodoro } = this.props;

    switch (pomodoroState.nextState) {
      case 'start':
      startPomodoro();
      break;

      case 'stop':
      stopPomodoro();
      break;
    }
  }

  renderIcon() {
    const { playImageStyle, stopImageStyle } = styles;
    switch (this.props.pomodoroState.nextState) {
      case 'start':
      return <ImageView imageSource={PlayImage} imageStyle={playImageStyle} />

      case 'stop':
      return <View style={stopImageStyle} />
    }
  }

  render() {
    const { buttonStyle } = styles;

    return (
      <PlainFab style={buttonStyle} onPress={this.onPress.bind(this)}>
        { this.renderIcon() }
      </PlainFab>
    );
  }
}

const styles = {
  buttonStyle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  playImageStyle: {
    tintColor: Color.White,
    marginLeft: 3
  },
  stopImageStyle: {
    backgroundColor: Color.White,
    width: 16,
    height: 16
  }
};

const mapStateToProps = ({ pomodoroState }) => {
  return { pomodoroState: pomodoroState.toObject() };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  startPomodoro,
  stopPomodoro,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PomodoroButton);
