/* @flow */

import React, { PropTypes } from 'react';
import { View } from 'react-native';

type Props = {
  style?: Object,
  children?: React$Element<*>,
};

const CardSection = ({ style, children }: Props) => {
  let { containerStyle } = styles;
  if (style) {
    containerStyle = { ...containerStyle, ...style };
  }

  return (
    <View style={containerStyle}>
      {children}
    </View>
  );
};

const styles = {
  containerStyle: {
    padding: 5,
    backgroundColor: '#fff',
    borderColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'relative'
  }
};

export { CardSection };
