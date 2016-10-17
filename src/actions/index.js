import Firestack from 'react-native-firestack';
import DeviceInfo from 'react-native-device-info';

const firestack = new Firestack({
  debug: true,
});
firestack.database.setPersistence(true);

const instanceID = DeviceInfo.getInstanceID();
const ref = firestack.database.ref('todos/' + instanceID);

export const fetchTodos = () => (
  dispatch => {
    ref.on('value', snapshot => {
      dispatch({
        type: 'fetch_todos',
        payload: snapshot.val()
      });
    });
  }
);

export const addTodo = title => (
  () => ref.push({ title, count: 0 })
);

export const selectTodo = todoId => ({
  type: 'select_todo',
  payload: todoId
});

export const deselectTodo = () => ({
  type: 'deselect_todo',
});

export const modifyTodo = (todoId, checked) => ({
  type: 'modify_todo',
  payload: {todoId, checked}
});

export const navigateBack = () => ({
  type: 'navigate_back',
});

export const navigateForward = () => ({
  type: 'navigate_forward',
});

export const navigateJump = key => ({
  type: 'navigate_jump',
  payload: key
});

export const notifyNavigatingPosition = position => ({
  type: 'notify_navigating_position',
  payload: position
});
