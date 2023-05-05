import { createSelector } from 'reselect';

const selectDataStore = (state) => state.data.present;

export const selectGraph = createSelector(
  [selectDataStore],
  ({ graph }) => graph
);

export const selectOrigin = createSelector(
  [selectDataStore],
  ({ origin }) => origin
);

export const selectConstraints = createSelector(
  [selectDataStore],
  ({ constraints }) => constraints
);

export const selectNodes = createSelector([selectGraph], (graph) =>
  graph ? graph.nodes : []
);

export const selectLinks = createSelector([selectGraph], (graph) =>
  graph ? graph.links : []
);

export const selectPinnedNodesMap = createSelector(
  [selectDataStore],
  ({ pinnedNodes }) => pinnedNodes
);

export const selectActiveNodesMap = createSelector(
  [selectDataStore],
  ({ activeNodes }) => activeNodes
);

export const selectHistoryLimit = (state) => state.data.limit;
export const selectHistoryIndex = (state) => state.data.index;

export const selectIsUndoDisabled = createSelector(
  [selectHistoryIndex],
  (index) => index <= 0
);

export const selectIsRedoDisabled = createSelector(
  [selectHistoryIndex, selectHistoryLimit],
  (index, limit) => index >= limit - 1
);
