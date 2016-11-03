/* @flow */

import { START_POMODORO, STOP_POMODORO, PREPARE_POMODORO } from '../actions/ActionType';
import { Map } from 'immutable';

type State = Map<string, any>;

const initialState = Map({
  currentPage: 0,
  currentState: '',
  nextState: 'start',
});

export default (state: State = initialState, action: Object) => {
  switch (action.type) {
    case START_POMODORO:
      return state.set('nextState', 'stop').set('currentState', 'started');

    case STOP_POMODORO:
      return state.set('nextState', 'start').set('currentState', 'stopped');

    case PREPARE_POMODORO:
      return initialState.set('currentPage', action.payload);

    default:
      return state;
  }
};
