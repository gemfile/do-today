import React, { Component } from 'react';
import { ListView, View } from 'react-native';
import { connect } from 'react-redux';
import { Card, Spinner } from './common';
import Todo from './Todo';
import * as actions from './actions';

class ListingOfTodo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      })
    };
  }

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
      <View style={{ flex: 1 }}>
        <Card style={{ flex: 1 }}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderRow.bind(this)}
          />
        </Card>
      </View>
    );
  }
}

const mapStateToProps = state => ({
    todos: state.todos
});

export default connect(mapStateToProps, actions)(ListingOfTodo);
