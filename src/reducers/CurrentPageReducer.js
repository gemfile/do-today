/* @flow */

import LocalStorage from '../utils/LocalStorage';
import { PREPARE_POMODORO, FETCH_CURRENT_PAGE } from '../actions/ActionType';
import type { CurrentPageState, Action } from '../FlowType';
type CurrentPageAction = Action<{
  rootRefKey: string,
  value: {currentPage: number}
}>;

export default (state: CurrentPageState = 0, action: CurrentPageAction) => {
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
