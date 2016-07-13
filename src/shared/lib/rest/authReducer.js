/** Created by hhj on 7/13/16. */
import { Record } from 'immutable'
import * as actions from './authActions'

const InitialState = Record({
  isAuthenticationRequired: false
})

const reducer = (state = {}, action) => {
  if (!(state instanceof InitialState)) return new InitialState()

  switch (action.type) {
    case actions.AUTHENTICATION_REQUIRED:
      return state.set('isAuthenticationRequired', true)
    default:
  }

  return state
}

export default reducer
