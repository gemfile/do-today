/* @flow */

import Firestack from 'react-native-firestack';
import DeviceInfo from 'react-native-device-info';
import {
  FETCH_TODOS,
  SELECT_TODO,
  DESELECT_TODO,
  MODIFY_TODO,
} from './Type';

const firestack = new Firestack({
  debug: true,
});
firestack.database.setPersistence(true);

const instanceID = DeviceInfo.getUniqueID();
const ref = firestack.database.ref('todos/' + instanceID);

type Dispatch = (action: Object) => void;
export const fetchTodos = () => (
  (dispatch: Dispatch) => {
    ref.on('value', snapshot => {
      dispatch({
        type: FETCH_TODOS,
        payload: snapshot.val()
      });
    });
  }
);

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
