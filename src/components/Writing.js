/* @flow */

import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addTodo } from 'actions';
import { MKButton } from 'react-native-material-kit';
import { CardSection, Input, ImageView, Color } from './common';
import WriteImage from './img/write.png';

class Writing extends Component {
  input: Input;
  props: {
    addTodo: (title: string) => void,
    isModifying: boolean
  };

  state = {
    inputIsFocused: false,
    inputValue: ''
  };

  onFocus() {
    this.setState({ inputIsFocused: true });
  }

  onChangeText(text) {
    this.setState({ inputValue: text });
  }

  onSubmitEditing() {
    const savedValue = this.state.inputValue;
    this.setState({
      inputIsFocused: false,
      inputValue: ''
    });
    this.input.clear();

    if (savedValue !== '') {
      this.props.addTodo(savedValue);
    }
  }

  renderButton() {
    const isValueEmpty = this.state.inputValue === '';
    const buttonColor = isValueEmpty ? Color.Dim : Color.Red;
    if ((this.state.inputIsFocused || !isValueEmpty) && !this.props.isModifying) {
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
                onSubmitEditing={this.onSubmitEditing.bind(this)}
                value={this.state.inputValue}
                editable={this.state.inputIsFocused}
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
}, dispatch);

export default connect(null, mapDispatchToProps)(Writing);
