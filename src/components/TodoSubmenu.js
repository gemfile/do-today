import React from 'react';
import { View } from 'react-native';
import { CardSection } from './common';

const TodoSubmenu = ({ expanded }) => {
  if (expanded) {
    return (
      <CardSection>
        <View style={{ height: 48 }} />
      </CardSection>
    );
  }

  return null;
};

export default TodoSubmenu;
