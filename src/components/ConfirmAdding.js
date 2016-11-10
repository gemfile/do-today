/* @flow */

import React, { Component } from 'react';
import { View, Modal } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setVislbleOfConfirmAdding } from 'actions';
import Writing from './Writing';

class ConfirmAdding extends Component {
  props: {
    visible: boolean,
    setVislbleOfConfirmAdding: (visible: boolean) => Object,
  }

  render () {
    const { containerStyle, cardSectionStyle } = styles;

    return (
      <Modal
        style={cardSectionStyle}
        visible={this.props.visible}
        transparent
        animationType='fade'
        onRequestClose={() => {}}
      >
        <View
          style={containerStyle}
        >
          <Writing
            onAccept={ ()=>this.props.setVislbleOfConfirmAdding(false) }
            onDecline={ ()=>this.props.setVislbleOfConfirmAdding(false) }
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
