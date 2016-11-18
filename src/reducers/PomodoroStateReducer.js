/* @flow */

import {
  START_POMODORO,
  STOP_POMODORO,
  PREPARE_POMODORO,
  CLEAR_POMODORO,
  COMPLETE_POMODORO,
  GET_POMODORO,
  FETCH_POMODORO
} from '../actions/ActionType';
import { Map } from 'immutable';
import LocalStorage from '../util/LocalStorage';

const localStorage = new LocalStorage();

type State = Map<string, any>;

const initialState = Map({
  currentPage: 0,
  currentState: '',
  nextState: 'start',
  startTime: -1,
  minutesAtATime: 1
});

export default (state: State = initialState, action: Object) => {
  switch (action.type) {
    case FETCH_POMODORO: {
      const keyOfStorage = action.payload.rootRefKey;
      const pomodoro = action.payload.value.pomodoro;
      if (pomodoro) {
        localStorage.setItem(`${keyOfStorage}/pomodoro`, pomodoro);

        const { nextState, currentState, startTime, currentPage } = pomodoro;
        return state
          .set('nextState', nextState)
          .set('currentState', currentState)
          .set('startTime', startTime)
          .set('currentPage', currentPage);
      }
      return state;
    }

    case STOP_POMODORO:
    case START_POMODORO:
    case COMPLETE_POMODORO:
    case GET_POMODORO:
      const { nextState, currentState } = action.payload;
      return state
        .set('nextState', nextState)
        .set('currentState', currentState);

    case CLEAR_POMODORO:
      return initialState
        .set('nextState', initialState.get('nextState'))
        .set('currentState', initialState.get('currentState'));

    case PREPARE_POMODORO:
      return initialState.set('currentPage', action.payload);

    default:
      return state;
  }
};
