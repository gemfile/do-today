/* @flow */

import React, { Component } from 'react';
import { ListView, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchTodos } from 'actions';
import Todo from './Todo';
import { ImageView } from './common';
import TomatoImage from './img/tomato.png';

class TodoList extends Component {
  props: { fetchTodos: () => () => void, todos: Array<Object> }
  state: { dataSource: ListView.DataSource };
  listViewHeight: number;

  state = {
    dataSource: new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })
  };

  componentWillMount() {
    this.props.fetchTodos();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(nextProps.todos)
    });
  }

  renderRow(todo) {
    return <Todo todo={todo} />;
  }

  renderFooter() {
    const { footerStyle, iconStyle } = styles;

    return (
      <View style={footerStyle}>
        <ImageView
          imageSource={TomatoImage}
          imageStyle={iconStyle}
        />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.containerStyle}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
          onLayout={
            event => {
              this.listViewHeight = event.nativeEvent.layout.height;
            }}
          enableEmptySections
          renderFooter={this.renderFooter.bind(this)}
        />
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1
  },
  footerStyle: {
    alignSelf: 'stretch',
    height: 51,
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconStyle : {
    width: 24,
    height: 24,
    tintColor: '#fff'
  }
}

const mapStateToProps = ({ todos }) => ({
    todos,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchTodos,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
