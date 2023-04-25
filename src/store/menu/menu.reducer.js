import menuTypes from "./menu.types";

const initialState = {
  isDataModalOpen: false,
  isSettingsModalOpen: false,
  isLeftSidebarOpen: false,
  isRightSidebarOpen: false,
  concepts: {
    search: "",
    sort: "nameAsc",
  },
  error: null,
};

const menuReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case menuTypes.SET_OPEN_DATA_MODAL:
      return {
        ...state,
        isDataModalOpen: payload,
      };
    case menuTypes.SET_OPEN_SETTINGS_MODAL:
      return {
        ...state,
        isSettingsModalOpen: payload,
      };
    case menuTypes.SET_OPEN_LEFT_SIDEBAR:
      return {
        ...state,
        isLeftSidebarOpen: payload,
      };
    case menuTypes.SET_OPEN_RIGHT_SIDEBAR:
      return {
        ...state,
        isRightSidebarOpen: payload,
      };
    case menuTypes.SET_CONCEPTS:
      return {
        ...state,
        concepts: payload,
      };
    case menuTypes.SET_RELEATIONS:
      return {
        ...state,
        relations: payload,
      };
    default:
      return state;
  }
};

export default menuReducer;
