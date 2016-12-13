/* @flow */

import { SET_VIAIBLE_OF_ADDING, SET_VIAIBLE_OF_EDITING, SET_VIAIBLE_OFF } from '../actions/ActionType';
import type { ModalVisibleState, Action } from '../FlowType';

const initialState = {
  adding: false,
  editing: false,
  todo: null
};

export default (state: ModalVisibleState = initialState, action: Action<Object>) => {
  switch (action.type) {
    case SET_VIAIBLE_OF_ADDING:
      return { ...initialState, adding: action.payload };

    case SET_VIAIBLE_OF_EDITING:
      return { ...initialState, editing: action.payload.visible, todo: action.payload.todo };

    case SET_VIAIBLE_OFF:
      return { ...initialState };

    default:
      return state;
  }
}
