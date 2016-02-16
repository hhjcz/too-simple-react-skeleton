/** Created by hhj on 12/28/15. */
import { combineReducers } from 'redux'
import zarizeni from '../zarizeni-list/reducer'
import { reducers as restReducers } from './rest'

const reducer = combineReducers({
  ...restReducers,
  zarizeni,
})

export default reducer
