import React, { Component } from 'react';
import { Animated, Easing, Image } from 'react-native';
import { connect } from 'react-redux';
import type { ReducersState } from '../FlowType';
import TomatoImage from './img/tomato_color.png';

class Tomatoes extends Component {
  props: {
    currentTodo: Object,
    needUpdate: boolean,
  }

  state = {
    height: new Animated.Value(0),
    count: 0,
  };

  componentWillReceiveProps(nextProps) {
    const { currentTodo } = this.props;
    const { currentTodo: nextTodo } = nextProps;
    const { height } = this.state;

    const needUpdate =
      ( !currentTodo && nextTodo ) ||
      currentTodo &&
      nextTodo &&
      (currentTodo.id !== nextTodo.id ||
      currentTodo.pomodoro.count !== nextTodo.pomodoro.count);

    if (needUpdate) {
      this.aniCount++;
      Animated.timing(
        height,
        {
          toValue: 0,
          easing: Easing.quad,
          duration: 100
        }
      ).start(
        () => {
          if (nextTodo.pomodoro.count > 0) {
            this.setState({ count: nextTodo.pomodoro.count });
            Animated.timing(
              height,
              {
                toValue: 60,
                easing: Easing.elastic(1), // Springy
                duration: 295
              }
            ).start();
          }
        }
      );
    }
  }

  render() {
    const { wholeContainerStyle, imageStyle } = styles;
    const { currentTodo } = this.props;
    const { height, count } = this.state;

    let renderTomatoes;
    if (currentTodo) {
      renderTomatoes = [];

      for(let i = 0; i < count; i++) {
        renderTomatoes.push(
          <Image key={i} source={TomatoImage} style={imageStyle} />
        );
      }
    }

    return (
      <Animated.View style={[ wholeContainerStyle, {height} ]}>
        { renderTomatoes }
      </Animated.View>
    );
  }
}

const styles = {
  wholeContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    top: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageStyle: {
    margin: 1
  }
}

const mapStateToProps = ({ todosState }: ReducersState) => ({
  currentTodo: todosState.get('currentTodo'),
});

export default connect(mapStateToProps)(Tomatoes);
