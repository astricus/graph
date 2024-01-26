import settingsTypes from './settings.types';
import { cloneDeep } from 'lodash';

const initialState = {
  zoom: 1,
  hop: 1,
  definitionsNumber: 3,
  abstractType: 'kind', // or 'topConcept'
  showStereotype: false,
  showColor: true,
  selectionColor: '#ff0000',
};

const settingsReducer = (
  state = cloneDeep(initialState),
  { type, payload }
) => {
  switch (type) {
    case settingsTypes.SET_ZOOM:
      return {
        ...state,
        zoom: payload,
      };
    case settingsTypes.SET_HOP:
      return {
        ...state,
        hop: payload,
      };
    case settingsTypes.SET_DEFINITIONS_NUMBER:
      return {
        ...state,
        definitionsNumber: payload,
      };
    case settingsTypes.SET_ABSTRACT_TYPE:
      return {
        ...state,
        abstractType: payload,
      };
    case settingsTypes.SET_SHOW_STEREOTYPE:
      return {
        ...state,
        showStereotype: payload,
      };
    case settingsTypes.SET_SHOW_COLOR:
      return {
        ...state,
        showColor: payload,
      };
    case settingsTypes.SET_SELECTION_COLOR:
      return {
        ...state,
        selectionColor: payload,
      };
    case settingsTypes.SET_SETTINGS_INITIAL_STATE:
      return cloneDeep(initialState);
    default:
      return state;
  }
};

export default settingsReducer;
