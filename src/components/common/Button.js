import React, { PropTypes } from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({ onPress, children, disabled }) => {
  let { buttonStyle, textStyle } = styles;
  const { buttonStyleDisabled, textStyleDisabled } = styles;
  if (disabled) {
    buttonStyle = { ...buttonStyle, ...buttonStyleDisabled };
    textStyle = { ...textStyle, ...textStyleDisabled };
  }

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Text style={textStyle}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

Button.propTypes = {
  onPress: PropTypes.func,
  children: PropTypes.node,
  disabled: PropTypes.bool
};

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: '#007aff',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 3,
    paddingBottom: 3,
  },
  textStyleDisabled: {
    color: '#ddd'
  },
  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#007aff',
    marginLeft: 5,
    marginRight: 5
  },
  buttonStyleDisabled: {
    borderColor: '#ddd'
  }
};

export { Button };
