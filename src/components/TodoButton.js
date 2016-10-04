import React from 'react';
import { Image, View } from 'react-native';
import playImage from './img/play.png';
import PomodoroImage from './PomodoroImage';

const TodoButton = (props) => {
  let symbol;
  const { submenuButton } = props;

  switch (submenuButton) {
    case 'start':
    default:
    symbol = <Image source={playImage} />;
    break;

    case 'stop':
    symbol = (
      <View
        style={{ width: 16,
                 height: 16,
                 backgroundColor: '#000',
                 borderRadius: 1 }}
      />
    );
    break;

    case 'get':
    symbol = <PomodoroImage imageStyle={{ width: 24, height: 24 }} />;
    break;
  }

  return (
    <View style={{ marginLeft: 4 }}>
      {symbol}
    </View>
  );
};

export default TodoButton;
