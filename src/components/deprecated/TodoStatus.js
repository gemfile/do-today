import React from 'react';
import { View, Text } from 'react-native';
import { ImageView } from './common';
import TomatoImage from './img/tomato.png'


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
        <View style={countContainerStyle}>
          <ImageView
            imageSource={TomatoImage}
            imageStyle={imageStyle}
          />
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
    width: 14,
    height: 14
  },
  countContainerStyle: {
    backgroundColor: '#eee',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: 'transparent',
    marginBottom: 8,
    width: 20,
    height: 20
  },
  countStyle: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    color: '#666',
    textAlign: 'center',
  }
};

export default TodoStatus;
