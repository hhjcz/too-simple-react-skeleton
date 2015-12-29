/**
 * Created by hhj on 12/28/15.
 */
import thunkMiddleware from 'redux-thunk'
import {createStore as _createStore, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import reducer from './shared/reducer'

const BROWSER_DEVELOPMENT = process.env.NODE_ENV === 'development' && process.env.IS_BROWSER === true

export default function createStore(initialState = {}) {
  const middlewares = [thunkMiddleware]
  if (BROWSER_DEVELOPMENT) {
    middlewares.push(createLogger({
      collapsed: true,
      // convert immutable => json => object
      stateTransformer: (state) => JSON.parse(JSON.stringify(state))
    }))
  }

  return applyMiddleware(...middlewares)(_createStore)(reducer, initialState)
}
