import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MKButton } from 'react-native-material-kit';
import { archiveTodos, deleteTodos, clearModifying } from 'actions';
import { ImageView } from './common';
import InboxDoneImage from './img/inbox_done.png';
import InboxCloseImage from './img/inbox_close.png';

class Modifying extends Component {
  props: {
    archiveTodos: (todos: Array<Object>) => () => void,
    deleteTodos: (todos: Array<Object>) => () => void,
    clearModifying: () => Object;
    modifyingTodos: Array<Object>
  };

  onArchive() {
    this.props.archiveTodos(this.props.modifyingTodos);
    this.props.clearModifying();
  }

  onDelete() {
    this.props.deleteTodos(this.props.modifyingTodos);
    this.props.clearModifying();
  }

  render() {
    const { containerStyle, buttonStyle, iconStyle } = styles;

    return (
      <View style={containerStyle}>
        <MKButton style={buttonStyle} onPress={this.onArchive.bind(this)}>
          <ImageView imageSource={InboxDoneImage} imageStyle={iconStyle} />
        </MKButton>

        <MKButton style={buttonStyle} onPress={this.onDelete.bind(this)}>
          <ImageView imageSource={InboxCloseImage} imageStyle={iconStyle}/>
        </MKButton>
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    flexDirection: 'row',
  },
  buttonStyle: {
    flex: 1
  },
  iconStyle: {
    width: 24,
    height: 24,
    tintColor: '#fff'
  },
}

const mapStateToProps = ({ modifyingTodos }) => ({
  modifyingTodos
});

const mapDispatchToProps = dispatch => bindActionCreators({
  archiveTodos, deleteTodos, clearModifying
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Modifying);
