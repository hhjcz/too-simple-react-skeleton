/** Created by hhj on 12/28/15. */
import { combineReducers } from 'redux'
import zarizeniList from '../zarizeni-list/reducer'
import { reducer as toastr } from 'react-redux-toastr'
import rest from './rest'

const combinedReducer = combineReducers({
  resources: combineReducers({
    ...rest.reducers,
  }),
  zarizeniList,
  toastr,
})

let reduxStorageActions = {}
if (process.env.IS_BROWSER) {
  reduxStorageActions = require('redux-localstorage').actionTypes
}

const reducer = (state = {}, action) => {
  // initial state is received from server (see client/index.js) and hydrated in combined (sub) reducers,
  // then the state is replaced by local storage persisted state if it exists:
  if (process.env.IS_BROWSER && action.type === reduxStorageActions.INIT) {
    const persistedState = action.payload || {}
    state = { ...state, ...persistedState }
  }

  return combinedReducer(state, action)
}

export default reducer
