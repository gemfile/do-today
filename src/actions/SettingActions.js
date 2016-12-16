/* @flow */

import { SELECT_SETTING } from './ActionType';

export const selectSetting = (settingId: string) => ({
  type: SELECT_SETTING,
  payload: settingId
});
