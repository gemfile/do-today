export default (state = {}, action) => {
  switch (action.type) {
    case 'fetch_todos':
      const datas = action.payload;
      const todos = [];
      for (const key in datas) {
        const data = datas[key];
        todos.push({
          title: data.title,
          count: data.count,
          id: key,
          index: todos.length
        });
      }

      return todos;
    default:
      return state;
  }
};
