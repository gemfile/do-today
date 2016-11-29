/* @flow */
import { Map } from 'immutable';

/* reducers */
export type TodosState = Map<string, any>;
export type TypingState = Map<string, any>;
export type NavigationState = {
  index: number,
  routes: Array<{key: string, title?: string}>
};
export type NavigatingPositionState = number;
export type ModalVisibleState = {
  confirmAdding: boolean
};
export type CurrentPageState = number;
export type ReducersState = {
  todosState: TodosState,
  typingState: TypingState,
  navigationState: NavigationState,
  navigatingPosition: NavigatingPositionState,
  currentPage: CurrentPageState,
  modalVisible: ModalVisibleState,
};

/* actions */
export type Action<T> = {
  type: string,
  payload: T,
};