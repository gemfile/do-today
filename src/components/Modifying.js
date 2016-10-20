import React from 'react';
import { View } from 'react-native';
import { MKButton } from 'react-native-material-kit';
import { ImageView } from './common';
import InboxDoneImage from './img/inbox_done.png';
import InboxCloseImage from './img/inbox_close.png';

const Modifying = () => {
  const { containerStyle, buttonStyle, iconStyle } = styles;

  return (
    <View style={containerStyle}>
      <MKButton style={buttonStyle}>
        <ImageView imageSource={InboxDoneImage} imageStyle={iconStyle} />
      </MKButton>

      <MKButton style={buttonStyle}>
        <ImageView imageSource={InboxCloseImage} imageStyle={iconStyle}/>
      </MKButton>
    </View>
  );
};

const styles = {
  containerStyle: {
    flex: 1,
    flexDirection: 'row',
  },
  buttonStyle: {
    flex: 1
  },
  iconStyle: {
    width: 24,
    height: 24,
    tintColor: '#fff'
  },
}

export default Modifying;
