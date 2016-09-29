import React from 'react';
import { View } from 'react-native';

const Card = ({ style, children }) => {
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
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginBottom: -1
  }
};

export { Card };
