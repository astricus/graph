import menuTypes from './menu.types';
import { actionCreator } from '../utils';
import {
  selectIsDataModalOpen,
  selectIsLeftSidebarOpen,
  selectIsRightSidebarOpen,
} from './menu.selectors';

export const toggleDataModal = () => (dispatch, getState) => {
  const isDataModalOpen = selectIsDataModalOpen(getState());
  dispatch(actionCreator(menuTypes.SET_OPEN_DATA_MODAL, !isDataModalOpen));
};

export const toggleLeftSidebar = () => (dispatch, getState) => {
  const isLeftSidebarOpen = selectIsLeftSidebarOpen(getState());
  dispatch(actionCreator(menuTypes.SET_OPEN_LEFT_SIDEBAR, !isLeftSidebarOpen));
};

export const toggleRightSidebar = () => (dispatch, getState) => {
  const isRightSidebarOpen = selectIsRightSidebarOpen(getState());
  dispatch(
    actionCreator(menuTypes.SET_OPEN_RIGHT_SIDEBAR, !isRightSidebarOpen)
  );
};

export const setConcepts = (payload) => (dispatch) =>
  dispatch(actionCreator(menuTypes.SET_CONCEPTS, payload));
