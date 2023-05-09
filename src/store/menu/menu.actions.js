import menuTypes from './menu.types';
import { actionCreator } from '../utils';
import {
  selectIsDataModalOpen,
  selectIsDefinitionsModalOpen,
  selectIsLeftSidebarOpen,
  selectIsRightSidebarOpen,
  selectIsSettingsModalOpen,
} from './menu.selectors';

export const toggleDataModal = () => (dispatch, getState) => {
  const isDataModalOpen = selectIsDataModalOpen(getState());
  dispatch(actionCreator(menuTypes.SET_OPEN_DATA_MODAL, !isDataModalOpen));
};

export const toggleSettingsModal = () => (dispatch, getState) => {
  const isSettingsModalOpen = selectIsSettingsModalOpen(getState());
  dispatch(
    actionCreator(menuTypes.SET_OPEN_SETTINGS_MODAL, !isSettingsModalOpen)
  );
};

export const toggleDefinitionsModal = () => (dispatch, getState) => {
  const isDefinitionsModalOpen = selectIsDefinitionsModalOpen(getState());
  dispatch(
    actionCreator(menuTypes.SET_OPEN_DEFINITIONS_MODAL, !isDefinitionsModalOpen)
  );
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
  dispatch(actionCreator(menuTypes.SET_CONCEPTS_FILTERS, payload));

export const setRelations = (payload) => (dispatch) =>
  dispatch(actionCreator(menuTypes.SET_RELEATIONS_FILTERS, payload));

export const setConstraints = (payload) => (dispatch) =>
  dispatch(actionCreator(menuTypes.SET_CONSTRAINTS_FILTERS, payload));
