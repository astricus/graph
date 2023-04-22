import dataTypes from './data.types';

const initialState = {
  loading: false,
  graph: null,
  scale: 100,
  steps: 0,
  seeding: [],
  error: null,
};

const dataReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case dataTypes.REQUEST_DATA_UPLOAD:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case dataTypes.SUCCESS_DATA_UPLOAD:
      return {
        ...state,
        graph: payload.graph,
        steps: payload.steps,
        scale: payload.scale,
        seeding: payload.seeding,
        loading: false,
      };
    case dataTypes.FAILURE_DATA_UPLOAD:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default dataReducer;