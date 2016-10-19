/* @flow */

import { MODIFY_TODO } from '../actions/Type';
import { List } from 'immutable';

const initialState = List.of();

export default (state: List<string> = initialState, action: Object) => {
  switch (action.type) {
    case MODIFY_TODO: {
      const { todoId, checked } = action.payload;
      let nextState;
      if (checked) {
        nextState = state.push(todoId);
      } else {
        nextState = state.delete(state.indexOf(todoId));
      }
      return nextState;
    }

    default:
      return state;
  }
};
