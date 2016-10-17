/* @flow */

import React, { Component } from 'react';
import { View, Animated } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { navigateJump } from 'actions';
import { MKButton, MKColor } from 'react-native-material-kit';
import { ImageView } from './common';
import TodoListImage from './img/todo_list.png';
import StatsImage from './img/stats.png';

class RootTabs extends Component {
  props: {
    navigationState: Object,
    navigateJump: (key: string) => Object,
    navigatingPosition: (position: number) => Object,
  };
  state: { tabWidth: number };

  constructor(props) {
    super(props);

    this.state = {
      tabWidth: 0,
    };
  }

  onPress(route) {
    this.props.navigateJump(route);
  }

  renderTabs() {
    const { tabContainerStyle, iconStyle, highlightingStyle, iconImageMap } = styles;
    const { navigationState } = this.props;

    return navigationState.routes.map((route, index) => {
      const selected = navigationState.index === index;
      const iconImage = iconImageMap[index];

      const icon = (selected) ?
        <ImageView
          imageSource={iconImage}
          imageStyle={{...iconStyle, ...highlightingStyle}}
        /> :
        <ImageView
          imageSource={iconImage}
          imageStyle={iconStyle}
        />

      return (
        <View key={route.key} style={tabContainerStyle} onLayout={ event => {
          this.setState({ tabWidth: event.nativeEvent.layout.width });
        }}>
          <MKButton
            style={tabContainerStyle}
            onPress={this.onPress.bind(this, route.key)}
          >
            {icon}
          </MKButton>
        </View>
      );
    });
  }

  render() {
    const { wholeContainerStyle, selectedLineStyle } = styles;
    const { navigatingPosition } = this.props;
    const { tabWidth } = this.state;

    return (
      <View style={wholeContainerStyle}>
        <Animated.View
          style={[
            selectedLineStyle,
            {
               width: tabWidth,
               left: navigatingPosition * tabWidth
            }
          ]}
        />
        { this.renderTabs() }
      </View>
    );
  }
}

const styles = {
  tabContainerStyle:  {
    flex: 1
  },
  wholeContainerStyle: {
    flexDirection: 'row',
    backgroundColor: '#f8f8f8',
    height: 60,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    elevation: 10,
  },
  selectedLineStyle: {
    height: 5,
    backgroundColor: MKColor.Red,
    position: 'absolute'
  },
  iconImageMap: {
    '0': TodoListImage,
    '1': StatsImage
  },
  iconStyle: {
    width: 24,
    height: 24,
    tintColor: '#aaaaaa'
  },
  highlightingStyle: {
    tintColor: MKColor.Red
  }
};

const mapStateToProps = state => ({
    navigationState: state.navigating,
    navigatingPosition: state.navigatingPosition
});

const mapDispatchToProps = dispatch => bindActionCreators({
  navigateJump,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RootTabs);
