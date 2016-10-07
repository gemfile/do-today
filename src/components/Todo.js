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
import { CardSection } from './common';
import * as actions from './actions';
import TodoButton from './TodoButton';
import TodoStatus from './TodoStatus';
import Pomodoro from './Pomodoro';

class Todo extends Component {
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
    const { todo, expanded, selectTodo, deselectTodo } = this.props;

    if (!expanded) {
      selectTodo(todo.id);
    } else {
      deselectTodo();
    }
  }

  render() {
    const { titleStyle, containerStyle } = styles;
    const { todo, expanded, modifying } = this.props;

    return (
      <TouchableHighlight
        underlayColor='transparent'
        onPress={this.onPress.bind(this)}
        onLongPress={this.onLongPress.bind(this)}
      >

        <View>
          <CardSection style={containerStyle}>
            <TodoButton />
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
  containerStyle: {
    height: 76,
    marginTop: 5,
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

export default connect(mapStateToProps, actions)(Todo);
