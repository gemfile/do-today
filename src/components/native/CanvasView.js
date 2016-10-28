/* @flow */

import { PropTypes } from 'react';
import { requireNativeComponent, View } from 'react-native';

const iface = {
  name: 'CanvasView',
  propTypes: {
    ...View.propTypes,
    angle: PropTypes.number,
    doneColor: PropTypes.string,
    frontColor: PropTypes.string,
    height: PropTypes.number,
    strokeWidth: PropTypes.number,
    width: PropTypes.number
  }
};

export default requireNativeComponent('CanvasView', iface)
