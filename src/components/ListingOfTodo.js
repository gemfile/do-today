import React, { Component } from 'react';
import { ListView, View } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { Card, Spinner } from './common';
import Todo from './Todo';

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
    firebase.initializeApp({
      apiKey: 'AIzaSyDYYTBUGXBWuPWTecNCB7mdh_V4qJm_3f4',
      authDomain: 'todo-today-45864.firebaseapp.com',
      databaseURL: 'https://todo-today-45864.firebaseio.com',
      storageBucket: 'todo-today-45864.appspot.com',
      messagingSenderId: '806030056707'
    });

    this.itemsRef = firebase.database().ref();
    this.listenForItems(this.itemsRef);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.addingTitle !== nextProps.addingTitle) {
      this.addItem(nextProps.addingTitle, nextProps.addingCount);
    }
  }

  listenForItems(itemsRef) {
    itemsRef.on('value', snap => {
      const items = [];
      snap.forEach((child) => {
        items.push({
          title: child.val().title,
          count: child.val().count,
          id: child.key,
          index: items.length
        });
      });

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items)
      });
    });
  }

  addItem(title, count) {
    this.itemsRef.push({ title, count });
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

const mapStateToProps = state => {
  const { title, count } = state.addingTodo;

  return {
    addingTitle: title,
    addingCount: count,
    todos: state.todos
  };
};

export default connect(mapStateToProps)(ListingOfTodo);
