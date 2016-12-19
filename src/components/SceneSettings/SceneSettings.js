/* @flow */

import React, { Component } from 'react';
import { View, ListView } from 'react-native';
import { connect } from 'react-redux';
import ListItem from './ListItem';
import { CardSection } from '../common';
import type { ReducersState } from '../../FlowType';

class SceneSettings extends Component {
  dataSource: ListView.DataSource;
  props: {
    settingDatas: {}
  };

  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(props.settingDatas);
  }

  renderRow(data) {
    return <ListItem data={data} />;
  }

  renderHeader() {
    return (
      <View
        style={{ flex: 1, padding: 8 }}
        onLayout={event => {
          const layout = event.nativeEvent.layout;
          console.log('hoi', layout.width);
        }}
      />
    )
  }

  render() {
    const { containerStyle } = styles;

    return (
      <View style={containerStyle}>
        <ListView
          dataSource={this.dataSource}
          renderRow={this.renderRow}
          renderHeader={this.renderHeader}
        />
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    top: 60
  },
}

const mapStateToProps = ({ settings }: ReducersState) => {
  return { settingDatas: settings.data };
};

export default connect(mapStateToProps)(SceneSettings);
