/* @flow */

import Firestack from 'react-native-firestack';
import DeviceInfo from 'react-native-device-info';
import LocalStorage from '../utils/LocalStorage';
import {
  LOADING_TODOS,
  FETCH_TODOS,
  SELECT_TODO,
  DESELECT_TODO,
  MODIFY_TODO,
  CLEAR_MODIFYING,
  TYPING,
  FOCUS,
  NOTIFY_EXPANDING_POSITION
} from './ActionType';

const localStorage = new LocalStorage();
const firestack = new Firestack({
  debug: true,
});
firestack.database.setPersistence(true);

const uid = DeviceInfo.getUniqueID();
const rootRefKey = `/users/${uid}`;
const rootRef = firestack.database.ref(rootRefKey);

type Dispatch = (action: Object) => void;
export const fetchTodos = () => (
  (dispatch: Dispatch) => {
    localStorage.getItem(rootRefKey, (data) => {
      dispatchFetchingOfTodos(dispatch, data, true);
    })
    .then( () => {
      rootRef.on('value', snapshot => {
        dispatchFetchingOfTodos(dispatch, snapshot.val(), false)
      });
    });
  }
);

const dispatchFetchingOfTodos = (dispatch: Dispatch, value: Object, isLocal: boolean) => {
  dispatch({ type: LOADING_TODOS, payload: isLocal });

  if (value !== null) {
    dispatch({ type: FETCH_TODOS, payload: {rootRefKey, value} });
  }
};

export const addTodo = (title: string) => (
  () => rootRef.child('todos').push({ title, count: 0 })
);

export const selectTodo = (todoId: string) => ({
  type: SELECT_TODO,
  payload: todoId
});

export const deselectTodo = () => ({
  type: DESELECT_TODO,
});

export const modifyTodo = (todo: Object, checked: boolean) => ({
  type: MODIFY_TODO,
  payload: {todo, checked}
});

export const clearModifying = () => ({
  type: CLEAR_MODIFYING
});

export const archiveTodos = (todos: Array<Object>) => (
  () => {
    let updates = {};
    todos.forEach(todo => {
      updates[`/todos/${todo.id}`] = null;
      updates[`/archives/${todo.id}`] = { title: todo.title, count: todo.count };
    });
    rootRef.update(updates);
  }
);

export const deleteTodos = (todos: Array<Object>) => (
  () => {
    let updates = {};
    todos.forEach(todo => {
      updates[`/todos/${todo.id}`] = null;
      updates[`/deletes/${todo.id}`] = { title: todo.title, count: todo.count };
    });
    rootRef.update(updates);
  }
);

export const typing = (text: string) => ({
  type: TYPING,
  payload: text
});

export const focus = (isFocused: boolean) => ({
  type: FOCUS,
  payload: isFocused
});

export const notifyExpandingPosition = (position: number) => ({
  type: NOTIFY_EXPANDING_POSITION,
  payload: position
});
