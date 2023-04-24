import dataTypes from './data.types';
import { actionCreator } from '../utils';
// import data from '../../response_g.json';
import * as api from './data.api'
import { selectActiveNodesMap, selectPinnedNodesMap } from './data.selectors';

export const loadData = (formData) => async (dispatch) => {
  try {
    dispatch(actionCreator(dataTypes.REQUEST_DATA_UPLOAD));
    const graphData = await api.loadData(formData)
    // dispatch(actionCreator(dataTypes.SUCCESS_DATA_UPLOAD, data));
    dispatch(actionCreator(dataTypes.SUCCESS_DATA_UPLOAD, graphData));
    return true;
  } catch (error) {
    console.error(error);
    dispatch(actionCreator(dataTypes.FAILURE_DATA_UPLOAD, error));
    return false;
  }
};

export const setPinnedNodes = (nodeId) => (dispatch, getState) => {
  let pinnedNodes = selectPinnedNodesMap(getState())
  if (!pinnedNodes) {
    pinnedNodes = { [nodeId]: true }
  } else {
    pinnedNodes[nodeId] = !pinnedNodes[nodeId]
  }
  dispatch(actionCreator(dataTypes.SET_PINNED_NODES, { ...pinnedNodes }))
}

export const setActiveNodes = (nodeId) => (dispatch, getState) => {
  let activeNodes = selectActiveNodesMap(getState())
  if (!activeNodes) {
    activeNodes = { [nodeId]: true }
  } else {
    activeNodes[nodeId] = !activeNodes[nodeId]
  }
  dispatch(actionCreator(dataTypes.SET_ACTIVE_NODES, { ...activeNodes }))
}
