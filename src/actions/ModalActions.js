/* @flow */

import {
  TYPING,
  FOCUS,
  SET_VIAIBLE_OF_ADDING,
  SET_VIAIBLE_OF_EDITING,
  SET_VIAIBLE_OFF
} from './ActionType';

export const typing = (text: string) => ({
  type: TYPING,
  payload: text
});

export const focus = (isFocused: boolean) => ({
  type: FOCUS,
  payload: isFocused
});

export const showModalAdding = (visible: boolean) => ({
  type: SET_VIAIBLE_OF_ADDING,
  payload: visible
});

export const showModalEditing = (visible: boolean, todo: Object) => ({
  type: SET_VIAIBLE_OF_EDITING,
  payload: { visible, todo }
});

export const hideModal = () => ({
  type: SET_VIAIBLE_OFF,
})
