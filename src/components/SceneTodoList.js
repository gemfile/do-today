import React, { Component } from 'react';
import { View } from 'react-native'
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

  render() {
    const {
      writingContainerStyle,
      listingContainerStyle,
      wholeContainerStyle,
      listMenuStyle
    } = styles;

    const { isModifying } = this.props;

    const renderModifying = (isModifying) ? (
      <View style={[listMenuStyle, {width: this.state.width}]}>
        <Modifying />
      </View>
    ) : null;

    return (
      <View
        style={wholeContainerStyle}
        onLayout={ event => {
          this.setState({ width: event.nativeEvent.layout.width });
        }}
      >
        <View style={writingContainerStyle}>
          <Writing />
        </View>

        <View style={listingContainerStyle}>
          <TodoList />
        </View>

        { renderModifying }
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
  },
  listingContainerStyle: {
    flex: 1,
  },
  listMenuStyle: {
    flex: 1,
    height: 48,
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    bottom: 0
  }
};

const mapStateToProps = ({ modifyingTodos }) => {
  const isModifying = modifyingTodos.count() !== 0;
  return { isModifying };
};

export default connect(mapStateToProps)(SceneTodoList);
