import React from 'react';
import { View } from 'react-native';
import { CardSection } from './common';

const TodoSubmenu = ({ expanded }) => {
  if (expanded) {
    return (
      <CardSection style={{ backgroundColor: '#f8f8f8' }}>
        <View style={{ height: 48 }} />
      </CardSection>
    );
  }

  return null;
};

export default TodoSubmenu;
