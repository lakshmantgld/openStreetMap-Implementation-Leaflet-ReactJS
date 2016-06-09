import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { source, destination, latlngs } from './account';

const reducers = combineReducers({
  source,
  destination,
  latlngs,
  routing: routerReducer
});

export default reducers;
