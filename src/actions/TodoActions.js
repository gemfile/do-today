/* @flow */
import Firestack from 'react-native-firestack';
import DeviceInfo from 'react-native-device-info';
import PushNotification from 'react-native-push-notification';
// import LocalStorage from '../utils/LocalStorage';
import { Color } from '../components/common';
import {
  LOAD_TODOS,
  FETCH_TODOS,
  LOAD_CURRENT_PAGE,
  FETCH_CURRENT_PAGE,
  TYPING,
  FOCUS,
  START_POMODORO,
  STOP_POMODORO,
  PREPARE_POMODORO,
  CLEAR_POMODORO,
  COMPLETE_POMODORO,
  GET_POMODORO,
  TICK_POMODORO,
  SET_VIAIBLE_OF_CONFIRM_ADDING
} from './ActionType';

// const localStorage = new LocalStorage();
const firestack = new Firestack({
  debug: true,
});

// firestack.database.setPersistence(true);
const TODOS = 'todos';

const uid = DeviceInfo.getUniqueID();
const rootRefKey = `/users/${uid}`;
const rootRef = firestack.database.ref(rootRefKey);

type Dispatch = (action: Object) => void;
export const fetchTodos = () => (
  (dispatch: Dispatch) => {
    // localStorage.getItem(`${rootRefKey}/${TODOS}`, (data) => {
    //   dispatchFetchingOfTodos(dispatch, {[TODOS]: data}, true);
    // })
    // .then(
      // () => {
        rootRef.child(`${TODOS}`).on('value', snapshot => {
          dispatchFetchingOfTodos(dispatch, {[TODOS]: snapshot.val()}, false);
        });
      // }
    // );
  }
);

const dispatchFetchingOfTodos = (dispatch: Dispatch, value: Object, isLocal: boolean) => {
  dispatch({ type: LOAD_TODOS, payload: isLocal });

  if (value !== null) {
    dispatch({ type: FETCH_TODOS, payload: {rootRefKey, value} });
  }
};

export const fetchCurrentPage = () => (
  (dispatch: Dispatch) => {
    // localStorage.getItem(`${rootRefKey}/currentPage`, (data) => {
    //   dispatchFetchingOfPomodoro(dispatch, {currentPage: data}, true);
    // })
    // .then( () => {
      rootRef.child('currentPage').on('value', snapshot => {
        dispatchFetchingOfPomodoro(dispatch, {currentPage: snapshot.val()}, false);
      });
    // });
  }
);

const dispatchFetchingOfPomodoro = (dispatch: Dispatch, value: Object, isLocal: boolean) => {
  dispatch({ type: LOAD_CURRENT_PAGE, payload: isLocal });

  if (value !== null) {
    dispatch({ type: FETCH_CURRENT_PAGE, payload: {rootRefKey, value} });
  }
};

export const addTodo = (title: string) => () => {
  rootRef.child(`${TODOS}`).push({
    title,
    pomodoro: {
      currentState: '',
      nextState: 'start',
      count: 0,
    }
  });
};

export const deleteTodo = (todo: Object) => () => {
  let updates = {};
  const { id, title, pomodoro } = todo;
  updates[`/${TODOS}/${id}`] = null;
  updates[`/deletes/${id}`] = { title, pomodoro };
  rootRef.update(updates);
}

export const archiveTodos = (todos: Array<Object>) => () => {
  let updates = {};
  todos.forEach(todo => {
    const { id, title, pomodoro } = todo;
    updates[`/${TODOS}/${id}`] = null;
    updates[`/archives/${id}`] = { title, pomodoro };
  });
  rootRef.update(updates);
};

export const deleteTodos = (todos: Array<Object>) => () => {
  let updates = {};
  todos.forEach(todo => {
    const { id, title, pomodoro } = todo;
    updates[`/${TODOS}/${id}`] = null;
    updates[`/deletes/${id}`] = { title, pomodoro };
  });
  rootRef.update(updates);
};

export const typing = (text: string) => ({
  type: TYPING,
  payload: text
});

export const focus = (isFocused: boolean) => ({
  type: FOCUS,
  payload: isFocused
});

export const startPomodoro = (todo: Object, minutesAtATime: number) => {
  const endTime = new Date(Date.now() + (minutesAtATime * 60 * 1000));
  makeSchedule( todo.index.toString(), 'Your pomodoro has finished!', 'Take a Break', endTime );
  const payload = {
    nextState: 'stop',
    currentState: 'started'
  };
  updatePomodoro( todo, payload, new Date().getTime(), endTime.getTime() );

  return { type: START_POMODORO, payload };
}

export const stopPomodoro = (todo: Object) => {
  PushNotification.cancelAllLocalNotifications();

  const payload = {
    nextState: 'start',
    currentState: 'stopped'
  };
  updatePomodoro(todo, payload);

  return { type: STOP_POMODORO, payload };
};

export const clearPomodoro = () => ({
  type: CLEAR_POMODORO,
});

export const tickPomodoro = (todo: Object, secondsLeft: number) => {
  return { type: TICK_POMODORO, payload: secondsLeft };
};

export const completePomodoro = (todo: Object) => {
  const payload = {
    nextState: 'get',
    currentState: 'completed'
  };
  updatePomodoro(todo, payload);

  return { type: COMPLETE_POMODORO, payload };
};

export const getPomodoro = (todo: Object) => {
  PushNotification.cancelAllLocalNotifications();

  const payload = {
    nextState: 'start',
    currentState: 'get',
  };
  updatePomodoro(todo, payload, -1, -1, 1);

  return { type: GET_POMODORO, payload };
};

const updatePomodoro = (todo, payload, nextStartTime = -1, nextEndTime = -1, countOffset = 0) => {
  const { id, pomodoro } = todo;
  const { count } = pomodoro;

  const nextPomodoro = {
    startTime: nextStartTime,
    endTime: nextEndTime,
    count: count + countOffset,
    ...payload
  };

  let updates = {};
  updates[`/${TODOS}/${id}/pomodoro`] = nextPomodoro;
  rootRef.update(updates);
};

export const preparePomodoro = (currentPage: number) => {
  let updates = {};
  updates['/currentPage'] = currentPage;
  rootRef.update(updates);

  return { type: PREPARE_POMODORO, payload: currentPage };
};

export const setVislbleOfConfirmAdding = (visible: boolean) => ({
  type: SET_VIAIBLE_OF_CONFIRM_ADDING,
  payload: visible
});

const makeSchedule = (id:string = '0', title: string = '', message: string = '', date: Date = new Date()) => {
  PushNotification.localNotificationSchedule({
    date: date, // in 60 secs
    id, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
    largeIcon: "ic_launcher", // (optional) default: "ic_launcher"
    smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher"
    color: Color.Red, // (optional) default: system default
    vibrate: true,
    vibration: 395, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
    tag: 'some_tag', // (optional) add tag to message
    group: "group", // (optional) add group to message
    title, // (optional, for iOS this is only used in apple watch, the title will be the app name on other iOS devices)
    message, // (required)
    playSound: true, // (optional) default: true
    soundName: 'pomodoro_ring.mp3', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
    // number: '10', // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
    actions: '["Get"]',  // (Android only) See the doc for notification actions to know more
  });
};
