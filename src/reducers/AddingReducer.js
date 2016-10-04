export default (state = {}, action) => {
  switch (action.type) {
    case 'add_todo':
      return { title: action.title, count: action.count };
    default:
      return state;
  }
};
