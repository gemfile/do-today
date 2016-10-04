export const selectTodo = (todoId) => ({
  type: 'select_todo',
  payload: todoId
});

export const deselectTodo = () => ({
  type: 'deselect_todo',
});

export const modifyTodo = (todoId) => ({
  type: 'modify_todo',
  payload: todoId
});

export const addTodo = (title) => ({
  type: 'add_todo',
  title,
  count: 0
});
