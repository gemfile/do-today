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
import LocalStorage from 'utils/LocalStorage';

const localStorage = new LocalStorage();

type State = Map<string, any>;

const initialState = Map({
  currentPage: 0,
  currentState: '',
  nextState: 'start',
  startTime: -1,
  endTime: -1,
  minutesAtATime: 1
});

const updateState = (state, payload) => {
  const { nextState, currentState } = payload;
  return state
    .set('nextState', nextState)
    .set('currentState', currentState);
}

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
      return updateState(state, action.payload);

    case START_POMODORO:
      return updateState(state, action.payload);

    case COMPLETE_POMODORO:
      return updateState(state, action.payload);

    case GET_POMODORO:
      return updateState(state, action.payload);

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
