/* @flow */

import React, { Component } from 'react';
import { View, Modal, Keyboard } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setVislbleOfConfirmAdding } from 'actions';
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

  componentWillUnmount() {
    this.keyboardDidHide.remove();
  }

  render() {
    const { containerStyle, cardSectionStyle } = styles;

    return (
      <Modal
        style={cardSectionStyle}
        visible={this.props.visible}
        transparent
        animationType='fade'
        onRequestClose={() => this.props.setVislbleOfConfirmAdding(false)}
      >
        <View
          style={containerStyle}
        >
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
  cardSectionStyle: {
    flex: 1,
  },
  containerStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    flex: 1,
    position: 'relative',
    justifyContent: 'center'
  }
};

const mapStateToProps = ({ modalVisible }) => {
  const { confirmAdding: visible } = modalVisible;
  return { visible };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  setVislbleOfConfirmAdding,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmAdding);
