import { combineReducers } from 'redux';
import TodoReducer from './TodoReducer';
import SelectionReducer from './SelectionReducer';
import AddingReducer from './AddingReducer';
import ModifyingReducer from './ModifyingReducer';

export default combineReducers({
  todos: TodoReducer,
  selectedTodoId: SelectionReducer,
  addingTodo: AddingReducer,
  modifyingTodoId: ModifyingReducer
});
