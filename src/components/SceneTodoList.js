import React, { Component } from 'react';
import { View, LayoutAnimation, Platform, UIManager } from 'react-native'
import { connect } from 'react-redux';
import Writing from './Writing';
import TodoList from './TodoList';
import Modifying from './Modifying';
import { Color } from './common';

class SceneTodoList extends Component {
  props: {
    isModifying: boolean;
  }

  state = {
    width: 0
  };

  componentWillUpdate() {
    LayoutAnimation.easeInEaseOut();
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  render() {
    const {
      writingContainerStyle,
      modifyingContainerStyle,
      listingContainerStyle,
      wholeContainerStyle,
    } = styles;

    const { isModifying } = this.props;

    const renderModifyingOrWriting = (isModifying) ? (
      <View style={[ modifyingContainerStyle, {width: this.state.width} ]}>
        <Modifying />
      </View>
    ) : <Writing isModifying={isModifying} />;

    return (
      <View style={wholeContainerStyle}>
        <View
          style={writingContainerStyle}
          onLayout={ event => {
            this.setState({ width: event.nativeEvent.layout.width });
          }}
        >
          { renderModifyingOrWriting }
        </View>

        <View style={listingContainerStyle}>
          <TodoList />
        </View>
      </View>
    );
  }
}

const styles = {
  wholeContainerStyle: {
    flex: 1,
    backgroundColor: Color.Background,
  },
  writingContainerStyle: {
    borderWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    zIndex: 1
  },
  listingContainerStyle: {
    flex: 1,
    zIndex: 0
  },
  modifyingContainerStyle: {
    height: 60,
    zIndex: 2
  }
};

const mapStateToProps = ({ modifyingTodos }) => {
  const isModifying = modifyingTodos.count() !== 0;
  return { isModifying };
};

export default connect(mapStateToProps)(SceneTodoList);
