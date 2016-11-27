/* @flow */

import { SET_VIAIBLE_OF_CONFIRM_ADDING } from '../actions/ActionType';
import type { ModalVisibleState, Action } from '../FlowType';

const initialState = {
  confirmAdding: false
};

export default (state: ModalVisibleState = initialState, action: Action<boolean>) => {
  switch (action.type) {
    case SET_VIAIBLE_OF_CONFIRM_ADDING:
      return { ...initialState, confirmAdding: action.payload };

    default:
      return state;
  }
}
