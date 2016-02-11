/** Created by hhj on 12/28/15. */
import { combineReducers } from 'redux'
import zarizeni from '../zarizeni-list/reducer'
import umisteni from '../umisteni/reducer'

const reducer = combineReducers({
  zarizeni,
  umisteni,
})

export default reducer
