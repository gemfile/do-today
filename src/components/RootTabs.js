/* @flow */

import React, { Component } from 'react';
import { TouchableOpacity, Text, View, Animated } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { navigateJump } from 'actions';

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

  render() {
    const { tabContainerStyle, wholeContainerStyle, tabStyle, selectedLineStyle } = styles;
    const { navigationState, navigatingPosition } = this.props;
    const { tabWidth } = this.state;

    const renderingTabs = navigationState.routes.map((route/*, index*/) => {
      // const selected = navigationState.index === index;

      return (
        <TouchableOpacity
          key={route.key}
          style={tabContainerStyle}
          onLayout={
            event => {
              this.setState({ tabWidth: event.nativeEvent.layout.width });
            }
          }
          onPress={this.onPress.bind(this, route.key)}
        >
          <View style={tabStyle}>
            <Text>
              {route.key}
            </Text>
          </View>
        </TouchableOpacity>
      );
    });

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
        {renderingTabs}
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
    backgroundColor: '#f80000',
    position: 'absolute'
  },
  tabStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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
