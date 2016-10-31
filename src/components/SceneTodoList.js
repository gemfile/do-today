/* @flow */

import React, { Component } from 'react';
import { View, ScrollView, Dimensions } from 'react-native'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchTodos } from 'actions';
import { MKButton } from 'react-native-material-kit';
import { Color } from './common';
import TodoCircle from './TodoCircle';

const { width } = Dimensions.get('window');
const PlainFab = MKButton.plainFab().withBackgroundColor(Color.Red).build();

class SceneTodoList extends Component {
  props: {
    fetchTodos: () => () => void,
    todos: Array<Object>,
    isModifying: boolean;
  };

  state = {
    width: 0,
    heightOfContent: 0,
  };

  componentDidMount() {
    this.props.fetchTodos();
  }

  render() {
    const {
      writingContainerStyle,
      listingContainerStyle,
      wholeContainerStyle,
      buttonContainerStyle,
      buttonStyle
    } = styles;

    const { todos } = this.props;
    const { width, heightOfContent } = this.state;

    const renderTodoCircles = todos.map( todo => (
      <TodoCircle
        key={todo.id}
        todo={todo}
        style={{ width: width, height: heightOfContent }}
      />
    ));

    return (
      <View style={wholeContainerStyle}>
        <View
          style={writingContainerStyle}
          onLayout={ event => {
            this.setState({ width: event.nativeEvent.layout.width });
          }}
        />

        <View
          style={[
            listingContainerStyle,
            { width: this.state.width, height: this.state.heightOfContent }
          ]}
          onLayout={event => {
            this.setState({ heightOfContent: event.nativeEvent.layout.height });
          }}
        >
          <ScrollView
            pagingEnabled
            automaticallyAdjustContentInsets={false}
            horizontal
            removeClippedSubviews
            style={[
              styles.scrollView,
              { width: this.state.heightOfContent,
                height: this.state.width,
                transform: [{ rotate: '90deg' }] }
            ]}
          >
            {renderTodoCircles}
          </ScrollView>
        </View>

        <View style={buttonContainerStyle}>
          <PlainFab style={buttonStyle} />
        </View>
      </View>
    );
  }
}

const styles = {
  scrollView: {
    backgroundColor: '#6A85B1',
  },
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
    zIndex: 0,
    flex: 1
  },
  buttonContainerStyle: {
    position: 'absolute',
    bottom: 0,
    width: width,
    height: 100,
    zIndex: 2,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonStyle: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
};

const mapStateToProps = ({ modifyingTodos, todos }) => {
  const isModifying = modifyingTodos.count() !== 0;
  return { isModifying, ...todos.toObject() };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchTodos,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SceneTodoList);
