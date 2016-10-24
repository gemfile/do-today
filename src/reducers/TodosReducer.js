/* @flow */
import { Map } from 'immutable';

import { FETCH_TODOS, LOADING_TODO } from '../actions/Type';
import LocalStorage from '../utils/LocalStorage';

const localStorage = new LocalStorage();

type State = Map<string, any>;
const initialState = Map({
  todos: [],
  isLoading: false
});

export default (state: State = initialState, action: Object) => {
  switch (action.type) {
    case FETCH_TODOS: {
      const keyOfStorage = action.payload.key;
      const datas = action.payload.value;
      const todos = [];
      for (const key of Object.keys(datas)) {
        const data = datas[key];
        todos.push({
          title: data.title,
          count: data.count,
          id: key,
          index: todos.length
        });
      }

      localStorage.setItem(keyOfStorage, todos);

      return state.set('todos', todos);
    }

    case LOADING_TODO:
      return state.set('isLoading', action.payload);

    default:
      return state;
  }
};
