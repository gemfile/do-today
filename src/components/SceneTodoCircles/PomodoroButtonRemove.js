/* @flow */

import React, { Component } from 'react';
import { MKButton } from 'react-native-material-kit';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { deleteTodo, archiveTodo } from 'actions';
import { View, Animated, Easing, Image } from 'react-native';
import type { ReducersState } from '../../FlowType';
import { Color } from '../common';
import DeleteImage from './img/delete.png';
import ArchiveImage from './img/inbox_done.png';

const PlainFab = MKButton.plainFab().withBackgroundColor('rgba(255, 255, 255, 0)').build();

class PomodoroButtonRemove extends Component
{
  props: {
    deleteTodo: () => () => void,
    archiveTodo: () => () => void,
    currentTodo: Object,
    buttonEnabled: boolean
  }
  aniCount: number;

  state = {
    count: 0,
    isAnimating: false,
  };
  bounceValue = new Animated.Value(1);
  aniCount = 0;

  componentWillReceiveProps(nextProps) {
    const { currentTodo } = this.props;
    const { currentTodo: nextTodo } = nextProps;
    const { bounceValue } = this;

    const needUpdate =
      currentTodo &&
      nextTodo &&
      ( (currentTodo.pomodoro.count === 0 && nextTodo.pomodoro.count !== 0) ||
        (currentTodo.pomodoro.count !== 0 && nextTodo.pomodoro.count === 0) );

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
        this.setState({ count: nextTodo.pomodoro.count });
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

  renderIcon(count) {
    const { archiveImageStyle } = styles;
    const imageSource = count > 0 ? ArchiveImage : DeleteImage;
    return (
      <Image source={imageSource} style={archiveImageStyle} />
    );
  }

  onPress() {
    if (this.state.count > 0) {
      this.props.archiveTodo(this.props.currentTodo);
    } else {
      this.props.deleteTodo(this.props.currentTodo);
    }
  }

  render() {
    const { buttonStyle, animationStyle } = styles;
    const { count, isAnimating } = this.state;
    const { buttonEnabled } = this.props;

    const buttonOpacity = isAnimating ? 0 : 1;
    const animationOpacity = isAnimating ? 1 : 0;

    if (buttonEnabled) {
      return (
        <View>
          <Animated.View
            style={[
              animationStyle,
              {
                transform: [{ scale: this.bounceValue }],
                opacity: animationOpacity
              }
            ]}
          >
            { this.renderIcon(count) }
          </Animated.View>
          <PlainFab
            style={[
              buttonStyle,
              {
                opacity: buttonOpacity
              }
            ]}
            onPress={this.onPress.bind(this)}
          >
            { this.renderIcon(count) }
          </PlainFab>
        </View>
      );
    } else {
      return <View style={buttonStyle} />;
    }
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
  animationStyle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
  },
  archiveImageStyle: {
    tintColor: Color.White,
    transform: [{ scale: .68 }],
  },
};

const mapStateToProps = ({ todosState }: ReducersState) => {
  return { currentTodo: todosState.get('currentTodo') };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  deleteTodo, archiveTodo
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PomodoroButtonRemove);
