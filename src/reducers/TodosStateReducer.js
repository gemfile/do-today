/* @flow */
import { Map } from 'immutable';
import {
  FETCH_TODOS,
  LOADING_TODO,
  PREPARE_POMODORO
} from '../actions/ActionType';
import LocalStorage from '../util/LocalStorage';

const localStorage = new LocalStorage();
const TODOS = 'todos';

type State = Map<string, any>;
const initialState = Map({
  todos: [],
  isLoading: false,
  currentPage: 0,
  currentTodo: null
});

const updateCurrentTodo = (state) => {
  const todos = state.get('todos');
  const currentPage = state.get('currentPage')

  if (todos.length !== 0 && currentPage !== -1) {
    return state.set(
      'currentTodo',
      todos.find(todo => todo.index === currentPage)
    );
  }

  return state;
};

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
            index: todos.length,
            pomodoro: data.pomodoro
          });
        }
      }

      localStorage.setItem(`${keyOfStorage}/${TODOS}`, todos);
      const nextState = state.set('todos', todos);
      return updateCurrentTodo(nextState);
    }

    case LOADING_TODO:
      return state.set('isLoading', action.payload);

    case PREPARE_POMODORO: {
      const nextState = state.set('currentPage', action.payload);
      return updateCurrentTodo(nextState);
    }

    default:
      return state;
  }
};
