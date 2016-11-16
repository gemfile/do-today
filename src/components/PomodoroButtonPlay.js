/* @flow */

import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { startPomodoro, stopPomodoro, getPomodoro } from 'actions';
import { MKButton } from 'react-native-material-kit';
import { Color, ImageView, Style } from './common';
import PlayImage from './img/play.png';
import CompleteImage from './img/tomato2.png';

const PlainFab = MKButton.plainFab().withBackgroundColor(Color.Red).build();

class PomodoroButtonPlay extends Component {
  props: {
    startPomodoro: () => Object,
    stopPomodoro: () => Object,
    getPomodoro: () => Object,
    currentTodo: Object
  }

  onPress() {
    const {
      startPomodoro,
      stopPomodoro,
      getPomodoro,
      currentTodo
    } = this.props;

    if (currentTodo) {
      switch (currentTodo.pomodoro.nextState) {
        case 'start':
        return startPomodoro(currentTodo);

        case 'stop':
        return stopPomodoro(currentTodo);

        case 'get':
        return getPomodoro(currentTodo);
      }
    }
  }

  renderIcon() {
    const { playImageStyle, stopImageStyle, getImageStyle } = styles;
    const { currentTodo } = this.props;
    if (currentTodo) {
      switch (currentTodo.pomodoro.nextState) {
        case 'start':
        return <ImageView imageSource={PlayImage} imageStyle={playImageStyle} />

        case 'stop':
        return <View style={stopImageStyle} />

        case 'get':
        return <ImageView imageSource={CompleteImage} imageStyle={getImageStyle} />
      }
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
    marginBottom: 2,
    width: 24,
    height: 24
  }
};

const mapStateToProps = ({ todosState }) => {
  return {
    currentTodo: todosState.get('currentTodo')
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  startPomodoro,
  stopPomodoro,
  getPomodoro,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PomodoroButtonPlay);
