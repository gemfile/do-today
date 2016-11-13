import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addTodo, typing, focus } from 'actions';
import { MKButton } from 'react-native-material-kit';
import { CardSection, Input, ImageView, Color } from './common';
import WriteImage from './img/write.png';

const ColoredButtonAdd =
  MKButton.accentColoredFlatButton().
  withText('Add').withTextStyle({color: Color.Green}).build();

const ColoredButtonAddDiabled =
  MKButton.accentColoredFlatButton().
  withText('Add').withTextStyle({color: Color.Dim}).build();

const ColoredButtonCancel =
  MKButton.accentColoredFlatButton().
  withText('Cancel').withTextStyle({color: Color.Green}).build();

class Writing extends Component {
  input: Input;
  props: {
    addTodo: (title: string) => () => void,
    typing: (text: string) => Object,
    focus: (isFocused: boolean) => Object,
    typingState: {text: string, isFocused: boolean},
    isModifying: boolean,
    isExpanding: boolean,
    onDecline: () => void,
    onAccept: () => void
  };

  onFocus() {
    this.props.focus(true);
  }

  onChangeText(text) {
    this.props.typing(text);
  }

  onEndEditing() {
    this.props.focus(false);
    this.props.onDecline();
  }

  onSubmitEditing() {
    const { focus, typing, addTodo, typingState } = this.props;
    const latestText = typingState.text;

    focus(false);
    typing('');
    this.input.clear();
    this.props.onAccept();

    if (latestText !== '') {
      addTodo(latestText);
    }
  }

  renderButton() {
    const { typingState } = this.props;
    const { text } = typingState;
    const isValueEmpty = text === '';
    const ColoredButtonAddSelected =
      isValueEmpty ? ColoredButtonAddDiabled : ColoredButtonAdd;

    return (
      <View style={styles.lowerContainerStyle}>
        <View style={styles.buttonContainerStyle}>
          <ColoredButtonCancel
            onPress={this.onEndEditing.bind(this)}
          />
        </View>
        <View style={styles.buttonContainerStyle}>
          <ColoredButtonAddSelected
            enabled={!isValueEmpty}
            onPress={this.onSubmitEditing.bind(this)}
          />
        </View>
      </View>
    );
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
                ref={component => {this.input = component}}
                autoFocus
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
    height: 60,
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
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  buttonContainerStyle: {
    height: 40,
    width: 100,
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
