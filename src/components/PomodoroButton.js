import React, { PropTypes } from 'react';
import { Image, View } from 'react-native';
import playImage from './img/play.png';
import { TomatoImage } from './common';

const PomodoroButton = (props) => {
  let symbol;
  const { type } = props;
  const { containerStyle, stopSymbolStyle, getSymbolStyle } = styles;

  switch (type) {
    case 'start':
    default:
    symbol = <Image source={playImage} />;
    break;

    case 'stop':
    symbol = (
      <View style={stopSymbolStyle} />
    );
    break;

    case 'get':
    symbol = <TomatoImage imageStyle={getSymbolStyle} />;
    break;
  }

  return (
    <View style={containerStyle}>
      {symbol}
    </View>
  );
};

PomodoroButton.propTypes = {
  type: PropTypes.string,
}

const styles = {
  containerStyle: {
    marginLeft: 4
  },
  stopSymbolStyle: {
    width: 16,
    height: 16,
    backgroundColor: '#000',
    borderRadius: 1
  },
  getSymbolStyle: {
    width: 24,
    height: 24
  },
}

export default PomodoroButton;
