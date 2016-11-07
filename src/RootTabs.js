/* @flow */

import React, { Component } from 'react';
import { View, Animated } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { navigateJump } from 'actions';
import { MKButton } from 'react-native-material-kit';
import { Color } from './components/common';

class RootTabs extends Component {
  props: {
    navigationState: Object,
    navigateJump: (key: string) => Object,
    navigatingPosition: (position: number) => Object,
    renderTabIcon: (tabIndex: string, isSelected:boolean) => React.Element<*>
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
    const { tabContainerStyle } = styles;
    const { navigationState, renderTabIcon } = this.props;

    return navigationState.routes.map((route, index) => {
      const tabIcon = renderTabIcon(index, navigationState.index === index);

      return (
        <View key={route.key} style={tabContainerStyle} onLayout={ event => {
          this.setState({ tabWidth: event.nativeEvent.layout.width });
        }}>
          <MKButton
            style={tabContainerStyle}
            onPress={this.onPress.bind(this, route.key)}
          >
            {tabIcon}
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
  tabContainerStyle: {
    flex: 1,
  },
  wholeContainerStyle: {
    flexDirection: 'row',
    backgroundColor: '#f8f8f8',
    height: 60,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    elevation: 8,
  },
  selectedLineStyle: {
    height: 3,
    backgroundColor: Color.Red,
    position: 'absolute',
    bottom: 0
  },
};

const mapStateToProps = ({ navigationState, navigatingPosition }) => ({
    navigationState,
    navigatingPosition
});

const mapDispatchToProps = dispatch => bindActionCreators({
  navigateJump,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RootTabs);
