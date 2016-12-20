/* @flow */
import DeviceInfo from 'react-native-device-info';
import PushNotification from 'react-native-push-notification';
import LocalStorage from '../utils/LocalStorage';
import FirestackReader from '../utils/FirestackReader';
import { Color } from '../components/common';
import {
  LOAD_TODOS,
  FETCH_TODOS,
  LOAD_CURRENT_PAGE,
  FETCH_CURRENT_PAGE,
  START_POMODORO,
  STOP_POMODORO,
  PREPARE_POMODORO,
  CLEAR_POMODORO,
  COMPLETE_POMODORO,
  GET_POMODORO,
  TAKE_REST,
  SKIP_REST,
  FINISH_REST,
} from './ActionType';

const TODOS = 'todos';
const uid = DeviceInfo.getUniqueID();
const rootRefKey = `/users/${uid}`;
let rootRef;
FirestackReader.listenToReady( firestack => {rootRef = firestack.database.ref(rootRefKey)} );

type Dispatch = (action: Object) => void;
export const fetchTodos = () => (
  (dispatch: Dispatch) => {
    LocalStorage.getItem(`${rootRefKey}/${TODOS}`, (data) => {
      dispatchFetchingOfTodos(dispatch, {[TODOS]: data}, 'local');
    }).then(
      () => {
        rootRef.child(`${TODOS}`).on('value', snapshot => {
          dispatchFetchingOfTodos(dispatch, {[TODOS]: snapshot.val()}, 'remote');
        });
      }
    );
  }
);

const dispatchFetchingOfTodos = (dispatch: Dispatch, value: Object, stateOfLoading: string) => {
  if (value !== null) {
    dispatch({ type: FETCH_TODOS, payload: {rootRefKey, value} });
  }
  dispatch({ type: LOAD_TODOS, payload: stateOfLoading });
};

export const fetchCurrentPage = () => (
  (dispatch: Dispatch) => {
    LocalStorage.getItem(`${rootRefKey}/currentPage`, (data) => {
      dispatchFetchingOfPomodoro(dispatch, {currentPage: data}, true);
    })
    .then( () => {
      rootRef.child('currentPage').on('value', snapshot => {
        dispatchFetchingOfPomodoro(dispatch, {currentPage: snapshot.val()}, false);
      });
    });
  }
);

const dispatchFetchingOfPomodoro = (dispatch: Dispatch, value: Object, isLocal: boolean) => {
  if (value !== null) {
    dispatch({ type: FETCH_CURRENT_PAGE, payload: {rootRefKey, value} });
  }
  dispatch({ type: LOAD_CURRENT_PAGE, payload: isLocal });
};

export const addTodo = (title: string) => {
  rootRef.child(`${TODOS}`).push({
    title,
    pomodoro: {
      currentState: '',
      nextState: 'start',
      count: 0,
    }
  });
  return { type: LOAD_TODOS, payload: 'loading' };
};

export const editTodo = (title: string, todo: Object) => {
  let updates = {};
  const { id } = todo;
  updates[`/${TODOS}/${id}/title`] = title;
  rootRef.update(updates);
  return { type: LOAD_TODOS, payload: 'loading' };
};

export const archiveTodo = (todo: Object) => {
  let updates = {};
  const { id, title, pomodoro } = todo;
  updates[`/${TODOS}/${id}`] = null;
  updates[`/archives/${id}`] = { title, pomodoro };
  rootRef.update(updates);
  return { type: LOAD_TODOS, payload: 'loading' };
}

export const archiveTodos = (todos: Array<Object>) => {
  let updates = {};
  todos.forEach(todo => {
    const { id, title, pomodoro } = todo;
    updates[`/${TODOS}/${id}`] = null;
    updates[`/archives/${id}`] = { title, pomodoro };
  });
  rootRef.update(updates);
  return { type: LOAD_TODOS, payload: 'loading' };
};

export const deleteTodo = (todo: Object) => {
  let updates = {};
  const { id, title, pomodoro } = todo;
  updates[`/${TODOS}/${id}`] = null;
  updates[`/deletes/${id}`] = { title, pomodoro };
  rootRef.update(updates);
  return { type: LOAD_TODOS, payload: 'loading' };
}

export const deleteTodos = (todos: Array<Object>) => {
  let updates = {};
  todos.forEach(todo => {
    const { id, title, pomodoro } = todo;
    updates[`/${TODOS}/${id}`] = null;
    updates[`/deletes/${id}`] = { title, pomodoro };
  });
  rootRef.update(updates);
  return { type: LOAD_TODOS, payload: 'loading' };
};

export const startPomodoro = (todo: Object, minutesForPomodoro: number) => {
  const endTime = new Date(Date.now() + (minutesForPomodoro * 60 * 1000));
  makeSchedule( '0', 'Your pomodoro has finished!', 'Take a Break', endTime );
  const payload = {
    nextState: 'stop',
    currentState: 'started',
    startTime: new Date().getTime(),
    endTime: endTime.getTime(),
  };
  updatePomodoro( todo, payload );

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

export const skipRest = (todo: Object) => {
  PushNotification.cancelAllLocalNotifications();

  const payload = {
    nextState: 'start',
    currentState: 'skipped'
  };
  updatePomodoro(todo, payload);

  return { type: SKIP_REST, payload };
};

export const clearPomodoro = () => {
  PushNotification.cancelAllLocalNotifications();

  return { type: CLEAR_POMODORO };
}

export const completePomodoro = (todo: Object) => {
  const { pomodoro } = todo;
  const payload = {
    nextState: 'get',
    currentState: 'completed',
    startTime: pomodoro.startTime,
    endTime: pomodoro.endTime,
  };
  updatePomodoro(todo, payload);

  return { type: COMPLETE_POMODORO, payload };
};

export const finishRest = (todo: Object) => {
  const payload = {
    nextState: 'start',
    currentState: 'finished'
  };
  updatePomodoro(todo, payload);

  return { type: FINISH_REST, payload };
}

export const takeRest = (todo: Object, minutesForRest: number) => {
  const endTime = new Date(Date.now() + (minutesForRest * 60 * 1000));
  makeSchedule( '0', "The break is over.", 'Time to Work', endTime );
  const payload = {
    nextState: 'skip',
    currentState: 'taken',
    startTime: new Date().getTime(),
    endTime: endTime.getTime(),
  }
  updatePomodoro( todo, payload );

  return { type: TAKE_REST, payload };
};

export const getPomodoro = (todo: Object) => {
  const { pomodoro } = todo;
  const lengthOfDetails = pomodoro.details ? Object.keys(pomodoro.details).length : 0;
  const details = {
    ...pomodoro.details,
    [lengthOfDetails]: {startTime: pomodoro.startTime, endTime: pomodoro.endTime}
  };

  const payload = {
    nextState: 'take',
    currentState: 'got',
    details
  };
  updatePomodoro(todo, payload, 1);

  return { type: GET_POMODORO, payload };
};

const updatePomodoro = (todo, payload, countOffset = 0) => {
  const { id, pomodoro } = todo;
  const { count, details } = pomodoro;
  const nextPomodoro = {
    count: count + countOffset,
    details,
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
    // actions: '["Get"]',  // (Android only) See the doc for notification actions to know more
  });
};
