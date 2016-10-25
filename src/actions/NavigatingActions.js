/* @flow */

import {
  NAVIGATE_BACK,
  NAVIGATE_FORWARD,
  NAVIGATE_JUMP,
  NOTIFY_NAVIGATING_POSITION
} from './ActionType';

export const navigateBack = () => ({
  type: NAVIGATE_BACK,
});

export const navigateForward = () => ({
  type: NAVIGATE_FORWARD,
});

export const navigateJump = (key: string) => ({
  type: NAVIGATE_JUMP,
  payload: key
});

export const notifyNavigatingPosition = (position: number) => ({
  type: NOTIFY_NAVIGATING_POSITION,
  payload: position
});
