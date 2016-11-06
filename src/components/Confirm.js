/* @flow */

import React from 'react';
import { KeyboardAvoidingView, Modal } from 'react-native';
import Writing from './Writing';

type Props = {
  visible: boolean,
  onAccept: () => void,
  onDecline: () => void,
};

const Confirm = ({ visible, onAccept, onDecline }: Props) => {

  const { containerStyle, cardSectionStyle } = styles;

  return (
    <Modal
      style={cardSectionStyle}
      visible={visible}
      transparent
      animationType='fade'
      onRequestClose={() => {}}
    >
      <KeyboardAvoidingView
        style={containerStyle}
        behavior='padding'
      >
        <Writing onAccept={onAccept} onDecline={onDecline} />
      </KeyboardAvoidingView>
    </Modal>
  );
};

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

export default Confirm;
