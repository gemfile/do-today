/* @flow */

import React, { Component } from 'react';
import { View, Modal, Keyboard, LayoutAnimation } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setVislbleOfConfirmAdding } from 'actions';
import type { ReducersState } from '../FlowType';
import { Color } from './common';
import Writing from './Writing';

class ConfirmAdding extends Component {
  props: {
    visible: boolean,
    setVislbleOfConfirmAdding: (visible: boolean) => Object,
  }
  writing: Writing;
  keyboardDidHide: Object;

  componentDidMount() {
    this.keyboardDidHide = Keyboard.addListener('keyboardDidHide', () => {
      this.props.setVislbleOfConfirmAdding(false);
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
        onRequestClose={() => this.props.setVislbleOfConfirmAdding(false)}
        transparent
      >
        <View style={wholeContainerStyle}>
          <Writing
            ref={component => {this.writing = component}}
            onAccept={() => this.props.setVislbleOfConfirmAdding(false)}
            onDecline={() => this.props.setVislbleOfConfirmAdding(false)}
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
  const { confirmAdding: visible } = modalVisible;
  return { visible };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  setVislbleOfConfirmAdding,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmAdding);
