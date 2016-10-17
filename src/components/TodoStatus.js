/* @flow */

import React from 'react';
import { View, Text } from 'react-native';
import { TomatoImage } from './common';

type Props = {
  todo: Object,
  modifying?: boolean
};

const TodoStatus = (props: Props) => {
  const {
    wholeContainerStyle,
    imageStyle,
    countStyle,
    countContainerStyle,
    modifyingMenuStyle
  } = styles;

  const { todo, modifying } = props;
  let menu;
  if (!modifying) {
    menu = (
      <View>
        <TomatoImage imageStyle={imageStyle} />
        <View style={countContainerStyle}>
          <Text style={countStyle}>
          {todo.count}
          </Text>
        </View>
      </View>
    );
  } else {
    menu = (
      <View style={modifyingMenuStyle} />
    );
  }

  return (
    <View style={wholeContainerStyle}>
      {menu}
    </View>
  );
};

const styles = {
  wholeContainerStyle: {
    flex: 1,
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modifyingMenuStyle: {
    width: 20,
    height: 20,
    borderWidth: 3,
    borderColor: 'red',
    borderRadius: 3
  },
  imageStyle: {
    width: 16,
    height: 16
  },
  countContainerStyle: {
    backgroundColor: '#eee',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: 'transparent',
    marginBottom: 8,
    width: 15
  },
  countStyle: {
    color: '#666',
    textAlign: 'center',
  }
};

export default TodoStatus;
