/* @flow */

import React, { Component } from 'react';
import { View, Dimensions } from 'react-native'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchTodos, preparePomodoro } from 'actions';
import { Color } from './common';
import VerticalPager from './VerticalPager';
import TodoCircle from './TodoCircle';
import PomodoroButton from './PomodoroButton';

const { width } = Dimensions.get('window');

class SceneTodoList extends Component {
  props: {
    fetchTodos: () => () => void,
    preparePomodoro: () => Object,
    todos: Array<Object>,
    isModifying: boolean,
    pomodoroState: {currentState: 'started' | 'stopped'},
  };

  state = {
    width: 0,
    heightOfContent: 0,
    scrollEnabled: true
  };

  componentDidMount() {
    this.props.fetchTodos();
  }

  componentWillReceiveProps(nextProps) {
    const { pomodoroState: nextPomodoroState } = nextProps;

    if (nextPomodoroState === 'started') {
      this.setState({ scrollEnabled: false });
    }
  }

  onPage(currentPage) {
    this.props.preparePomodoro(currentPage);
  }

  renderPages() {
    return this.props.todos.map( todo => (
      <TodoCircle
        key={todo.id}
        todo={todo}
        style={{ width: this.state.width, height: this.state.heightOfContent }}
      />
    ));
  }

  render() {
    const {
      writingContainerStyle,
      wholeContainerStyle,
      buttonContainerStyle,
    } = styles;

    return (
      <View style={wholeContainerStyle}>
        <View
          style={writingContainerStyle}
          onLayout={ event => {
            this.setState({ width: event.nativeEvent.layout.width });
          }}
        />

        <VerticalPager
          onContentHeight={ event => {
            this.setState({ heightOfContent: event.nativeEvent.layout.height });
          }}
          renderPages={this.renderPages.bind(this)}
          onPage={this.onPage.bind(this)}
          todos={this.props.todos}
          width={this.state.width}
          heightOfPage={this.state.heightOfContent}
          scrollEnabled={this.state.scrollEnabled}
        />

        <View style={buttonContainerStyle}>
          <PomodoroButton />
        </View>
      </View>
    );
  }
}

const styles = {
  wholeContainerStyle: {
    flex: 1,
    backgroundColor: Color.Background,
  },
  writingContainerStyle: {
    borderWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    zIndex: 1
  },
  buttonContainerStyle: {
    position: 'absolute',
    bottom: 0,
    width: width,
    height: 100,
    zIndex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
  },
};

const mapStateToProps = ({ todos, pomodoroState }) => {
  return { ...todos.toObject(), pomodoroState: pomodoroState.toObject() };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchTodos,
  preparePomodoro
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SceneTodoList);
