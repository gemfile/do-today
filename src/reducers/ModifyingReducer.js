export default (state = null, action) => {
  switch (action.type) {
    case 'modify_todo':
      return action.payload;
    default:
      return state;
  }
};
