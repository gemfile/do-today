/* @flow */

import React from 'react';
import { Image, View } from 'react-native';

type Props = {
  imageStyle?: Object,
  imageSource: number
};

const ImageView = ({ imageStyle, imageSource }: Props) => (
  <View style={styles.containerStyle}>
    <Image style={imageStyle} source={imageSource} />
  </View>
);

const styles = {
  containerStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
};

export { ImageView };
