/** Created by hhj on 1/29/16. */
import createRestReducer from './createRestReducer'
import createRestAction from './createRestAction'
import { actionTypesFor } from './actionTypesFor'
import { actionCreatorsFor } from './actionCreatorsFor'
import authReducer from './authReducer'
import * as authActions from './authActions'

export { getSubState, getItems, getItem, getIdAtCursor } from './utils'
export const collectionTypes = { static: 'static', dynamic: 'dynamic' }

export default function createMyRest(config = {}, fetch = () => ({}), dispatch = null) {
  const myRest = { actions: {}, reducers: {}, entityReducers: {} }
  const depsContainer = { fetch, dispatch }

  Object.keys(config).forEach(endpointName => {
    const actionTypes = actionTypesFor(endpointName)
    const actionCreators = actionCreatorsFor(actionTypes)
    const actions = createRestAction(
      endpointName,
      config[endpointName],
      actionCreators,
      depsContainer
    )
    myRest.actions[endpointName] = actions
    myRest[endpointName] = { actions }

    const reducer = createRestReducer(
      endpointName,
      config[endpointName],
      actionTypes)
    myRest.reducers[endpointName] = reducer
    myRest[endpointName].reducer = reducer
  })

  // authentication reducer and actions:
  myRest.reducers.auth = authReducer
  myRest.actions.auth = authActions
  myRest.auth = { reducer: authReducer, actions: authActions }

  myRest.use = (key, value) => {
    depsContainer[key] = value
    return myRest
  }

  myRest.login = (creds) => {
    depsContainer.fetch()
  }

  return myRest
}
