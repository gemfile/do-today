import React, { Component } from 'react';
import {
  Text,
  View,
  PixelRatio,
  TouchableWithoutFeedback
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectTodo, modifyTodo, navigateJump } from 'actions';
import { CardSection, Color } from './common';
import { MKCheckbox } from 'react-native-material-kit';
import TodoStatus from './TodoStatus';

const pixelRatio = PixelRatio.get();

class Todo extends Component {
  props: {
    todo: Object,
    expanded: boolean,
    checked: boolean,
    modifyTodo: (todo: Object, checked: boolean) => Object,
    selectTodo: () => Object
  };

  onLongPress() {

  }

  onCheckedChange({ checked }) {
    const { todo } = this.props;
    this.props.modifyTodo(todo, checked);
  }

  onPress() {
    const { todo, expanded } = this.props;

    if (!expanded) {
      this.props.selectTodo(todo.id);
    }
  }

  render() {
    const { todo, expanded, checked } = this.props;
    const { titleStyle, shadowStyle, checkedStyle, wholeContainerStyle } = styles;
    let { todoStyle } = styles;
    if (expanded) {
      todoStyle = { ...todoStyle, ...shadowStyle };
    }
    if (checked) {
      todoStyle = { ...todoStyle, ...checkedStyle };
    }

    return (
      <TouchableWithoutFeedback
        underlayColor='transparent'
        onPress={this.onPress.bind(this)}
        onLongPress={this.onLongPress.bind(this)}
      >
        <View style={wholeContainerStyle}>
          <CardSection style={todoStyle}>
            <MKCheckbox
              fillColor={Color.Red}
              borderOnColor={Color.Red}
              borderOffColor={Color.Clickable}
              onCheckedChange={this.onCheckedChange.bind(this)}
              checked={checked}
              name={todo.title}
              style={{ width: 44 / pixelRatio, height: 44 / pixelRatio, borderWidth: 4 / pixelRatio }}
            />
            <Text style={titleStyle}>
              {todo.title}
            </Text>
            <TodoStatus todo={todo} />
          </CardSection>
        </View>
      </TouchableWithoutFeedback>

    );
  }
}

const styles = {
  wholeContainerStyle: {
    borderWidth: 2 / pixelRatio,
    borderRadius: 2 / pixelRatio,
    borderColor: Color.TodoBackground,
    marginTop: 3 / pixelRatio,
    marginLeft: 3 / pixelRatio,
    marginRight: 3 / pixelRatio,
  },
  todoStyle: {
    height: 76,
  },
  checkedStyle: {
    backgroundColor: Color.Background
  },
  shadowStyle: {
    borderWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2 / pixelRatio,
  },
  titleStyle: {
    fontSize: 20,
    marginLeft: 15 / pixelRatio,
    color: '#333',
    flex: 14,
  },
};

const mapStateToProps = ({ selectedTodoId, modifyingTodos }, { todo }) => {
  const expanded = selectedTodoId === todo.id;
  const checked = modifyingTodos.some(modifyingTodo => modifyingTodo.id === todo.id);
  return { expanded, checked };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  selectTodo,
  modifyTodo,
  navigateJump
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
