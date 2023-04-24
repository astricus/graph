import { createSelector } from 'reselect';

const selectDataStore = (state) => state.data;

export const selectGraph = createSelector(
  [selectDataStore],
  ({ graph }) => graph
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
