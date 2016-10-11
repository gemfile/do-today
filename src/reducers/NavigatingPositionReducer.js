export default (state = 0, action) => {
  let nextState;
  switch (action.type) {
    case 'notify_navigating_position':
      nextState = action.payload;
      break;

    default:
      nextState = state;
  }

  return nextState;
};
