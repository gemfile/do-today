import React, { Component, PropTypes } from 'react';
import { TouchableOpacity, Text, View, Animated } from 'react-native';
import { connect } from 'react-redux';
import * as actions from './actions';

class RootTabs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tabWidth: 0,
      barX: new Animated.Value(0)
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

RootTabs.propTypes = {
  navigateJump: PropTypes.func,
  navigationState: PropTypes.object,
  navigatingPosition: PropTypes.number,
};

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

export default connect(mapStateToProps, actions)(RootTabs);
