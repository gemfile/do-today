/* @flow */

import { MODIFY_TODO } from '../actions/Type';
import { List } from 'immutable';

const initialState = List.of();

export default (state: List<string> = initialState, action: Object) => {
  switch (action.type) {
    case MODIFY_TODO: {
      const { todoId, checked } = action.payload;
      if (checked) {
        return state.push(todoId);
      } else {
        return state.delete(state.indexOf(todoId));
      }
    }

    default:
      return state;
  }
};
