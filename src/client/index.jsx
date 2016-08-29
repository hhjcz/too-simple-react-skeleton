/** Created by hhj on 12/23/15. */
import React from 'react'
import ReactDOM from 'react-dom'
import { Router, browserHistory } from 'react-router'
// import { createHistory, useQueries } from 'history'
import { Provider } from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'
import ReduxToastr from 'react-redux-toastr'
// import 'bootstrap/dist/css/bootstrap.min.css'
import './my-bootstrap.less'
import './global.styl'
import rest from '../shared/app/rest'

import routes from '../shared/app/routes'
import createStore from '../shared/app/createStore'

// history library with query parsing support:
// const history = useQueries(createHistory)()

// server has put the state here (see server.js):
// (initial state is then also hydrated from local storage,
//  which replaces the state received from server - see reducer.js)
// TODO - simplify deserialization directly in createStore using https://github.com/glenjamin/transit-immutable-js
const initialState = window.__INITIAL_STATE__

// react tap event for material ui (http://www.material-ui.com/#/get-started/installation):
injectTapEventPlugin()

const store = createStore(initialState, browserHistory)
rest.use('dispatch', store.dispatch)

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Router children={routes} history={browserHistory} />
      <ReduxToastr />
    </div>
  </Provider>,
  document.getElementById('react-view')
)
