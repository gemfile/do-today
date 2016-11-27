import { Map } from 'immutable';
import { TYPING, FOCUS } from '../actions/ActionType';
import type { TypingState, Action } from '../FlowType';

const initialState = Map({
  text: '',
  isFocused: false
});

export default (state: TypingState = initialState, action: Action<string|boolean>) => {
  switch (action.type) {
    case TYPING:
      return state.set('text', action.payload);

    case FOCUS:
      return state.set('isFocused', action.payload);

    default:
      return state;
  }
};
