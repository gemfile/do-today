/* @flow */

import React, { Component } from 'react';
import { ListView, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchTodos } from 'actions';
import Todo from './Todo';

class ListingOfTodo extends Component {
  props: { fetchTodos: () => () => Object, todos: Array<Object> }
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
        />
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1
  }
}

const mapStateToProps = state => ({
    todos: state.todos,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchTodos,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ListingOfTodo);
