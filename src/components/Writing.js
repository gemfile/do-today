/* @flow */

import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addTodo, typing, focus } from 'actions';
import { MKButton } from 'react-native-material-kit';
import { CardSection, Input, ImageView, Color } from './common';
import WriteImage from './img/write.png';

class Writing extends Component {
  input: Input;
  props: {
    addTodo: (title: string) => () => void,
    typing: (text: string) => Object,
    focus: (isFocused: boolean) => Object,
    typingState: {text: string, isFocused: boolean},
    isModifying: boolean,
    isExpanding: boolean
  };

  onFocus() {
    this.props.focus(true);
  }

  onChangeText(text) {
    this.props.typing(text);
  }

  onEndEditing() {
    this.props.focus(false);
  }

  onSubmitEditing() {
    const { focus, typing, addTodo, typingState } = this.props;
    const latestText = typingState.text;

    focus(false);
    typing('');
    this.input.clear();

    if (latestText !== '') {
      addTodo(latestText);
    }
  }

  renderButton() {
    const { isModifying, typingState } = this.props;
    const { text, isFocused } = typingState;
    const isValueEmpty = text === '';
    const buttonColor = isValueEmpty ? Color.Dim : Color.Green;

    if ( (isFocused || !isValueEmpty) && !isModifying ) {
      const ColoredRaisedButton = MKButton.coloredButton()
        .withBackgroundColor(buttonColor)
        .withText('Add')
        .build();

      return (
        <View style={styles.lowerContainerStyle}>
          <ColoredRaisedButton
            enabled={!isValueEmpty}
            onPress={this.onSubmitEditing.bind(this)}
          />
        </View>
      );
    }
  }

  render() {
    const {
      wholeContainerStyle,
      upperContainerStyle,
      imageStyle,
      inputContainerStyle,
    } = styles;

    const { text, isFocused } = this.props.typingState;

    return (
      <CardSection>
        <View style={wholeContainerStyle}>

          <View style={upperContainerStyle}>
            <ImageView imageStyle={imageStyle} imageSource={WriteImage} />
            <View style={inputContainerStyle}>
              <Input
                placeholder={'What To Do'}
                onFocus={this.onFocus.bind(this)}
                onChangeText={this.onChangeText.bind(this)}
                onEndEditing={this.onEndEditing.bind(this)}
                onSubmitEditing={this.onSubmitEditing.bind(this)}
                value={text}
                editable={isFocused}
                ref={(component) => { this.input = component; }}
              />
            </View>
          </View>

          { this.renderButton() }

        </View>
      </CardSection>
    );
  }
}

const styles = {
  wholeContainerStyle: {
    flex: 1,
    flexDirection: 'column',
  },

  upperContainerStyle: {
    height: 50,
    flex: 1,
    flexDirection: 'row',
  },
  imageStyle: {
    width: 24,
    height: 24,
    tintColor: Color.Dim
  },

  inputContainerStyle: {
    flex: 6,
    marginRight: 2
  },

  lowerContainerStyle: {
    height: 40,
    width: 150,
    alignSelf: 'flex-end',
    marginRight: 7
  },
};

const mapDispatchToProps = dispatch => bindActionCreators({
  addTodo,
  typing,
  focus
}, dispatch);

const mapStateToProps = ({ selectedTodoId, typingState }) => {
  const isExpanding = selectedTodoId !== null;
  return { isExpanding, typingState: typingState.toObject() };
};

export default connect(mapStateToProps, mapDispatchToProps)(Writing);
