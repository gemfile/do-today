/* @flow */

import { NOTIFY_NAVIGATING_POSITION } from '../actions/ActionType';
import type { NavigatingPositionState, Action } from '../FlowType';

export default (state: NavigatingPositionState = 0, action: Action<number>) => {
  switch (action.type) {
    case NOTIFY_NAVIGATING_POSITION:
      return action.payload;

    default:
      return state;
  }
};
