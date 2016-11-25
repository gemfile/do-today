/* @flow */

import LocalStorage from '../utils/LocalStorage';
import { PREPARE_POMODORO, FETCH_CURRENT_PAGE } from '../actions/ActionType';

export default (state: number = 0, action: Object) => {
  switch (action.type) {
    case FETCH_CURRENT_PAGE: {
      const keyOfStorage = action.payload.rootRefKey;
      const currentPage = action.payload.value.currentPage;
      if (currentPage) {
        LocalStorage.setItem(`${keyOfStorage}/currentPage`, currentPage);
        return currentPage;
      }
      return state;
    }

    case PREPARE_POMODORO:
      return action.payload;

    default:
      return state;
  }
}
