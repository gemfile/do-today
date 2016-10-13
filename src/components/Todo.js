/* @flow */

import React, { Component, PropTypes } from 'react';
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
import { CardSection } from './common';
import { modifyTodo, navigateJump } from './actions';
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
    const { expanded } = this.props;

    if (!expanded) {
      this.props.navigateJump('todo');
    }
  }

  render() {
    const { todo, expanded, modifying } = this.props;
    const { titleStyle, shadowStyle } = styles;
    let { containerStyle } = styles;
    if (expanded) {
      containerStyle = { ...containerStyle, ...shadowStyle };
    }

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
  const expanded = state.selectedTodoId === ownProps.todo.index;
  const modifying = state.modifyingTodoId === ownProps.todo.id;
  return { expanded, modifying };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  modifyTodo,
  navigateJump
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
