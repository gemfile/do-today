/* @flow */

import React, { Component } from 'react';
import { NavigationExperimental, View, Animated, Easing } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { navigateBack, navigateForward, notifyNavigatingPosition } from 'actions';
import AnimatedValueSubscription from 'utils/AnimatedValueSubscription';
import { zIndex } from './components/common';

const {
  Transitioner: NavigationTransitioner,
  Card: NavigationCard,
} = NavigationExperimental;

const {
  PagerPanResponder: NavigationPagerPanResponder,
  PagerStyleInterpolator: NavigationPagerStyleInterpolator
} = NavigationCard;

class RootNavigator extends Component {
  props: {
    notifyNavigatingPosition: (position: number) => Object,
    navigateBack: () => Object,
    navigateForward: () => Object,
    navigationState: Object,
    renderScene: (sceneName: string) => React.Element<*>
  };
  positionListener: AnimatedValueSubscription;

  renderScene(sceneProps) {
    if (!this.positionListener) {
      this.positionListener = new AnimatedValueSubscription(
        sceneProps.position,
        (data: Object) => { this.props.notifyNavigatingPosition(data.value); }
      );
    }

    const scenes = sceneProps.scenes.map((scene) => {
      let renderingScene = this.props.renderScene(scene.key);

      // boilerplate
      const combineSceneProps = { ...sceneProps, scene };
      const sceneStyle = [
        styles.sceneStyle,
        NavigationPagerStyleInterpolator.forHorizontal(combineSceneProps)
      ];

      const panHandlers = NavigationPagerPanResponder.forHorizontal({
        ...combineSceneProps,
        onNavigateBack: () => this.props.navigateBack(),
        onNavigateForward: () => this.props.navigateForward(),
      });

      return (
        <Animated.View key={scene.key} style={sceneStyle} {...panHandlers}>
          {renderingScene}
        </Animated.View>
      );
    });

    return scenes;
  }

  configureTransition() {
    return {
      duration: 195,
      easing: Easing.out(Easing.cubic),
    }
  }

  render() {
    return (
      <View style={styles.containerStyle}>
        <NavigationTransitioner
          navigationState={this.props.navigationState}
          render={this.renderScene.bind(this)}
          configureTransition={this.configureTransition.bind(this)}
        />
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    zIndex: zIndex.RootNavigator,
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  sceneStyle: {
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
};

const mapStateToProps = ({ navigationState }) => ({
  navigationState,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  navigateBack,
  navigateForward,
  notifyNavigatingPosition
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RootNavigator);
