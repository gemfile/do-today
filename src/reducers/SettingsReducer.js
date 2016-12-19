/* @flow */

import data from './LibraryList.json';
import type { SettingsState, Action } from '../FlowType';
import { SELECT_SETTING } from '../actions/ActionType';

const initialState = {
  data,
  selectedId: null
};

export default (state: SettingsState = initialState, action: Action<Object>) => {
  switch (action.type) {
    case SELECT_SETTING:
      return { ...state, selectedId: action.payload };

    default:
      return state;
  }
}
