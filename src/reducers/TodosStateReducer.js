/* @flow */
import ActivityAndroid from 'react-native-activity-android';
import PushNotification from 'react-native-push-notification';
import { AppRegistry } from 'react-native';
import { Map } from 'immutable';
import {
  FETCH_TODOS,
  LOADING_TODO,
  PREPARE_POMODORO
} from '../actions/ActionType';
import LocalStorage from 'utils/LocalStorage';
import { secondsToMinutes } from 'utils/TimeFormat';
import TaskTickingModule from 'natives/TaskTickingModule';
import { Color } from '../components/common';
import SoundPlayer from 'utils/SoundPlayer';

const localStorage = new LocalStorage();
const TODOS = 'todos';

type State = Map<string, any>;
const initialState = Map({
  todos: [],
  isLoading: false,
  currentPage: 0,
  currentTodo: null
});

let isBackground = false;
const TaskTicking = async () => {
  let timesUp = false;

  if (currentTodo) {
    const { endTime } = currentTodo.pomodoro;
    let secondsLeft;
    while (isBackground && !timesUp) {
      secondsLeft = (endTime - new Date().getTime()) / 1000;
      notifyTick(currentTodo.index.toString(), secondsToMinutes(secondsLeft));
      await timeout(1000);

      timesUp = new Date().getTime() > endTime;
    }
  }

  function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
};

const notifyTick = (id:string = '0', message: string = '') => {
  PushNotification.localNotification({
    id: id, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
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
    ongoing: false, // (optional) set whether this is an "ongoing" notification
    title: message, // (optional, for iOS this is only used in apple watch, the title will be the app name on other iOS devices)
    message: message, // (required)
    playSound: false, // (optional) default: true
    // soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
    // number: '10', // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
    actions: '["Abandone"]',  // (Android only) See the doc for notification actions to know more
  });
};

let currentTodo;
const updateCurrentTodo = (state) => {
  const todos = state.get('todos');
  const currentPage = state.get('currentPage')

  if (todos.length !== 0 && currentPage !== -1) {
    currentTodo = todos.find(todo => todo.index === currentPage);
    return state.set('currentTodo', currentTodo);
  }

  return state;
};

const onActivityPause = () => {
  if (!isBackground) {
    isBackground = true;
    SoundPlayer.setVolume(0);

    if(currentTodo && currentTodo.pomodoro.currentState === "started") {
      TaskTickingModule.startService();
    }
  }
}

const onActivityResume = () => {
  if (isBackground) {
    isBackground = false;
    SoundPlayer.setVolume(1);

    if(currentTodo && currentTodo.pomodoro.currentState === "started") {
      TaskTickingModule.stopService();
    }
  }
}

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
      return updateCurrentTodo( state.set('todos', todos) );
    }

    case LOADING_TODO:
      return state.set('isLoading', action.payload);

    case PREPARE_POMODORO:
      return updateCurrentTodo( state.set('currentPage', action.payload) );

    default:
      return state;
  }
};

AppRegistry.registerHeadlessTask('task_ticking', () => TaskTicking);
ActivityAndroid.addEventListener('activityPause', onActivityPause);
ActivityAndroid.addEventListener('activityResume', onActivityResume);
