export default (state = null, action) => {
  console.log(`Adding Todo: ${action.type}, ${action.title}`);

  switch (action.type) {
    case 'add_todo':
      return action.title;
    default:
      return state;
  }
};
