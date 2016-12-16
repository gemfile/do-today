/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  LayoutAnimation,
  UIManager
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectSetting } from 'actions';
import { CardSection } from '../common';
import type { ReducersState } from '../../FlowType';
// import Markdown from 'react-native-simple-markdown';

class ListItem extends Component {
  props: {
    expanded: boolean,
    selectSetting: (id: string) => Object,
    data: { id: string, title: string, description: string }
  }

  componentWillUpdate() {
    LayoutAnimation.easeInEaseOut();
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  renderDescription() {
    const { data, expanded } = this.props;

    if (expanded) {
      return (
        <CardSection>
        </CardSection>
      );
    }
  }

  render() {
    const { titleStyle } = styles;
    const { id, title } = this.props.data;

    return (
      <TouchableWithoutFeedback
        onPress={() => this.props.selectSetting(id)}
      >
        <View>
          <CardSection>
            <Text style={titleStyle}>
              {title}
            </Text>
          </CardSection>
          {this.renderDescription()}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15,
    color: 'white'
  }
};

const mapStateToProps = ({ settings }: ReducersState, { data }) => {
  const expanded = settings.selectedId === data.id;
  return { expanded };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  selectSetting
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ListItem);
