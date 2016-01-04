/**
 * Created by hhj on 12/23/15.
 */

import React from 'react'
import { render } from 'react-dom'
import { Router } from 'react-router'
import { createHistory, useQueries } from 'history'
import { Provider } from 'react-redux'
import { fromJS } from 'immutable'

import routes from '../shared/app/routes'
import createStore from '../shared/app/createStore'

// history library with query parsing support:
const history = useQueries(createHistory)()

// server has put the state here (see server.jsx):
const initialState = window.__INITIAL_STATE__

const store = createStore(initialState)

render(
  <Provider store={store}>
    <Router children={routes} history={history} />
  </Provider>,
  document.getElementById('react-view')
)
