import { combineReducers } from 'redux';
import TodosStateReducer from './TodosStateReducer';
import NavigationStateReducer from './NavigationStateReducer';
import NavigatingPositionReducer from './NavigatingPositionReducer';
import TypingStateReducer from './TypingStateReducer';
import ModalVisibleReducer from './ModalVisibleReducer';
import CurrentPageReducer from './CurrentPageReducer';
import SettingsReducer from './SettingsReducer';

export default combineReducers({
  todosState: TodosStateReducer,
  typingState: TypingStateReducer,
  navigationState: NavigationStateReducer,
  navigatingPosition: NavigatingPositionReducer,
  currentPage: CurrentPageReducer,
  modalVisible: ModalVisibleReducer,
  settings: SettingsReducer,
});
