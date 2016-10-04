import React, { Component } from 'react';
import { View, Image, TouchableWithoutFeedback } from 'react-native';
import { CardSection } from './common';
import TodoProgress from './TodoProgress';
import playImage from './img/play.png';

class TodoSubmenu extends Component {
  onPlay(event) {
    console.log("onPlay");
  }

  onProgress(event) {
    console.log("onPress");
  }

  render() {
    const { expanded } = this.props;
    const { leftSideContainer, rightSideContainer } = styles;
    if (expanded) {
      return (
        <CardSection style={{ backgroundColor: '#f8f8f8' }}>
          <TouchableWithoutFeedback onPress={this.onProgress.bind(this)}>

            <View style={{ flex: 1, height: 48, flexDirection: 'row' }}>
              <View style={leftSideContainer}>
                <TodoProgress ratio={0} />
              </View>

              <TouchableWithoutFeedback onPress={this.onPlay.bind(this)}>
                <View style={rightSideContainer}>
                  <Image source={playImage} />
                </View>
              </TouchableWithoutFeedback>
            </View>

          </TouchableWithoutFeedback>
        </CardSection>
      );
    }

    return null;
  }
}

const styles = {
  leftSideContainer: {
    flex: 8,
    paddingTop: 9,
    paddingBottom: 35,
    paddingLeft: 0,
    paddingRight: 5,
  },
  rightSideContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 24,
    backgroundColor: '#eee'
  }
};

export default TodoSubmenu;
