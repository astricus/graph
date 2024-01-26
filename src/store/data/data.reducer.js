import { genId } from '../../utils';
import dataTypes from './data.types';
import { cloneDeep } from 'lodash';

const initialState = {
  loading: false,
  graph: null,
  constraints: [],
  clickedNode: null,
  abstractCount: 0,
  origin: null,
  pinnedNodes: null,
  activeNodes: null,
  definitions: null,
  error: null,
};

const dataReducer = (state = cloneDeep(initialState), { type, payload }) => {
  switch (type) {
    case dataTypes.REQUEST_LOAD:
    case dataTypes.REQUEST_FOCUS:
    case dataTypes.REQUEST_CLUSTER:
    case dataTypes.REQUEST_DELETE:
    case dataTypes.REQUEST_EXPAND:
    case dataTypes.REQUEST_FOLD:
    case dataTypes.REQUEST_ABSTRACT:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case dataTypes.SUCCESS_LOAD:
    case dataTypes.SUCCESS_FOCUS:
    case dataTypes.SUCCESS_CLUSTER:
    case dataTypes.SUCCESS_DELETE:
    case dataTypes.SUCCESS_EXPAND:
    case dataTypes.SUCCESS_FOLD:
    case dataTypes.SUCCESS_ABSTRACT:
      return {
        ...state,
        graph: {
          ...payload.graph,
          id: genId(),
        },
        constraints: payload.constraints,
        origin: payload.origin,
        loading: false,
      };
    case dataTypes.FAILURE_LOAD:
    case dataTypes.FAILURE_FOCUS:
    case dataTypes.FAILURE_CLUSTER:
    case dataTypes.FAILURE_DELETE:
    case dataTypes.FAILURE_EXPAND:
    case dataTypes.FAILURE_FOLD:
    case dataTypes.FAILURE_ABSTRACT:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case dataTypes.SET_ABSTRACT_COUNT:
      return {
        ...state,
        abstractCount: payload,
      };
    case dataTypes.REQUEST_DEFINE:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case dataTypes.SUCCESS_DEFINE:
      return {
        ...state,
        definitions: payload,
        loading: false,
      };
    case dataTypes.FAILURE_DEFINE:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case dataTypes.SET_PINNED_NODES:
      return {
        ...state,
        pinnedNodes: payload,
      }
    case dataTypes.SET_ACTIVE_NODES:
      return {
        ...state,
        activeNodes: payload,
      }
    case dataTypes.EXPORT_ORIGIN:
      return state;
    case dataTypes.CLICK_NODE:
      return {
        ...state,
        clickedNode: payload,
      };
    case dataTypes.SET_DATA_INITIAL_STATE:
      return cloneDeep(initialState);
    default:
      return state;
  }
};

export default dataReducer;
