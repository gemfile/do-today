import React, { Component } from 'react';
import { TouchableOpacity, Text, View, Animated, Easing } from 'react-native';
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
    const { wholeContainerStyle, tabContainerStyle, selectedLineStyle } = styles;
    const { navigationState, navigatingPosition } = this.props;
    const { tabWidth } = this.state;

    const renderingTabs = navigationState.routes.map((route, index) => {
      const selected = navigationState.index === index;

      return (
        <TouchableOpacity
          key={route.key}
          style={{ flex: 1 }}
          onLayout={
            event => {
              this.setState({ tabWidth: event.nativeEvent.layout.width });
            }
          }
          onPress={this.onPress.bind(this, route.key)}
        >
          <View style={tabContainerStyle}>
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
  tabContainerStyle: {
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
