import menuTypes from './menu.types';
import { actionCreator } from '../utils';
import {
  selectIsLeftSidebarOpen,
  selectIsRightSidebarOpen,
} from './menu.selectors';

export const setDataModal = (isOpen) => (dispatch) => {
  dispatch(actionCreator(menuTypes.SET_OPEN_DATA_MODAL, isOpen));
};

export const setSettingsModal = (isOpen) => (dispatch) => {
  dispatch(actionCreator(menuTypes.SET_OPEN_SETTINGS_MODAL, isOpen));
};

export const setDefinitionsModal = (isOpen) => (dispatch) => {
  dispatch(actionCreator(menuTypes.SET_OPEN_DEFINITIONS_MODAL, isOpen));
};

export const setAboutModal = (isOpen) => (dispatch) => {
  dispatch(actionCreator(menuTypes.SET_OPEN_ABOUT_MODAL, isOpen));
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

export const setMenuInitialState = () => (dispatch) =>
  dispatch(actionCreator(menuTypes.SET_MENU_INITIAL_STATE));