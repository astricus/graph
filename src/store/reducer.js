import undoable from 'redux-undo';
import { combineReducers } from 'redux';
import dataReducer from './data/data.reducer';
import menuReducer from './menu/menu.reducer';

const filterActions = ({ type }) => {
  if (typeof type === 'string' && type.includes('SUCCESS')) {
    return true;
  }
  return false;
};

export default combineReducers({
  menu: menuReducer,
  data: undoable(dataReducer, { filter: filterActions }),
});
