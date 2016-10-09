import { combineReducers } from 'redux';
import TodosReducer from './TodosReducer';
import SelectionReducer from './SelectionReducer';
import ModifyingReducer from './ModifyingReducer';

export default combineReducers({
  todos: TodosReducer,
  selectedTodoId: SelectionReducer,
  modifyingTodoId: ModifyingReducer,
});
