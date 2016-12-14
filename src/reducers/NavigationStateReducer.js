/* @flow */

import { NavigationExperimental } from 'react-native';
import { NAVIGATE_BACK, NAVIGATE_FORWARD, NAVIGATE_JUMP } from '../actions/ActionType';
import type { NavigationState, Action } from '../FlowType';

const { StateUtils: NavigationStateUtils } = NavigationExperimental;

const initialState = {
  index: 0,
  routes: [
    { key: 'settings' },
    { key: 'todo_circles' },
    { key: 'archives' },
  ],
};

export default (state: NavigationState = initialState, action: Action<string>) => {
  switch (action.type) {
    case NAVIGATE_BACK:
      return NavigationStateUtils.back(state);

    case NAVIGATE_FORWARD:
      return NavigationStateUtils.forward(state);

    case NAVIGATE_JUMP: {
      const key = action.payload;
      return NavigationStateUtils.jumpTo(state, key);
    }

    default:
      return state;
  }
};
