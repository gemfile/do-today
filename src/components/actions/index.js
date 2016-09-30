export const selectTodo = (todoId) => ({
  type: 'select_todo',
  payload: todoId
});

export const deselectTodo = () => ({
  type: 'deselect_todo',
});

export const addTodo = (title) => ({
  type: 'add_todo',
  title
});
