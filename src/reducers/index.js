import { combineReducers } from 'redux';
import TodosReducer from './TodosReducer';
import SelectionReducer from './SelectionReducer';
import ModifyingReducer from './ModifyingReducer';
import NavigationStateReducer from './NavigationStateReducer';
import NavigatingPositionReducer from './NavigatingPositionReducer';

export default combineReducers({
  todos: TodosReducer,
  selectedTodoId: SelectionReducer,
  modifyingTodos: ModifyingReducer,
  navigationState: NavigationStateReducer,
  navigatingPosition: NavigatingPositionReducer
});
