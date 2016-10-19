/* @flow */

import { SELECT_TODO, DESELECT_TODO } from '../actions/Type';

export default (state: ?number = null, action: Object) => {
  switch (action.type) {
    case SELECT_TODO:
      return action.payload;
    case DESELECT_TODO:
      return null;
    default:
      return state;
  }
};
