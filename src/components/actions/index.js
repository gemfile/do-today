import firebase from 'firebase';

firebase.initializeApp({
  apiKey: 'AIzaSyDYYTBUGXBWuPWTecNCB7mdh_V4qJm_3f4',
  authDomain: 'todo-today-45864.firebaseapp.com',
  databaseURL: 'https://todo-today-45864.firebaseio.com',
  storageBucket: 'todo-today-45864.appspot.com',
});
const ref = firebase.database().ref();

export const fetchTodos = () => (
  dispatch => {
    ref.on('value', snapshot => {
      const items = [];
      snapshot.forEach(child => {
        items.push({
          title: child.val().title,
          count: child.val().count,
          id: child.key,
          index: items.length
        });
      });

      dispatch({
        type: 'fetch_todos',
        payload: items
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

export const modifyTodo = todoId => ({
  type: 'modify_todo',
  payload: todoId
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
