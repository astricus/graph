import { createSelector } from "reselect";

const selectMenuStore = (state) => state.menu;

export const selectIsDataModalOpen = createSelector(
  [selectMenuStore],
  ({ isDataModalOpen }) => isDataModalOpen
);

export const selectIsSettingsModalOpen = createSelector(
  [selectMenuStore],
  ({ isSettingsModalOpen }) => isSettingsModalOpen 
);

export const selectIsDefinitionsModalOpen = createSelector(
  [selectMenuStore],
  ({ isDefinitionsModalOpen }) => isDefinitionsModalOpen 
);

export const selectIsLeftSidebarOpen = createSelector(
  [selectMenuStore],
  ({ isLeftSidebarOpen }) => isLeftSidebarOpen
);

export const selectIsRightSidebarOpen = createSelector(
  [selectMenuStore],
  ({ isRightSidebarOpen }) => isRightSidebarOpen
);

export const selectConcepts = createSelector(
  [selectMenuStore],
  ({ concepts }) => concepts
);

export const selectRelationFilters = createSelector(
  [selectMenuStore],
  ({ relations }) => relations
);

export const selectConstaintFilters = createSelector(
  [selectMenuStore],
  ({ constraints }) => constraints
);
