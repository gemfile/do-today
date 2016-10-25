/* @flow */

import { NavigationExperimental } from 'react-native';
import { NAVIGATE_BACK, NAVIGATE_FORWARD, NAVIGATE_JUMP } from '../actions/ActionType';

const { StateUtils: NavigationStateUtils } = NavigationExperimental;

type State = {
  index: number,
  routes: Array<{key: string, title?: string}>
};

const initialState = {
  index: 0,
  routes: [
    { key: 'todo_list' },
    { key: 'todo' }
  ],
};

export default (state: State = initialState, action: Object) => {
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
