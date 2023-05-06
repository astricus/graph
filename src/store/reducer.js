import undoable from 'redux-undo';
import { combineReducers } from 'redux';
import dataReducer from './data/data.reducer';
import menuReducer from './menu/menu.reducer';
import settingsReducer from './settings/settings.reducer';
import { HISTORY_LIMIT } from '../constants';

const filterActions = ({ type }) => {
  if (typeof type === 'string' && type.includes('SUCCESS')) {
    return true;
  }
  return false;
};

export default combineReducers({
  menu: menuReducer,
  data: undoable(dataReducer, { filter: filterActions, limit: HISTORY_LIMIT }),
  settings: settingsReducer,
});
