export default (state = {}, action) => {
  switch (action.type) {
    case 'fetch_todos':
      return action.payload;
    default:
      return state;
  }
};
