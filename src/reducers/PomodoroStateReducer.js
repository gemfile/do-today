/* @flow */

import {
  START_POMODORO,
  STOP_POMODORO,
  PREPARE_POMODORO,
  CLEAR_POMODORO,
  COMPLETE_POMODORO,
  GET_POMODORO
} from '../actions/ActionType';
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

    case COMPLETE_POMODORO:
      return state.set('nextState', 'get').set('currentState', 'completed');

    case GET_POMODORO:
     return state.set('nextState', 'start').set('currentState', 'got');

    case CLEAR_POMODORO:
      return initialState.set(
        'nextState', initialState.get('nextState')
      ).set(
        'currentState', initialState.get('currentState')
      );

    case PREPARE_POMODORO:
      return initialState.set('currentPage', action.payload);

    default:
      return state;
  }
};
