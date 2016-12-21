/* @flow */

import React from 'react';
import { View } from 'react-native';

type Props = {
  width: number,
  height: number,
  color: string,
  style: Object
};

const RightArrow = ({ color, width, height, style }: Props) => {
  const rightArrowStyle = {
    borderTopWidth: height/2.0,
    borderRightWidth: 0,
    borderBottomWidth: height/2.0,
    borderLeftWidth: width,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: color,
  };

  return (
    <View style={[ styles.basicStyle, rightArrowStyle, style]}/>
  );
};

const styles = {
  basicStyle: {
     width: 0,
     height: 0,
     backgroundColor: 'transparent',
     borderStyle: 'solid',
   },
};

export { RightArrow };
