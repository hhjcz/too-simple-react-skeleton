/** Created by hhj on 1/29/16. */
import createRestReducer from './createRestReducer'
import createRestAction from './createRestAction'
import { actionTypesFor } from './actionTypesFor'
import { actionCreatorsFor } from './actionCreatorsFor'

export { getItems, getItem } from './utils'
export const collectionTypes = { static: 'static', dynamic: 'dynamic' }

export default function createMyRest(config = {}, fetch = () => ({}), dispatch = null) {
  const myRest = { actions: {}, reducers: {}, entityReducers: {} }
  const fnHolder = { fetch, dispatch }

  Object.keys(config).forEach(endpointName => {
    const actionTypes = actionTypesFor(endpointName)
    const actionCreators = actionCreatorsFor(actionTypes)
    const actions = createRestAction(
      endpointName,
      config[endpointName],
      actionCreators,
      fnHolder
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

  myRest.use = (key, value) => {
    fnHolder[key] = value
    return myRest
  }

  return myRest
}
