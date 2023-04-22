import { combineReducers } from 'redux';
import dataReducer from './data/data.reducer';
import menuReducer from './menu/menu.reducer';

export default combineReducers({
  menu: menuReducer,
  data: dataReducer,
});
