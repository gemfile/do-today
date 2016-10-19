/* @flow */

import { NavigationExperimental } from 'react-native';
import { NAVIGATE_BACK, NAVIGATE_FORWARD, NAVIGATE_JUMP } from '../actions/Type';

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
  let nextState;
  switch (action.type) {
    case NAVIGATE_BACK:
      nextState = NavigationStateUtils.back(state);
      break;

    case NAVIGATE_FORWARD:
      nextState = NavigationStateUtils.forward(state);
      break;

    case NAVIGATE_JUMP: {
      const key = action.payload;
      nextState = NavigationStateUtils.jumpTo(state, key);
      break;
    }

    default:
      nextState = state;
  }

  return nextState;
};
