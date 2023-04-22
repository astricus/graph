import { createSelector } from "reselect";

const selectMenuStore = (state) => state.menu;

export const selectIsDataModalOpen = createSelector(
  [selectMenuStore],
  ({ isDataModalOpen }) => isDataModalOpen
);
