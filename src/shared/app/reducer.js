/** Created by hhj on 12/28/15. */
import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import zarizeni from '../zarizeni-list/reducer'
import rest from './rest'

const reducer = combineReducers({
  ...rest.reducers,
  zarizeni,
  form: formReducer,
})

export default reducer
