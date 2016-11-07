/* @flow */

import { SET_VIAIBLE_OF_CONFIRM_ADDING } from '../actions/ActionType';

type State = {
  confirmAdding: boolean
}

const initialState = {
  confirmAdding: false
};

export default (state: State = initialState, action: Object) => {
  switch (action.type) {
    case SET_VIAIBLE_OF_CONFIRM_ADDING:
      return { ...initialState, confirmAdding: action.payload };

    default:
      return state;
  }
}
