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

  // componentWillReceiveProps(nextProps) {
  //
  //   console.log('hoiw~', this.props.data, nextProps.data);
  //   if (this.props.data !== nextProps.data) {
  //     const ds = new ListView.DataSource({
  //       rowHasChanged: (r1, r2) => r1 !== r2
  //     });
  //
  //     this.dataSource = ds.cloneWithRows(nextProps.data);
  //   }
  // }

  renderRow(data) {
    return <ListItem data={data} />;
  }

  render() {
    const { containerStyle } = styles;

    // <div>Icons made by <a href="http://www.flaticon.com/authors/madebyoliver" title="Madebyoliver">Madebyoliver</a> from <a href="http://www.flaticon.com" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>

    return (
      <View style={containerStyle}>
        <ListView
          dataSource={this.dataSource}
          renderRow={this.renderRow}
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
