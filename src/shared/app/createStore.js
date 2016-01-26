/** Created by hhj on 12/28/15. */
import thunkMiddleware from 'redux-thunk'
import { createStore as _createStore, applyMiddleware, compose } from 'redux'
import createLogger from 'redux-logger'

import createFetch from '../lib/createFetch'
import myMiddleware from '../lib/myMiddleware'
import reducer from './reducer'

// defined in webpack configuration or node runtime environment
const BROWSER_DEVELOPMENT = process.env.NODE_ENV !== 'production' && process.env.IS_BROWSER === true

/**
 * @param initialState
 * @param history
 * @returns {*}
 */
export default function createStore(initialState = {}, history = null) {
  const serverBaseUrl = process.env.SERVER_BASE_URL || 'http://localhost:8089/api/'
  const fetch = createFetch(serverBaseUrl)

  const middleware = [myMiddleware({ history, fetch })]  // inject history (in client only)
  if (BROWSER_DEVELOPMENT) {
    middleware.push(createLogger({
      collapsed: true,
      // convert immutable => json => object
      stateTransformer: (state) => JSON.parse(JSON.stringify(state)),
    }))
  }

  let devToolsInstrument = (x) => x
  if (process.env.NODE_ENV !== 'production') {
    const DevTools = require('./DevTools').default
    devToolsInstrument = DevTools.instrument()
  }

  const store = compose(
    applyMiddleware(...middleware),
    devToolsInstrument
  )(_createStore)(reducer, initialState)

  // hot reload root reducer (enables hot reloading action creators modules as well)
  if (module.hot) {
    module.hot.accept('./reducer', () => {
      console.log('Replacing store reducer')

      const nextReducer = require('./reducer').default
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
