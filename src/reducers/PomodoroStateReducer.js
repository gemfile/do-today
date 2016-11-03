/* @flow */

import { START_POMODORO, STOP_POMODORO } from '../actions/ActionType';
import { Map } from 'immutable';

type State = Map<string, any>;

const initialState = Map({
  nextState: 'start',
});

export default (state: State = initialState, action: Object) => {
  switch (action.type) {
    case START_POMODORO:
      return state.set('nextState', 'stop');

    case STOP_POMODORO:
      return state.set('nextState', 'start');

    default:
      return state;
  }
};
