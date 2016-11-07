import { Map } from 'immutable';
import { TYPING, FOCUS } from '../actions/ActionType';

type State = Map<string, any>;
const initialState = Map({
  text: '',
  isFocused: false
});

export default (state: State = initialState, action: Object) => {
  switch (action.type) {
    case TYPING:
      return state.set('text', action.payload);

    case FOCUS:
      return state.set('isFocused', action.payload);

    default:
      return state;
  }
};
