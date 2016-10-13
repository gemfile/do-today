/* @flow */

import React, { PropTypes } from 'react';
import { Image, View } from 'react-native';
import tomatoImage from './img/tomato.png';

type Props = {
  imageContainerStyle?: Object,
  imageStyle: Object
};

const TomatoImage = ({ imageContainerStyle, imageStyle }: Props) => (
  <View style={imageContainerStyle}>
    <Image style={imageStyle} source={tomatoImage} />
  </View>
);

export { TomatoImage };
