import dataTypes from './data.types';
import { actionCreator } from '../utils';
import * as api from './data.api'
import { selectActiveNodesMap, selectPinnedNodesMap } from './data.selectors';

export const load = (formData) => async (dispatch) => {
  try {
    dispatch(actionCreator(dataTypes.REQUEST_LOAD));
    const graphData = await api.load(formData)
    dispatch(actionCreator(dataTypes.SUCCESS_LOAD, graphData));
    return true;
  } catch (error) {
    console.error(error);
    dispatch(actionCreator(dataTypes.FAILURE_LOAD, error));
    return false;
  }
};

export const focus = (data) => async (dispatch) => {
  try {
    dispatch(actionCreator(dataTypes.REQUEST_FOCUS));
    const graphData = await api.focus(data)
    dispatch(actionCreator(dataTypes.SUCCESS_FOCUS, graphData));
    return true;
  } catch (error) {
    console.error(error);
    dispatch(actionCreator(dataTypes.FAILURE_FOCUS, error));
    return false;
  }
};

export const cluster = (data) => async (dispatch) => {
  try {
    dispatch(actionCreator(dataTypes.REQUEST_CLUSTER));
    const graphData = await api.cluster(data)
    dispatch(actionCreator(dataTypes.SUCCESS_CLUSTER, graphData));
    return true;
  } catch (error) {
    console.error(error);
    dispatch(actionCreator(dataTypes.FAILURE_CLUSTER, error));
    return false;
  }
};

export const remove = (data) => async (dispatch) => {
  try {
    dispatch(actionCreator(dataTypes.REQUEST_DELETE));
    const graphData = await api.remove(data)
    dispatch(actionCreator(dataTypes.SUCCESS_DELETE, graphData));
    return true;
  } catch (error) {
    console.error(error);
    dispatch(actionCreator(dataTypes.FAILURE_DELETE, error));
    return false;
  }
};

export const expand = (data) => async (dispatch) => {
  try {
    dispatch(actionCreator(dataTypes.REQUEST_EXPAND));
    const graphData = await api.expand(data)
    dispatch(actionCreator(dataTypes.SUCCESS_EXPAND, graphData));
    return true;
  } catch (error) {
    console.error(error);
    dispatch(actionCreator(dataTypes.FAILURE_EXPAND, error));
    return false;
  }
};

export const fold = (data) => async (dispatch) => {
  try {
    dispatch(actionCreator(dataTypes.REQUEST_FOLD));
    const graphData = await api.fold(data)
    dispatch(actionCreator(dataTypes.SUCCESS_FOLD, graphData));
    return true;
  } catch (error) {
    console.error(error);
    dispatch(actionCreator(dataTypes.FAILURE_FOLD, error));
    return false;
  }
};

export const abstract = (data) => async (dispatch) => {
  try {
    dispatch(actionCreator(dataTypes.REQUEST_ABSTRACT));
    const graphData = await api.abstract(data)
    dispatch(actionCreator(dataTypes.SUCCESS_ABSTRACT, graphData));
    return true;
  } catch (error) {
    console.error(error);
    dispatch(actionCreator(dataTypes.FAILURE_ABSTRACT, error));
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
