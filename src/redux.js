/**
 * Created by hhj on 12/28/15.
 */
import thunkMiddleware from 'redux-thunk'
import {createStore as _createStore} from 'redux'
import reducer from './shared/reducer'

export default function createStore(initialState = {}) {
  return _createStore(reducer, initialState)
}
