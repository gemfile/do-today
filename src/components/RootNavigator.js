/* @flow */

import React, { Component, PropTypes } from 'react';
import { NavigationExperimental, View, Text, Animated } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { navigateBack, navigateForward, notifyNavigatingPosition } from 'actions';
import Writing from './Writing';
import ListingOfTodo from './ListingOfTodo';
import AnimatedValueSubscription from './util/AnimatedValueSubscription';

const {
  Transitioner: NavigationTransitioner,
  Card: NavigationCard,
} = NavigationExperimental;

const {
  PagerPanResponder: NavigationPagerPanResponder,
  PagerStyleInterpolator: NavigationPagerStyleInterpolator
} = NavigationCard;

class RootNavigator extends Component {
  positionListener: AnimatedValueSubscription;

  renderTodoListScene() {
    const {
      writingContainerStyle,
      listingContainerStyle,
      wholeContainerStyle
    } = styles;

    return (
      <View style={wholeContainerStyle}>

        <View style={writingContainerStyle}>
          <Writing />
        </View>

        <View style={listingContainerStyle}>
          <ListingOfTodo />
        </View>

      </View>
    );
  }

  renderScene(sceneProps) {
    if (!this.positionListener) {
      this.positionListener = new AnimatedValueSubscription(
        sceneProps.position,
        (data) => { this.props.notifyNavigatingPosition(data.value); }
      );
    }

    const scenes = sceneProps.scenes.map((scene) => {
      let renderingScene;
      switch (scene.key) {
        case 'scene_todo_list':
          renderingScene = this.renderTodoListScene();
          break;

        case 'scene_todo':
        default:
          renderingScene = (
            <View><Text>hi</Text></View>
          );
          break;
      }

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

  render() {
    return (
      <View style={styles.containerStyle}>
        <NavigationTransitioner
          navigationState={this.props.navigationState}
          render={this.renderScene.bind(this)}
        />
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1
  },
  wholeContainerStyle: {
    flex: 1,
    backgroundColor: '#eee',
  },
  writingContainerStyle: {
    borderWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  listingContainerStyle: {
    flex: 1,
  },
  sceneStyle: {
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  }
};

const mapStateToProps = state => ({
  navigationState: state.navigating,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  navigateBack,
  navigateForward,
  notifyNavigatingPosition
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RootNavigator);
