/* @flow */

import { NOTIFY_NAVIGATING_POSITION } from '../actions/ActionType';

export default (state: number = 0, action: Object) => {
  switch (action.type) {
    case NOTIFY_NAVIGATING_POSITION:
      return action.payload;

    default:
      return state;
  }
};
