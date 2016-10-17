import Immutable from 'immutable';

const initialState = Immutable.List.of();

export default (state = initialState, action) => {
  switch (action.type) {
    case 'modify_todo': {
      const { todoId, checked } = action.payload;
      let nextState;
      if (checked) {
        nextState = state.push(todoId);
      } else {
        nextState = state.delete(state.indexOf(todoId));
      }
      return nextState;
    }

    default:
      return state;
  }
};
