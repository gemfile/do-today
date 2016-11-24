/* @flow */

import React, { Component } from 'react';
import { View } from 'react-native'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchTodos, preparePomodoro } from 'actions';
import VerticalPager from './VerticalPager';
import TodoCircle from './TodoCircle';
import PomodoroButtonPlay from './PomodoroButtonPlay';
import PomodoroButtonAdd from './PomodoroButtonAdd';
import PomodoroButtonRemove from './PomodoroButtonRemove';
import ConfirmAdding from './ConfirmAdding';
import Tomatoes from './Tomatoes';

class SceneTodoList extends Component {
  props: {
    fetchTodos: () => () => void,
    preparePomodoro: () => Object,
    todos: Array<Object>,
    currentTodo: Object,
    isModifying: boolean,
    currentPage: number
  };

  state = {
    width: 0,
    heightOfContent: 0,
    scrollEnabled: true,
    showModal: false,
  };

  componentDidMount() {
    this.props.fetchTodos();
  }

  componentWillReceiveProps(nextProps) {
    const { currentState } = nextProps.currentTodo.pomodoro;

    this.setState({ scrollEnabled: currentState !== 'started' });
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
      emptyContainerStyle,
      wholeContainerStyle,
      buttonContainerStyle,
      modalContainerStyle,
      modifyingContainerStyle,
    } = styles;

    const {
      width,
      heightOfContent,
      scrollEnabled,
    } = this.state;

    const { currentPage } = this.props;

    return (
      <View style={wholeContainerStyle}>
        <View
          style={emptyContainerStyle}
          onLayout={ event => {
            this.setState({ width: event.nativeEvent.layout.width });
          }}
        />

        <View style={[ modifyingContainerStyle, {width} ]}>
          <Tomatoes />
        </View>

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
    zIndex: 3,
  },
  modifyingContainerStyle: {
    position: 'absolute',
    top: 60,
    height: 60,
    zIndex: 6,
  },
  buttonContainerStyle: {
    position: 'absolute',
    bottom: 0,
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    zIndex: 4,
  },
  modalContainerStyle: {
    flex: 1,
    position: 'absolute',
    zIndex: 5
  },
};

const mapStateToProps = ({ todosState }) => {
  return { ...todosState.toObject() };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchTodos,
  preparePomodoro
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SceneTodoList);
