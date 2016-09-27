import React, { Component } from 'react';
import { Text, LayoutAnimation, UIManager } from 'react-native';
import { connect } from 'react-redux';
import { CardSection } from './common';

class Todo extends Component {
  componentWillUpdate() {
    LayoutAnimation.easeInEaseOut();
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  render() {
    const { titleStyle } = styles;
    const { title } = this.props.todo;

    return (
      <CardSection>
        <Text style={titleStyle}>
          {title}
        </Text>
      </CardSection>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 16,
    paddingLeft: 15,
    color: '#666',
    lineHeight: 48
  }
};

export default connect(null, null)(Todo);
