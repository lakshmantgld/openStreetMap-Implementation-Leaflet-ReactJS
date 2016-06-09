import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, compose, applyMiddleware} from 'redux';
import {Provider} from 'react-redux'
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

import reducers from './reducers';

import App from './components/App';
import MapComponent from './components/MapComponent';

window.React = React;

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const logger = createLogger();
const createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore);
const store = createStoreWithMiddleware(reducers);
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={App}>
        <IndexRoute component={MapComponent} />
        <Route path='source=:source/destination=:destination' component={MapComponent}>
        </Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
