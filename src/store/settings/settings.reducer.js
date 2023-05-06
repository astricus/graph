import settingsTypes from './settings.types';

const initialState = {
  zoom: 1,
  hop: 2,
  definitionsNumber: 3,
  abstractType: 'none',
  showStereotype: true,
  showColor: true,
  selectionColor: '#ff0000',
};

const settingsReducer = (state = initialState, { type, payload }) => {
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
    default:
      return state;
  }
};

export default settingsReducer;