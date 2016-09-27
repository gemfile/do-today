import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { Card, CardSection, Input, Button } from './common';

class Writing extends Component {
  onFocus() {

  }

  renderButton() {
    return (
      <Button />
    );
  }

  render() {
    const {
      wholeContainerStyle,
      upperContainerStyle,
      imageContainerStyle,
      imageStyle,
      inputContainerStyle,
      lowerContainerStyle,
    } = styles;

    return (
      <Card>
        <CardSection>
          <View style={wholeContainerStyle}>

            <View style={upperContainerStyle}>
              <View style={imageContainerStyle}>
                <Image
                  style={imageStyle}
                  source={require('./img/pomodoro.png')}
                />
              </View>
              <View style={inputContainerStyle}>
                <Input
                  placeholder={'What will you do today?'}
                  onFocus={this.onFocus.bind(this)}
                />
              </View>
            </View>

            <View style={lowerContainerStyle}>
              <Button>Add</Button>
            </View>

          </View>
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  wholeContainerStyle: {
    flex: 1,
    flexDirection: 'column',
  },

  upperContainerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
  },
  imageContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageStyle: {
    width: 36,
    height: 36,
  },
  inputContainerStyle: {
    flex: 6,
    marginRight: 8
  },

  lowerContainerStyle: {
    height: 40,
    width: 150,
    alignSelf: 'flex-end',
    padding: 6,
  }
};

export default Writing;
