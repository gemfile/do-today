/* @flow */

import React, { Component } from 'react';
import { View } from 'react-native'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchTodos, fetchPomodoro, preparePomodoro } from 'actions';
import VerticalPager from './VerticalPager';
import TodoCircle from './TodoCircle';
import PomodoroButtonPlay from './PomodoroButtonPlay';
import PomodoroButtonAdd from './PomodoroButtonAdd';
import PomodoroButtonRemove from './PomodoroButtonRemove';
import ConfirmAdding from './ConfirmAdding';

class SceneTodoList extends Component {
  props: {
    fetchTodos: () => () => void,
    fetchPomodoro: () => () => void,
    preparePomodoro: () => Object,
    todos: Array<Object>,
    isModifying: boolean,
    pomodoroState: {currentState: 'started' | 'stopped', currentPage: number},
  };
  isDataUpdating: boolean;

  state = {
    width: 0,
    heightOfContent: 0,
    scrollEnabled: true,
    showModal: false,
  };

  componentDidMount() {
    this.props.fetchTodos();
    this.props.fetchPomodoro();
  }

  componentWillReceiveProps(nextProps) {
    const { pomodoroState: nextPomodoroState } = nextProps;

    this.setState({ scrollEnabled: nextPomodoroState.currentState !== 'started' });

    this.isDataUpdating = this.props.todos !== nextProps.todos;
  }

  onPage(currentPage) {
    this.props.preparePomodoro(currentPage, this.props.pomodoroState);
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
      emptyContainerStyle,
      wholeContainerStyle,
      buttonContainerStyle,
      modalContainerStyle,
    } = styles;

    const {
      width,
      heightOfContent,
      scrollEnabled,
    } = this.state;

    const { currentPage } = this.props.pomodoroState;

    return (
      <View style={wholeContainerStyle}>
        <View
          style={emptyContainerStyle}
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
          width={width}
          heightOfPage={heightOfContent}
          scrollEnabled={scrollEnabled}
          currentPage={currentPage}
        />

        <View style={[ buttonContainerStyle, {width} ]}>
          <PomodoroButtonRemove />
          <PomodoroButtonPlay />
          <PomodoroButtonAdd />
        </View>

        <View style={modalContainerStyle}>
          <ConfirmAdding />
        </View>
      </View>
    );
  }
}

const styles = {
  wholeContainerStyle: {
    flex: 1,
  },
  emptyContainerStyle: {
    borderWidth: 0,
    zIndex: 3
  },
  buttonContainerStyle: {
    position: 'absolute',
    bottom: 0,
    height: 100,
    zIndex: 4,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  modalContainerStyle: {
    flex: 1,
    position: 'absolute',
    zIndex: 5
  },
};

const mapStateToProps = ({ todosState, pomodoroState }) => {
  return { ...todosState.toObject(), pomodoroState: pomodoroState.toObject() };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchTodos,
  fetchPomodoro,
  preparePomodoro
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SceneTodoList);
