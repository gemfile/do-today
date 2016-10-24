/* @flow */
import { FETCH_TODOS } from '../actions/Type';

export default (state: Array<Object> = [], action: Object) => {
  switch (action.type) {
    case FETCH_TODOS: {
      const datas = action.payload;
      const todos = [];
      for (const key of Object.keys(datas)) {
        const data = datas[key];
        todos.push({
          title: data.title,
          count: data.count,
          id: key,
          index: todos.length
        });
      }

      return todos;
    }

    default:
      return state;
  }
};
