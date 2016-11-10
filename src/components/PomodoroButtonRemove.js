import React, { Component } from 'react';
import { MKButton } from 'react-native-material-kit';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { deleteTodo } from 'actions';
import { Color, ImageView } from './common';
import DeleteImage from './img/delete.png';

const PlainFab = MKButton.plainFab().withBackgroundColor('argb(255, 255, 255, 0)').build();

class PomodoroButtonRemove extends Component
{
  props: {
    deleteTodo: () => () => void,
    currentTodo: Object
  }

  render() {
    const { deleteImageStyle, buttonStyle } = styles;

    return (
      <PlainFab style={buttonStyle} onPress={ ()=>this.props.deleteTodo(this.props.currentTodo) }>
        <ImageView imageSource={DeleteImage} imageStyle={deleteImageStyle} />
      </PlainFab>
    );
  }
}

const styles = {
  buttonStyle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  deleteImageStyle: {
    tintColor: Color.White,
    width: 24,
    height: 24
  },
};

const mapStateToProps = ({ todosState, pomodoroState }) => {
  const currentTodo = todosState.get('todos').find( todo =>
    todo.index === pomodoroState.get('currentPage')
  );
  return { currentTodo };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  deleteTodo,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PomodoroButtonRemove);
