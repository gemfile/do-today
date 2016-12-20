/* @flow */

import React, { Component } from 'react';
import { View, Modal, LayoutAnimation } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { showModalAdding, addTodo } from 'actions';
import type { ReducersState } from '../../FlowType';
import Writing from './Writing';

class ModalAdding extends Component {
  props: {
    visible: boolean,
    showModalAdding: (visible: boolean) => Object,
    addTodo: (title: string) => () => void,
  }
  keyboardDidHide: Object;

  componentWillUpdate() {
    LayoutAnimation.spring();
  }

  componentWillUnmount() {
    this.keyboardDidHide.remove();
  }

  render() {
    const { wholeContainerStyle, modalStyle } = styles;
    const { showModalAdding, visible, addTodo } = this.props;

    return (
      <Modal
        style={modalStyle}
        visible={visible}
        animationType='fade'
        onRequestClose={() => showModalAdding(false)}
        transparent
      >
        <View style={wholeContainerStyle}>
          <Writing
            onAccept={(latestText) => {addTodo(latestText), showModalAdding(false)}}
            onDecline={() => showModalAdding(false)}
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
  const { adding: visible } = modalVisible;
  return { visible };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  showModalAdding,
  addTodo,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ModalAdding);
