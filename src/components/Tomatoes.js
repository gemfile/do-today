import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { ImageView } from './common';
import TomatoImage from './img/tomato_color.png';

class Tomatoes extends Component {
  props: {
    currentTodo: Object,
  }

  render() {
    const { wholeContainerStyle } = styles;

    const renderTomatoes = <ImageView imageSource={TomatoImage} />;

    return (
      <View style={wholeContainerStyle}>
        { renderTomatoes }
      </View>
    );
  }
}

const styles = {
  wholeContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
}

const mapStateToProps = ({ todosState }) => ({
  currentTodo: todosState.get('currentTodo'),
});

export default connect(mapStateToProps)(Tomatoes);
