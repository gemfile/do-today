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
} from './Type';

const localStorage = new LocalStorage();
const firestack = new Firestack({
  debug: true,
});
firestack.database.setPersistence(true);

const instanceID = DeviceInfo.getUniqueID();
const key = `todos/${instanceID}`;
const ref = firestack.database.ref(key);

type Dispatch = (action: Object) => void;
export const fetchTodos = () => {
  return (dispatch: Dispatch) => {
    localStorage.getItem(key, (data) => {
      dispatchFetchTodo(dispatch, data, true);
    }).then( () => {
      ref.on('value', snapshot => {
        dispatchFetchTodo(dispatch, snapshot.val(), false)
      });
    });
  }
};

const dispatchFetchTodo = (dispatch: Dispatch, value: Object, isLocal: boolean) => {
  dispatch({ type: LOADING_TODOS, payload: isLocal });

  if (value !== null) {
    dispatch({ type: FETCH_TODOS, payload: {key, value} });
  }
};

export const addTodo = (title: string) => (
  () => ref.push({ title, count: 0 })
);

export const selectTodo = (todoId: string) => ({
  type: SELECT_TODO,
  payload: todoId
});

export const deselectTodo = () => ({
  type: DESELECT_TODO,
});

export const modifyTodo = (todoId: string, checked: boolean) => ({
  type: MODIFY_TODO,
  payload: {todoId, checked}
});
