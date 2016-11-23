/* @flow */

import React, { Component } from 'react';
import { Color, ImageView } from './common';
import { MKButton } from 'react-native-material-kit';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setVislbleOfConfirmAdding } from 'actions';
import WriteImage from './img/write.png';

const PlainFab = MKButton.plainFab().withBackgroundColor('argb(255, 255, 255, 0)').build();

class PomodoroButtonAdd extends Component
{
  props: {
    setVislbleOfConfirmAdding: (visible: boolean) => Object;
  };

  render() {
    const { writeImageStyle, buttonStyle } = styles;

    return (
      <PlainFab style={buttonStyle} onPress={ ()=>this.props.setVislbleOfConfirmAdding(true) }>
        <ImageView imageSource={WriteImage} imageStyle={writeImageStyle} />
      </PlainFab>
    );
  }
}

const styles = {
  buttonStyle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  writeImageStyle: {
    tintColor: Color.White,
    width: 22,
    height: 22,
    marginTop: 2,
  },
};

const mapDispatchToProps = dispatch => bindActionCreators({
  setVislbleOfConfirmAdding,
}, dispatch);

export default connect(null, mapDispatchToProps)(PomodoroButtonAdd);
