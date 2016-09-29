import { combineReducers } from 'redux';
import TodoReducer from './TodoReducer';
import SelectionReducer from './SelectionReducer';

export default combineReducers({
  todos: TodoReducer,
  selectedTodoId: SelectionReducer
});
