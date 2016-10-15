/* @flow */

import React from 'react';
import { View, ActivityIndicator } from 'react-native';

type Props = {
  size: 'large' | 'small'
};

const Spinner = ({ size }: Props) => (
  <View style={styles.spinnerStyle}>
    <ActivityIndicator size={size || 'large'} />
  </View>
);

const styles = {
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
};

export { Spinner };
