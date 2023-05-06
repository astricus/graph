import settingsTypes from './settings.types';
import { actionCreator } from '../utils';

export const setZoom = (zoom) => (dispatch) => {
  dispatch(actionCreator(settingsTypes.SET_ZOOM, zoom));
};

export const setHop = (hop) => (dispatch) => {
  dispatch(actionCreator(settingsTypes.SET_HOP, hop));
};

export const setDefinitionsNumber = (definitionsNumber) => (dispatch) => {
  dispatch(
    actionCreator(settingsTypes.SET_DEFINITIONS_NUMBER, definitionsNumber)
  );
};

export const setAbstractType = (abstractType) => (dispatch) => {
  dispatch(actionCreator(settingsTypes.SET_ABSTRACT_TYPE, abstractType));
};

export const setShowStereotype = (showStereotype) => (dispatch) => {
  dispatch(actionCreator(settingsTypes.SET_SHOW_STEREOTYPE, showStereotype));
};

export const setShowColor = (showColor) => (dispatch) => {
  dispatch(actionCreator(settingsTypes.SET_SHOW_COLOR, showColor));
};

export const setSelectionColor = (selectionColor) => (dispatch) => {
  dispatch(actionCreator(settingsTypes.SET_SELECTION_COLOR, selectionColor));
};
