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
import { CardSection, Color, OpenUrlText } from '../common';

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

  renderDescription(title: string) {
    const { textStyle, textContainerStyle } = styles;

    switch (title) {
      case 'Support':
      return (
        <Text style={textContainerStyle}>
          <OpenUrlText
            text={'Send an opinion'}
            url={'mailto:gemfile0@gmail.com'}
          />
          <Text style={textStyle}>{` to the developer.`}</Text>
        </Text>
      );

      case 'Credits':
      return (
        <CardSection>
          <Text style={textContainerStyle}>
            <Text style={textStyle}>{`Tomato icons made by `}</Text>
            <OpenUrlText
              text={'madebyoliver'}
              url={'http://www.flaticon.com/authors/madebyoliver'}
            />
            <Text style={textStyle}>{` from `}</Text>
            <OpenUrlText
              text={'www.flaticon.com'}
              url={'http://www.flaticon.com'}
            />
            <Text style={textStyle}>{` is licensed by `}</Text>
            <OpenUrlText
              text={'CC 3.0 BY'}
              url={'http://creativecommons.org/licenses/by/3.0'}
            />
            <Text style={textStyle}>{`.`}</Text>

            <Text style={textStyle}>{`

Other all icons made by `}</Text>
            <OpenUrlText
              text={'Alexandru Stoica'}
              url={'https://dribbble.com/shots/2888226-1800-Free-Minimal-Icon-Pack-20x20'}
            />
            <Text style={textStyle}>{` is licensed by FREE LICENSE.`}</Text>
          </Text>


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
          {this.renderDescription(title)}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15,
    color: 'white',
  },
  textContainerStyle: {
    marginHorizontal: 30
  },
  textStyle: {
    color: Color.PlainText,
    fontSize: 14
  }
};

const mapDispatchToProps = dispatch => bindActionCreators({
  selectSetting
}, dispatch);

export default connect(null, mapDispatchToProps)(ListItem);
