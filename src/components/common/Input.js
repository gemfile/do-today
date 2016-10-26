/* @flow */

import React, { Component } from 'react';
import { TextInput, View } from 'react-native';

class Input extends Component {
  props: {
    value: string,
    placeholder: string,
    secureTextEntry?: boolean,
    onChangeText: (text: string) => void,
    onSubmitEditing: () => void,
    onEndEditing: () => void,
    onFocus: () => void
  };
  textInput: TextInput;

  clear() {
    this.textInput.setNativeProps({ editable: false });
    this.textInput.setNativeProps({ editable: true });
  }

  render() {
    const { inputStyle, inputContainerStyle } = styles;
    const {
      value,
      placeholder,
      secureTextEntry,
      onChangeText,
      onEndEditing,
      onSubmitEditing,
      onFocus,
    } = this.props;

    return (
      <View style={inputContainerStyle}>
        <TextInput
          secureTextEntry={secureTextEntry}
          placeholder={placeholder}
          autoCorrect={false}
          style={inputStyle}
          value={value}
          onChangeText={onChangeText}
          onFocus={onFocus}
          onEndEditing={onEndEditing}
          onSubmitEditing={onSubmitEditing}
          ref={(component) => { this.textInput = component; }}
        />
      </View>
    );
  }
}

const styles = {
  inputStyle: {
    flex: 1,
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 16,
    lineHeight: 10,
  },
  inputContainerStyle: {
    flex: 1,
    borderColor: '#ddd',
    margin: 2,
  },
};

export { Input };
