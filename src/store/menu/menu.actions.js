import menuTypes from "./menu.types";
import { actionCreator } from "../utils";
import { selectIsDataModalOpen } from "./menu.selectors";

export const toggleDataModal = () => (dispatch, getState) => {
  const isDataModalOpen = selectIsDataModalOpen(getState());
  dispatch(actionCreator(menuTypes.SET_OPEN_DATA_MODAL, !isDataModalOpen));
};
