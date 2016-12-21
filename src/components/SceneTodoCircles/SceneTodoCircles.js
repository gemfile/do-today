/* @flow */

import React, { Component } from 'react';
import { View } from 'react-native'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchTodos, fetchCurrentPage, preparePomodoro, showModalAdding, hideModal } from 'actions';
import { RotationHoleLoader } from 'react-native-indicator';
import type { ReducersState, ModalVisibleState } from '../../FlowType';
import VerticalPager from './VerticalPager';
import TodoCircle from './TodoCircle';
import PomodoroButtonPlay from './PomodoroButtonPlay';
import PomodoroButtonAdd from './PomodoroButtonAdd';
import PomodoroButtonRemove from './PomodoroButtonRemove';
import ModalAdding from './ModalAdding';
import ModalEditing from './ModalEditing';
import Tomatoes from './Tomatoes';
import { Color } from '../common';

class SceneTodoCircles extends Component {
  props: {
    fetchTodos: () => () => void,
    fetchCurrentPage: () => () => void,
    preparePomodoro: () => Object,
    showModalAdding: (visible: boolean) => Object,
    hideModal: () => Object,
    todos: Array<Object>,
    currentTodo: Object,
    currentPage: number,
    modalVisible: ModalVisibleState,
    phaseOfLoading: string
  };

  state = {
    width: 0,
    heightOfContent: 0,
    scrollEnabled: true,
  };

  componentDidMount() {
    const { fetchTodos, fetchCurrentPage } = this.props;

    fetchTodos();
    fetchCurrentPage();
    // Keyboard.addListener('keyboardDidHide', () => {
    //   hideModal();
    // });
  }

  componentWillReceiveProps(nextProps) {
    const { currentTodo, todos, modalVisible, showModalAdding, phaseOfLoading } = nextProps;

    if (currentTodo) {
      this.setState({
        scrollEnabled: (
          currentTodo.pomodoro.currentState !== 'started' &&
          currentTodo.pomodoro.currentState !== 'taken'
        )
      });
    }

    if (phaseOfLoading === 'remote' && todos.length === 0 && modalVisible.adding === false) {
      showModalAdding(true);
    }
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   const { todos, currentPage, currentTodo } = this.props;
  //   const { todos: nextTodos, currentPage: nextCurrentPage, currentTodo: nextCurrentTodo } = nextProps;
  //
  //   const { width, heightOfContent, scrollEnabled } = this.state;
  //   const { width: nextWidth, heightOfContent: nextHeightOfContent, scrollEnabled: nextScrollEnabled } = nextState;
  //
  //   return (
  //     !jsonEqual(todos, nextTodos) ||
  //     currentPage !== nextCurrentPage ||
  //     currentTodo !== nextCurrentTodo ||
  //     width !== nextWidth ||
  //     heightOfContent !== nextHeightOfContent ||
  //     scrollEnabled !== nextScrollEnabled
  //   );
  // }

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
      indicatorContainerStyle
    } = styles;

    const {
      width,
      heightOfContent,
      scrollEnabled,
    } = this.state;

    const { currentPage, currentTodo, todos } = this.props;

    const RenderIndicator = todos.length === 0 ? (
      <View style={indicatorContainerStyle}>
        <RotationHoleLoader color={Color.Green}/>
      </View>
    ) : null;

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

        {RenderIndicator}

        <View style={[ buttonContainerStyle, {width} ]}>
          <PomodoroButtonRemove buttonEnabled={currentTodo && scrollEnabled} />
          <PomodoroButtonPlay buttonEnabled={currentTodo && scrollEnabled} />
          <PomodoroButtonAdd buttonEnabled={scrollEnabled} />
        </View>

        <View style={modalContainerStyle}>
          <ModalAdding />
          <ModalEditing />
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
  indicatorContainerStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 5,
    justifyContent: 'center',
    alignItems: 'center',
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
    zIndex: 10
  },
};

const mapStateToProps = ({ todosState, currentPage, modalVisible }: ReducersState) => {
  return { ...todosState.toObject(), currentPage, modalVisible };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchTodos,
  fetchCurrentPage,
  preparePomodoro,
  showModalAdding,
  hideModal
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SceneTodoCircles);
