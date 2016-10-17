import { NavigationExperimental } from 'react-native';

const { StateUtils: NavigationStateUtils } = NavigationExperimental;

const initialState = {
  index: 0,
  routes: [
    { key: 'todo_list' },
    { key: 'todo' }
  ],
};

export default (state = initialState, action) => {
  let nextState;
  switch (action.type) {
    case 'navigate_back':
      nextState = NavigationStateUtils.back(state);
      break;

    case 'navigate_forward':
      nextState = NavigationStateUtils.forward(state);
      break;
      
    case 'navigate_jump': {
      const key = action.payload;
      nextState = NavigationStateUtils.jumpTo(state, key);
      break;
    }

    default:
      nextState = state;
  }

  return nextState;
};
