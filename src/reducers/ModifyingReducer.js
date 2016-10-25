/* @flow */

import { MODIFY_TODO, CLEAR_MODIFYING } from '../actions/ActionType';
import { List } from 'immutable';

const initialState = List.of();

type Todo = {
  title: string,
  count: number
};

export default (state: List<Todo> = initialState, action: Object) => {
  switch (action.type) {
    case MODIFY_TODO: {
      const { todo, checked } = action.payload;
      if (checked) {
        return state.push(todo);
      } else {
        return state.delete(state.indexOf(todo));
      }
    }

    case CLEAR_MODIFYING:
      return initialState;

    default:
      return state;
  }
};
