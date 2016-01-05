/** Created by hhj on 12/28/15. */
import { combineReducers } from 'redux'
import { routeReducer } from 'redux-simple-router'

import zarizeniList from '../zarizeni-list/reducer'

const reducer = combineReducers({
  zarizeniList,
  routing: routeReducer
})

export default reducer
