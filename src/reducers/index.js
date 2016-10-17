import { combineReducers } from 'redux';
import TodosReducer from './TodosReducer';
import SelectionReducer from './SelectionReducer';
import ModifyingReducer from './ModifyingReducer';
import NavigatingReducer from './NavigatingReducer';
import NavigatingPositionReducer from './NavigatingPositionReducer';

export default combineReducers({
  todos: TodosReducer,
  selectedTodoId: SelectionReducer,
  modifyingTodos: ModifyingReducer,
  navigating: NavigatingReducer,
  navigatingPosition: NavigatingPositionReducer
});
