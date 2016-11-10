/* @flow */
import { Map } from 'immutable';
import { FETCH_TODOS, LOADING_TODO } from '../actions/ActionType';
import LocalStorage from '../util/LocalStorage';

const localStorage = new LocalStorage();
const TODOS = 'todos';

type State = Map<string, any>;
const initialState = Map({
  todos: [],
  isLoading: false
});

export default (state: State = initialState, action: Object) => {
  switch (action.type) {
    case FETCH_TODOS: {
      const keyOfStorage = action.payload.rootRefKey;
      const datas = action.payload.value[TODOS];
      const todos = [];
      if (datas) {
        for (const itemKey of Object.keys(datas)) {
          const data = datas[itemKey];
          todos.push({
            title: data.title,
            count: data.count,
            id: itemKey,
            index: todos.length
          });
        }
      }

      localStorage.setItem(`${keyOfStorage}/${TODOS}`, todos);
      return state.set('todos', todos);
    }

    case LOADING_TODO:
      return state.set('isLoading', action.payload);

    default:
      return state;
  }
};
