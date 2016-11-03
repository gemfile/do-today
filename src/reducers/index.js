import { combineReducers } from 'redux';
import TodosReducer from './TodosReducer';
import NavigationStateReducer from './NavigationStateReducer';
import NavigatingPositionReducer from './NavigatingPositionReducer';
import PomodoroStateReducer from './PomodoroStateReducer';

export default combineReducers({
  todos: TodosReducer,
  navigationState: NavigationStateReducer,
  navigatingPosition: NavigatingPositionReducer,
  pomodoroState: PomodoroStateReducer
});
