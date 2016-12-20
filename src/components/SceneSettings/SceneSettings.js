/* @flow */

import React, { Component } from 'react';
import { View, ListView } from 'react-native';
import { connect } from 'react-redux';
import ListItem from './ListItem';
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
      <View style={styles.headerStyle} />
    )
  }

  render() {
    return (
      <View style={styles.containerStyle}>
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
  headerStyle: {
    flex: 1,
    padding: 8
  },
}

const mapStateToProps = ({ settings }: ReducersState) => {
  return { settingDatas: settings.data };
};

export default connect(mapStateToProps)(SceneSettings);
