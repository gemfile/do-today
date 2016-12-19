/* @flow */

import React, { Component } from 'react';
import { View, Modal, Keyboard, LayoutAnimation } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { showModalEditing, editTodo, typing } from 'actions';
import type { ReducersState } from '../../FlowType';
import { Color } from '../common';
import Writing from './Writing';

class ModalEditing extends Component {
  props: {
    visible: boolean,
    showModalEditing: (visible: boolean) => Object,
    editTodo: (title: string, todo: Object) => () => void,
    todo: Object,
    typing: (text: string) => Object,
  }
  keyboardDidHide: Object;

  componentDidMount() {
    this.keyboardDidHide = Keyboard.addListener('keyboardDidHide', () => {
      // this.props.showModalEditing(false);
    });
  }

  componentWillReceiveProps(nextProps) {
    const { todo, typing } = nextProps;

    if (todo && this.props.todo !== todo) {
      typing(todo.title);
    }
  }

  componentWillUpdate() {
    LayoutAnimation.spring();
  }

  componentWillUnmount() {
    this.keyboardDidHide.remove();
  }

  render() {
    const { wholeContainerStyle, modalStyle } = styles;
    const { showModalEditing, visible, editTodo, todo } = this.props;

    return (
      <Modal
        style={modalStyle}
        visible={visible}
        animationType='fade'
        onRequestClose={() => showModalEditing(false)}
        transparent
      >
        <View style={wholeContainerStyle}>
          <Writing
            todo={todo}
            placeholder={'Edit the title'}
            buttonText={'Edit'}
            onAccept={(latestText) => {editTodo(latestText, todo), showModalEditing(false)}}
            onDecline={() => showModalEditing(false)}
          />
        </View>
      </Modal>
    );
  }
}

const styles = {
  modalStyle: {
    flex: 1,
  },
  wholeContainerStyle: {
    backgroundColor: 'white',
    flex: 1,
    position: 'relative',
  },
};

const mapStateToProps = ({ modalVisible }: ReducersState) => {
  const { editing: visible, todo } = modalVisible;
  return { visible, todo };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  showModalEditing,
  editTodo,
  typing,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditing);
