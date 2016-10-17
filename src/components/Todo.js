/* @flow */

import React, { Component } from 'react';
import {
  Text,
  View,
  LayoutAnimation,
  UIManager,
  TouchableHighlight,
  Platform
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CardSection, Color } from './common';
import { selectTodo, navigateJump } from 'actions';
import { MKCheckbox } from 'react-native-material-kit';
import TodoStatus from './TodoStatus';
import Pomodoro from './Pomodoro';

class Todo extends Component {
  props: {
    todo: Object,
    modifying: boolean,
    expanded: boolean,
    modifyTodo: (todoId: string) => Object,
    selectTodo: () => Object
  };

  componentWillUpdate() {
    LayoutAnimation.easeInEaseOut();
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  onLongPress() {
    const { todo, modifying, modifyTodo } = this.props;
    if (!modifying) {
      modifyTodo(todo.id);
    }
  }

  onPress() {
    const { todo, expanded } = this.props;

    if (!expanded) {
      this.props.selectTodo(todo.id);
    }
  }

  render() {
    const { todo, expanded, modifying } = this.props;
    const { titleStyle, shadowStyle, wholeContainerStyle } = styles;
    let { todoStyle } = styles;
    if (expanded) {
      todoStyle = { ...todoStyle, ...shadowStyle };
    }

    return (
      <TouchableHighlight
        underlayColor='transparent'
        onPress={this.onPress.bind(this)}
        onLongPress={this.onLongPress.bind(this)}
      >
        <View style={wholeContainerStyle}>
          <CardSection style={todoStyle}>
            <MKCheckbox fillColor={Color.Red} borderOnColor={Color.Red}/>
            <Text style={titleStyle}>
              {todo.title}
            </Text>
            <TodoStatus todo={todo} modifying={modifying} />
          </CardSection>
          <Pomodoro expanded={expanded} />
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = {
  wholeContainerStyle: {
    borderWidth: 1,
    borderRadius: 1,
    borderColor: Color.TodoBackground,
    marginTop: 3,
    marginLeft: 3,
    marginRight: 3,
  },
  todoStyle: {
    height: 76,
  },
  shadowStyle: {
    borderWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  titleStyle: {
    fontSize: 20,
    marginLeft: 15,
    color: '#666',
    flex: 14,
  },
};

const mapStateToProps = (state, ownProps) => {
  const expanded = state.selectedTodoId === ownProps.todo.id;
  const modifying = state.modifyingTodoId === ownProps.todo.id;
  return { expanded, modifying };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  selectTodo,
  navigateJump
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
