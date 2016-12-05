import {
  PREPARE_POMODORO,
  CLEAR_POMODORO,
  FETCH_POMODORO
} from 'actions/ActionType';
import { Map } from 'immutable';
import LocalStorage from 'utils/LocalStorage';

const localStorage = new LocalStorage();

type State = Map<string, any>;

const initialState = Map({
  count: 0,
  currentPage: 0,
  currentState: '',
  nextState: 'start',
  startTime: -1,
  endTime: -1,
  minutesForPomodoro: 1
});

export default (state: State = initialState, action: Object) => {
  switch (action.type) {
    case FETCH_POMODORO: {
      const keyOfStorage = action.payload.rootRefKey;
      const pomodoro = action.payload.value.pomodoro;
      if (pomodoro) {
        localStorage.setItem(`${keyOfStorage}/pomodoro`, pomodoro);

        const { nextState, currentState, startTime, currentPage, count } = pomodoro;
        return state
          .set('nextState', nextState)
          .set('currentState', currentState)
          .set('startTime', startTime)
          .set('currentPage', currentPage)
          .set('count', count);
      }
      return state;
    }

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
