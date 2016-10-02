export default (state = {}, action) => {
  console.log(`Adding Todo: ${action.type}, ${action.title}`);

  switch (action.type) {
    case 'add_todo':
      return { title: action.title, count: action.count };
    default:
      return state;
  }
};
