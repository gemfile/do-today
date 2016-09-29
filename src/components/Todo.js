import React, { Component } from 'react';
import {
  Text,
  View,
  LayoutAnimation,
  UIManager,
  TouchableWithoutFeedback,
  Platform
} from 'react-native';
import { connect } from 'react-redux';
import { CardSection } from './common';
import * as actions from './actions';
import TodoSubmenu from './TodoSubmenu';

class Todo extends Component {
  componentWillUpdate() {
    LayoutAnimation.easeInEaseOut();
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  onPress() {
    const { todo, expanded } = this.props;

    if (!expanded) {
      this.props.selectTodo(todo.id);
    } else {
      this.props.deselectTodo();
    }
  }

  render() {
    const { titleStyle } = styles;
    const { todo, expanded } = this.props;

    return (
      <TouchableWithoutFeedback
        onPress={this.onPress.bind(this)}
      >
        <View>
          <CardSection>
            <Text style={titleStyle}>
              {todo.title}
            </Text>
          </CardSection>
          <TodoSubmenu expanded={expanded} />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 20,
    paddingLeft: 15,
    color: '#666',
    lineHeight: 76
  }
};

const mapStateToProps = (state, ownProps) => {
  const expanded = state.selectedTodoId === ownProps.todo.id;
  return { expanded };
};

export default connect(mapStateToProps, actions)(Todo);
