import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { typing, focus } from 'actions';
import { MKButton } from 'react-native-material-kit';
import type { ReducersState } from '../FlowType';
import { CardSection, Input, ImageView, Color } from './common';
import WriteImage from './img/write.png';
import PlusImage from './img/plus_white.png';

const FabCancel =
  new MKButton.Builder()
  .withFab(true)
  .withRippleLocation('center')
  .withRippleColor('rgba(158, 158, 158, 0.2)')
  .withBackgroundColor(Color.Transparent).build();

const ButtonAdd =
  MKButton.coloredButton()
  .withBackgroundColor(Color.Green)
  .build();

const DiabledButtonAdd =
  MKButton.coloredButton()
  .withBackgroundColor(Color.Dim)
  .build();

class Writing extends Component {
  input: Input;
  props: {
    typing: (text: string) => Object,
    focus: (isFocused: boolean) => Object,
    typingState: {text: string, isFocused: boolean},
    onDecline: () => void,
    onAccept: () => void,
    placeholder: string,
    buttonText: string
  };

  componentWillUnmount() {
    this.onEndEditing();
  }

  onFocus() {
    this.props.focus(true);
  }

  onChangeText(text) {
    this.props.typing(text);
  }

  onEndEditing() {
    const { focus, typing, onDecline } = this.props;

    focus(false);
    typing('');
    onDecline();
  }

  onSubmitEditing() {
    const { focus, typing, typingState } = this.props;
    const latestText = typingState.text;

    focus(false);
    typing('');
    this.input.clear();
    this.props.onAccept(latestText);
  }

  renderButton() {
    const { typingState, buttonText } = this.props;
    const { text } = typingState;
    const { lowerContainerStyle, buttonContainerStyle, buttonTextStyle } = styles;

    const isValueEmpty = text === '';
    const ButtonAddSelected =
      isValueEmpty ? DiabledButtonAdd : ButtonAdd;

    return (
      <View style={lowerContainerStyle}>
        <View style={buttonContainerStyle}>
          <ButtonAddSelected
            enabled={!isValueEmpty}
            onPress={this.onSubmitEditing.bind(this)}
          >
            <Text style={buttonTextStyle}>{buttonText || 'Add'}</Text>
          </ButtonAddSelected>
        </View>
      </View>
    );
  }

  render() {
    const {
      wholeContainerStyle,
      upperContainerStyle,
      penImageStyle,
      inputContainerStyle,
      cancelButtonStyle,
      cancelImageStyle,
      emptyAreaStyle
    } = styles;

    const { placeholder, typingState } = this.props;
    const { text, isFocused } = typingState;

    return (
      <CardSection>
        <View style={wholeContainerStyle}>
          <FabCancel style={cancelButtonStyle} onPress={this.onEndEditing.bind(this)} >
            <ImageView imageSource={PlusImage} imageStyle={cancelImageStyle}/>
          </FabCancel>

          <View style={upperContainerStyle}>
            <ImageView imageStyle={penImageStyle} imageSource={WriteImage} />
            <View style={inputContainerStyle}>
              <Input
                placeholder={placeholder || 'Make a task'}
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

          <View style={emptyAreaStyle} />

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
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  penImageStyle: {
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
    marginRight: 3,
    marginBottom: 3,
  },
  buttonTextStyle: {
    color: Color.White
  },
  cancelButtonStyle: {
    width: 60, height: 60
  },
  cancelImageStyle: {
    tintColor: Color.Green, transform: [{ rotate: '45deg' }]
  },
  emptyAreaStyle: {
    flex: 1
  }
};

const mapDispatchToProps = dispatch => bindActionCreators({
  typing,
  focus
}, dispatch);

const mapStateToProps = ({ typingState }: ReducersState) => {
  return { typingState: typingState.toObject() };
};

export default connect(mapStateToProps, mapDispatchToProps)(Writing);
