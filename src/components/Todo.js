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
import TodoSubmenu from './TodoSubmenu';
import PomodoroImage from './PomodoroImage';

class Todo extends Component {
  componentWillUpdate() {
    LayoutAnimation.easeInEaseOut();
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  onPress(event) {
    const { todo, expanded, selectTodo, deselectTodo } = this.props;

    if (!expanded) {
      selectTodo(todo.id);
    } else {
      deselectTodo();
    }
  }

  render() {
    const { titleStyle, countStyle, countContainerStyle } = styles;
    const { todo, expanded } = this.props;

    return (
      <TouchableHighlight
        underlayColor='transparent'
        onPress={this.onPress.bind(this)}
      >
        <View>
          <CardSection style={{ height: 76 }}>
            <Text style={titleStyle}>
              {todo.title}
            </Text>
            <View style={{ flex: 1, marginRight: 15, }}>
              <PomodoroImage imageStyle={{ width: 16, height: 16 }} />
              <View style={countContainerStyle}>
                <Text style={countStyle}>
                  {todo.count}
                </Text>
              </View>
            </View>
          </CardSection>
          <TodoSubmenu expanded={expanded} />
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 20,
    marginLeft: 15,
    color: '#666',
    flex: 14,
  },
  countContainerStyle: {
    backgroundColor: '#eee',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: 'transparent',
    marginBottom: 8,
    width: 15
  },
  countStyle: {
    color: '#666',
    textAlign: 'center',
  }
};

const mapStateToProps = (state, ownProps) => {
  const expanded = state.selectedTodoId === ownProps.todo.id;
  return { expanded };
};

export default connect(mapStateToProps, actions)(Todo);
