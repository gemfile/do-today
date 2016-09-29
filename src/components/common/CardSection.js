import React from 'react';
import { View } from 'react-native';

const CardSection = ({ style, children }) => {
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
    borderBottomWidth: 1,
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
