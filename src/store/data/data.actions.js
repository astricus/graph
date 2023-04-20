import dataTypes from './data.types';
import { actionCreator } from '../utils';
// import data from '../../response_g.json';
import * as api from './data.api'

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
