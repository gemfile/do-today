import React from 'react';
import { View, Text } from 'react-native';
import { TomatoImage } from './common';

const TodoStatus = (props) => {
  const { countStyle, countContainerStyle } = styles;
  const { todo, modifying } = props;
  let menu;
  if (!modifying) {
    menu = (
      <View>
        <TomatoImage imageStyle={{ width: 16, height: 16 }} />
        <View style={countContainerStyle}>
          <Text style={countStyle}>
          {todo.count}
          </Text>
        </View>
      </View>
    );
  } else {
    menu = (
      <View
        style={{ width: 20,
                 height: 20,
                 borderWidth: 3,
                 borderColor: 'red',
                 borderRadius: 3 }}
      />
    );
  }

  return (
    <View
      style={{ flex: 1,
               marginRight: 15,
               justifyContent: 'center',
               alignItems: 'center' }}
    >
      {menu}
    </View>
  );
};

const styles = {
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