/* @flow */

import { NOTIFY_NAVIGATING_POSITION } from '../actions/ActionType';

export default (state: number = 0, action: Object) => {
  let nextState;
  switch (action.type) {
    case NOTIFY_NAVIGATING_POSITION:
      nextState = action.payload;
      break;

    default:
      nextState = state;
  }

  return nextState;
};
