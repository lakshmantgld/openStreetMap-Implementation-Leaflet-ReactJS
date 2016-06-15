import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { source, destination, latlngs, sourceLabel, destinationLabel } from './mapReducers';

const reducers = combineReducers({
  source,
  destination,
  latlngs,
  sourceLabel,
  destinationLabel,
  routing: routerReducer
});

export default reducers;
