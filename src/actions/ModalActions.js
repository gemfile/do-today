/* @flow */

import {
  TYPING,
  FOCUS,
  SET_VIAIBLE_OF_CONFIRM_ADDING
} from './ActionType';

export const typing = (text: string) => ({
  type: TYPING,
  payload: text
});

export const focus = (isFocused: boolean) => ({
  type: FOCUS,
  payload: isFocused
});

export const setVislbleOfConfirmAdding = (visible: boolean) => ({
  type: SET_VIAIBLE_OF_CONFIRM_ADDING,
  payload: visible
});
