export default (state = null, action) => {
  switch (action.type) {
    case 'select_todo':
      return action.payload;
    case 'deselect_todo':
      return null;
    default:
      return state;
  }
};
