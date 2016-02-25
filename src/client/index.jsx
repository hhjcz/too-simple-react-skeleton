/** Created by hhj on 12/23/15. */
import React from 'react'
import { render } from 'react-dom'
import { Router } from 'react-router'
import { createHistory, useQueries } from 'history'
import { Provider } from 'react-redux'
// import 'bootstrap/dist/css/bootstrap.min.css'
import './my-bootstrap.less'
import './global.styl'
import rest from '../shared/app/rest'

import routes from '../shared/app/routes'
import createStore from '../shared/app/createStore'

// history library with query parsing support:
const history = useQueries(createHistory)()

// server has put the state here (see server.js):
const initialState = window.__INITIAL_STATE__

const store = createStore(initialState, history)
rest.use('dispatch', store.dispatch)

render(
  <Provider store={store}>
    <Router children={routes} history={history} />
  </Provider>,
  document.getElementById('react-view')
)
