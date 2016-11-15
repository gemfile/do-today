/* @flow */

import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { startPomodoro, stopPomodoro, getPomodoro } from 'actions';
import { MKButton } from 'react-native-material-kit';
import { Color, ImageView, Style } from './common';
import PlayImage from './img/play.png';
import CompleteImage from './img/tomato.png';

const PlainFab = MKButton.plainFab().withBackgroundColor(Color.Red).build();

class PomodoroButtonPlay extends Component {
  props: {
    pomodoroState: {nextState: 'start' | 'stop' | 'get'},
    startPomodoro: () => Object,
    stopPomodoro: () => Object,
    getPomodoro: () => Object,
    currentTodo: Object
  }

  onPress() {
    const {
      pomodoroState,
      startPomodoro,
      stopPomodoro,
      getPomodoro,
      currentTodo
    } = this.props;

    switch (pomodoroState.nextState) {
      case 'start':
      return startPomodoro(currentTodo);

      case 'stop':
      return stopPomodoro(currentTodo);

      case 'get':
      return getPomodoro(currentTodo);
    }
  }

  renderIcon() {
    const { playImageStyle, stopImageStyle, getImageStyle } = styles;
    switch (this.props.pomodoroState.nextState) {
      case 'start':
      return <ImageView imageSource={PlayImage} imageStyle={playImageStyle} />

      case 'stop':
      return <View style={stopImageStyle} />

      case 'get':
      return <ImageView imageSource={CompleteImage} imageStyle={getImageStyle} />
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
    alignItems: 'center',
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
    marginBottom: 2
  }
};

const mapStateToProps = ({ todosState, pomodoroState }) => {
  return {
    pomodoroState: pomodoroState.toObject(),
    currentTodo: todosState.get('currentTodo')
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  startPomodoro,
  stopPomodoro,
  getPomodoro,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PomodoroButtonPlay);
