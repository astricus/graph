import dataTypes from './data.types';
import { actionCreator } from '../utils';
import * as api from './data.api';
import { saveAs } from 'file-saver';
import {
  selectActiveNodesMap,
  selectOrigin,
  selectPinnedNodesMap,
} from './data.selectors';

export const load = (formData) => async (dispatch) => {
  try {
    dispatch(actionCreator(dataTypes.REQUEST_LOAD));
    const graphData = await api.load(formData);
    dispatch(actionCreator(dataTypes.SUCCESS_LOAD, graphData));
    return true;
  } catch (error) {
    console.error(error);
    dispatch(actionCreator(dataTypes.FAILURE_LOAD, error));
    return false;
  }
};

export const focus = (nodeId) => async (dispatch, getState) => {
  try {
    dispatch(actionCreator(dataTypes.REQUEST_FOCUS));
    const origin = selectOrigin(getState());
    const hop = 2; // TODO: make this configurable
    const graphData = await api.focus({ origin, node: nodeId, hop });
    dispatch(actionCreator(dataTypes.SUCCESS_FOCUS, graphData));
    return true;
  } catch (error) {
    console.error(error);
    dispatch(actionCreator(dataTypes.FAILURE_FOCUS, error));
    return false;
  }
};

export const cluster = (nodeId) => async (dispatch, getState) => {
  try {
    dispatch(actionCreator(dataTypes.REQUEST_CLUSTER));
    const origin = selectOrigin(getState());
    const graphData = await api.cluster({ origin, node: nodeId });
    dispatch(actionCreator(dataTypes.SUCCESS_CLUSTER, graphData));
    return true;
  } catch (error) {
    console.error(error);
    dispatch(actionCreator(dataTypes.FAILURE_CLUSTER, error));
    return false;
  }
};

export const remove =
  (elementId, elementType) => async (dispatch, getState) => {
    try {
      const origin = selectOrigin(getState());
      dispatch(actionCreator(dataTypes.REQUEST_DELETE));
      const graphData = await api.remove({
        origin,
        element_id: elementId,
        element_type: elementType,
      });
      dispatch(actionCreator(dataTypes.SUCCESS_DELETE, graphData));
      return true;
    } catch (error) {
      console.error(error);
      dispatch(actionCreator(dataTypes.FAILURE_DELETE, error));
      return false;
    }
  };

export const expand = (nodeId) => async (dispatch, getState) => {
  try {
    dispatch(actionCreator(dataTypes.REQUEST_EXPAND));
    const origin = selectOrigin(getState());
    const limit = 5; // todo: make this configurable
    const graphData = await api.expand({ origin, node: nodeId, limit });
    dispatch(actionCreator(dataTypes.SUCCESS_EXPAND, graphData));
    return true;
  } catch (error) {
    console.error(error);
    dispatch(actionCreator(dataTypes.FAILURE_EXPAND, error));
    return false;
  }
};

export const fold = (nodeId) => async (dispatch, getState) => {
  try {
    dispatch(actionCreator(dataTypes.REQUEST_FOLD));
    const origin = selectOrigin(getState());
    const longNames = undefined; // todo: make this configurable
    const multRelations = undefined; // todo: make this configurable
    const graphData = await api.fold({
      origin,
      node: nodeId,
      long_names: longNames,
      mult_relations: multRelations,
    });
    dispatch(actionCreator(dataTypes.SUCCESS_FOLD, graphData));
    return true;
  } catch (error) {
    console.error(error);
    dispatch(actionCreator(dataTypes.FAILURE_FOLD, error));
    return false;
  }
};

export const abstract = () => async (dispatch, getState) => {
  try {
    dispatch(actionCreator(dataTypes.REQUEST_ABSTRACT));
    const origin = selectOrigin(getState());
    const graphData = await api.abstract({ origin });
    dispatch(actionCreator(dataTypes.SUCCESS_ABSTRACT, graphData));
    return true;
  } catch (error) {
    console.error(error);
    dispatch(actionCreator(dataTypes.FAILURE_ABSTRACT, error));
    return false;
  }
};

export const setPinnedNodes = (nodeId) => (dispatch, getState) => {
  let pinnedNodes = selectPinnedNodesMap(getState());
  if (!pinnedNodes) {
    pinnedNodes = { [nodeId]: true };
  } else {
    pinnedNodes[nodeId] = !pinnedNodes[nodeId];
  }
  dispatch(actionCreator(dataTypes.SET_PINNED_NODES, { ...pinnedNodes }));
};

export const setActiveNodes = (nodeId) => (dispatch, getState) => {
  let activeNodes = selectActiveNodesMap(getState());
  if (!activeNodes) {
    activeNodes = { [nodeId]: true };
  } else {
    activeNodes[nodeId] = !activeNodes[nodeId];
  }
  dispatch(actionCreator(dataTypes.SET_ACTIVE_NODES, { ...activeNodes }));
};

export const exportOrigin = () => (dispatch, getState) => {
  const origin = selectOrigin(getState());
  if (origin) {
    const blob = new Blob([JSON.stringify(origin)], {
      type: 'text/plain;charset=utf-8',
    });
    saveAs(blob, 'data.json');
    dispatch(actionCreator(dataTypes.EXPORT_ORIGIN));
  }
};

export const define = (nodeName) => async (dispatch) => {
  try {
    dispatch(actionCreator(dataTypes.REQUEST_DEFINE));
    const numberOfDef = 3; // todo: make this configurable
    const definitions = await api.define({
      concept: nodeName,
      number_of_def: numberOfDef,
    });
    dispatch(actionCreator(dataTypes.SUCCESS_DEFINE, definitions));
    return true;
  } catch (error) {
    console.error(error);
    dispatch(actionCreator(dataTypes.FAILURE_DEFINE, error));
    return false;
  }
};
