import dataTypes from './data.types';

const initialState = {
  loading: false,
  graph: null,
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
        graph: payload,
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
