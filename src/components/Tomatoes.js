import React, { Component } from 'react';
import { Animated, Easing, Image } from 'react-native';
import { connect } from 'react-redux';
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

    const needUpdate =
      currentTodo &&
      nextTodo &&
      ( currentTodo.pomodoro.nextState !== nextTodo.pomodoro.nextState ||
        currentTodo.id !== nextTodo.id );

    if (needUpdate) {
      this.aniCount++;
      Animated.timing(
        this.state.height,
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
              this.state.height,
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
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
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

const mapStateToProps = ({ todosState }) => ({
  currentTodo: todosState.get('currentTodo'),
});

export default connect(mapStateToProps)(Tomatoes);
