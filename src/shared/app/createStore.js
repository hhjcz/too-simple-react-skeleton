/** Created by hhj on 12/28/15. */
import thunkMiddleware from 'redux-thunk'
import { createStore as _createStore, applyMiddleware, compose } from 'redux'
import createLogger from 'redux-logger'
import DevTools from './DevTools'

import reducer from './reducer'

// defined in webpack configuration or node runtime environment
const DEVELOPMENT = process.env.NODE_ENV !== 'production'
const BROWSER_DEVELOPMENT = DEVELOPMENT && process.env.IS_BROWSER === true

export default function createStore(initialState = {}) {
  const middleware = [thunkMiddleware]
  if (BROWSER_DEVELOPMENT) {
    middleware.push(createLogger({
      collapsed: true,
      // convert immutable => json => object
      stateTransformer: (state) => JSON.parse(JSON.stringify(state)),
    }))
  }

  let devToolsInstrument = (x) => x
  if (DEVELOPMENT) {
    devToolsInstrument = DevTools.instrument()
  }

  const store = compose(
    applyMiddleware(...middleware),
    devToolsInstrument
  )(_createStore)(reducer, initialState)

  return store
}
