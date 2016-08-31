/** Created by hhj on 12/28/15. */
import { combineReducers } from 'redux'
import { reducer as toastr } from 'react-redux-toastr'
import zarizeniList from '../zarizeni-list/reducer'
import lokalitaList from '../lokalita-list/reducer'
import udalostList from '../udalost-list/reducer'
import cp2typeList from '../orion/cp2type/reducer'
import rest, { RESOURCES_ROOT_TREE } from './rest'

const combinedReducer = combineReducers({
  [RESOURCES_ROOT_TREE]: combineReducers({
    ...rest.reducers,
  }),
  zarizeniList,
  lokalitaList,
  udalostList,
  cp2typeList,
  toastr,
})

// let reduxStorageActions = {}
// if (process.env.IS_BROWSER) {
//   reduxStorageActions = require('redux-localstorage').actionTypes
// }

const reducer = (state = {}, action) => {
  // initial state is received from server (see client/index.js) and hydrated in combined (sub) reducers,
  // then the state is overlapped by local storage persisted state if it exists:
  // if (process.env.IS_BROWSER && action.type === reduxStorageActions.INIT) {
  //   const persistedState = action.payload || {}
  //   state = { ...state, ...persistedState }
  // }

  return combinedReducer(state, action)
}

export default reducer
