import React from 'react';
import { Image, View } from 'react-native';
import tomatoImage from './img/tomato.png';

const TomatoImage = ({ imageContainerStyle, imageStyle }) => (
  <View style={imageContainerStyle}>
    <Image style={imageStyle} source={tomatoImage} />
  </View>
);

export { TomatoImage };
