import { combineReducers } from 'redux';
import TodosReducer from './TodosReducer';
import NavigationStateReducer from './NavigationStateReducer';
import NavigatingPositionReducer from './NavigatingPositionReducer';
import PomodoroStateReducer from './PomodoroStateReducer';
import TypingStateReducer from './TypingStateReducer';
import ModalVisibleReducer from './ModalVisibleReducer';

export default combineReducers({
  todos: TodosReducer,
  typingState: TypingStateReducer,
  navigationState: NavigationStateReducer,
  navigatingPosition: NavigatingPositionReducer,
  pomodoroState: PomodoroStateReducer,
  modalVisible: ModalVisibleReducer,
});
