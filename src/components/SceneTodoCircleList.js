/* @flow */

import React, { Component } from 'react';
import { View, Dimensions } from 'react-native'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchTodos } from 'actions';
import { Color } from './common';
import VerticalPager from './VerticalPager';
import TodoCircle from './TodoCircle';
import PomodoroButton from './PomodoroButton';

const { width } = Dimensions.get('window');

class SceneTodoList extends Component {
  props: {
    fetchTodos: () => () => void,
    todos: Array<Object>,
    isModifying: boolean;
  };

  state = {
    width: 0,
    heightOfContent: 0,
  };

  componentDidMount() {
    this.props.fetchTodos();
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
          todos={this.props.todos}
          width={this.state.width}
          heightOfPage={this.state.heightOfContent}
          renderPages={this.renderPages.bind(this)}
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

const mapStateToProps = ({ todos }) => {
  return todos.toObject();
};

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchTodos,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SceneTodoList);
