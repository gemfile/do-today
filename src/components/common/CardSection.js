/* @flow */

import React from 'react';
import { View } from 'react-native';
import { Color } from './Color';

type Props = {
  style?: Object,
  children?: React.Element<*>,
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
    flex: 1,
    padding: 5,
    borderColor: Color.Deactivated,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'relative'
  }
};

export { CardSection };
