/* @flow */

import React, { Component } from 'react';
import { View, Modal, Keyboard, LayoutAnimation } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { showModalAdding } from 'actions';
import type { ReducersState } from '../FlowType';
import { Color } from './common';
import Writing from './Writing';

class ModalAdding extends Component {
  props: {
    visible: boolean,
    showModalAdding: (visible: boolean) => Object,
  }
  writing: Writing;
  keyboardDidHide: Object;

  componentDidMount() {
    this.keyboardDidHide = Keyboard.addListener('keyboardDidHide', () => {
      this.props.showModalAdding(false);
    });
  }

  componentWillUpdate() {
    LayoutAnimation.spring();
  }

  componentWillUnmount() {
    this.keyboardDidHide.remove();
  }

  render() {
    const { wholeContainerStyle, modalStyle } = styles;

    return (
      <Modal
        style={modalStyle}
        visible={this.props.visible}
        animationType='fade'
        onRequestClose={() => this.props.showModalAdding(false)}
        transparent
      >
        <View style={wholeContainerStyle}>
          <Writing
            ref={component => {this.writing = component}}
            onAccept={() => this.props.showModalAdding(false)}
            onDecline={() => this.props.showModalAdding(false)}
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
    backgroundColor: Color.Deactivated,
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
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ModalAdding);
