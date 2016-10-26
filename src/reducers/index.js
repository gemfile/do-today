import { combineReducers } from 'redux';
import TodosReducer from './TodosReducer';
import TypingStateReducer from './TypingStateReducer';
import SelectionReducer from './SelectionReducer';
import ModifyingReducer from './ModifyingReducer';
import NavigationStateReducer from './NavigationStateReducer';
import NavigatingPositionReducer from './NavigatingPositionReducer';
import ExpandingPositionReducer from './ExpandingPositionReducer';

export default combineReducers({
  todos: TodosReducer,
  typingState: TypingStateReducer,
  selectedTodoId: SelectionReducer,
  modifyingTodos: ModifyingReducer,
  navigationState: NavigationStateReducer,
  navigatingPosition: NavigatingPositionReducer,
  expandingPosition: ExpandingPositionReducer
});
