/* @flow */

import React, { Component } from 'react';
import { View, Animated } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { navigateJump, hideModal } from 'actions';
import { MKButton } from 'react-native-material-kit';
import { Color, zIndex, Style } from './components/common';

class RootTabs extends Component {
  props: {
    navigationState: Object,
    hideModal: () => Object,
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
    const { navigateJump, hideModal } = this.props;

    navigateJump(route);
    hideModal();
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
    zIndex: zIndex.RootTabs,
    flexDirection: 'row',
    backgroundColor: Color.Background,
    height: 60,
    ...Style.shadowStyle
  },
  selectedLineStyle: {
    // height: 2,
    backgroundColor: Color.White,
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
  hideModal
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RootTabs);
