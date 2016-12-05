/* @flow */
import ActivityAndroid from 'react-native-activity-android';
import PushNotification from 'react-native-push-notification';
import { Map } from 'immutable';
import LocalStorage from '../utils/LocalStorage';
import { Color } from '../components/common';
import {
  FETCH_TODOS,
  LOAD_TODOS,
  PREPARE_POMODORO,
  // FETCH_CURRENT_PAGE
} from '../actions/ActionType';
import type { TodosState, Action } from '../FlowType';
type Todo = { title: string, id: string, pomodoro: Object };
type TodoStateAction = Action<{
  rootRefKey: string,
  value: {todos: {todoId: Todo}} & {currentPage: number}
}>;

const TODOS = 'todos';

const notifyTick = (id:string = '0', title: string = '', message: string = '') => {
  PushNotification.localNotification({
    id, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
    ticker: "My Notification Ticker", // (optional)
    autoCancel: true, // (optional) default: true
    largeIcon: "ic_launcher", // (optional) default: "ic_launcher"
    smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher"
    // bigText: "My big text that will be shown when notification is expanded", // (optional) default: "message" prop
    // subText: "This is a subText", // (optional) default: none
    color: Color.Red, // (optional) default: system default
    vibrate: false, // (optional) default: true
    vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
    tag: 'some_tag', // (optional) add tag to message
    group: "group", // (optional) add group to message
    ongoing: true, // (optional) set whether this is an "ongoing" notification
    title, // (optional, for iOS this is only used in apple watch, the title will be the app name on other iOS devices)
    message, // (required)
    playSound: false, // (optional) default: true
    // soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
    // number: '10', // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
    // actions: '["Abandone"]',  // (Android only) See the doc for notification actions to know more
  });
};

let isBackground = false;
const onActivityPause = () => {
  if (!isBackground) {
    isBackground = true;

    if (currentTodo && currentTodo.pomodoro.currentState === "started") {
      notifyTick('0', 'Your pomodoro is running!', 'Stay Focused');
    }
  }
}

const onActivityResume = () => {
  if (isBackground) {
    isBackground = false;
  }
}

let currentTodo;
const updateCurrentTodo = (state) => {
  const todos = state.get('todos');
  const currentPage = state.get('currentPage');

  if (todos.length !== 0 && currentPage !== -1) {
    currentTodo = todos.find(todo => todo.index === currentPage);
    return state.set('currentTodo', currentTodo);
  }

  return state;
};

const initialState = Map({
  todos: [],
  isLoading: false,
  currentPage: 0,
  currentTodo: null,
  minutesForPomodoro: .5,
  minutesForBreak: .5,
});

export default (state: TodosState = initialState, action: TodoStateAction) => {
  switch (action.type) {
    case FETCH_TODOS: {
      const keyOfStorage = action.payload.rootRefKey;
      const datas = action.payload.value[TODOS];
      const todos = [];
      if (datas) {
        const orderedDatas = Object.keys(datas).sort().reverse();
        for (const itemKey of orderedDatas) {
          const data = datas[itemKey];
          todos.push({
            title: data.title,
            id: (data.id) ? data.id : itemKey,
            index: todos.length,
            pomodoro: { ...data.pomodoro }
          });
        }
      }

      LocalStorage.setItem(`${keyOfStorage}/${TODOS}`, todos);
      return updateCurrentTodo( state.set('todos', todos) );
    }

    case LOAD_TODOS:
      return state.set('isLoading', action.payload);

    case PREPARE_POMODORO:
      return updateCurrentTodo( state.set('currentPage', action.payload) );

    // case FETCH_CURRENT_PAGE:
    //   return updateCurrentTodo( state.set('currentPage', action.payload.value.currentPage) );

    default:
      return state;
  }
};

ActivityAndroid.addEventListener('activityPause', onActivityPause);
ActivityAndroid.addEventListener('activityResume', onActivityResume);
