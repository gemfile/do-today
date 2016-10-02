import React from 'react';
import { Image, View } from 'react-native';
import pomodoroImage from './img/pomodoro.png';

const PomodoroImage = ({ imageContainerStyle, imageStyle }) => (
  <View style={imageContainerStyle}>
    <Image style={imageStyle} source={pomodoroImage} />
  </View>
);

export default PomodoroImage;
