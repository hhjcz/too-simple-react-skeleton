/**
 * Created by hhj on 12/23/15.
 */

import React from 'react'
import { render } from 'react-dom'
import { Router } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import {Provider} from 'react-redux'
import {fromJS} from 'immutable'

import routes from '../shared/app/routes'
import createStore from '../shared/app/createStore'

const history = createBrowserHistory();
// server has put the state here (see server.jsx):
const initialState = window.__INITIAL_STATE__;

// Transform into Immutable.js collections,
// but leave top level keys untouched for Redux
//Object
//  .keys(initialState)
//  .forEach(key => {
//    initialState[key] = fromJS(initialState[key]);
//  });

const store = createStore(initialState)

render(
  <Provider store={store}>
    <Router children={routes} history={history} />
  </Provider>,
  document.getElementById('react-view')
)
