import React, { Component } from 'react';
import { ListView, View } from 'react-native';
import { connect } from 'react-redux';
import { Card } from './common';
import Todo from './Todo';

class ListingOfTodo extends Component {
  componentWillMount() {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(this.props.todos);
  }

  renderRow(todo) {
    return <Todo todo={todo} />;
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Card style={{ flex: 1 }}>
          <ListView
            dataSource={this.dataSource}
            renderRow={this.renderRow}
          />
        </Card>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  todos: state.todos
});

export default connect(mapStateToProps)(ListingOfTodo);
