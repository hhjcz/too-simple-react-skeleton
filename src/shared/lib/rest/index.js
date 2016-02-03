/** Created by hhj on 1/29/16. */
import createRestReducer from './createRestReducer'
import createRestAction from './createRestAction'
import actionTypesFor from './actionTypesFor'
import { actionCreatorsFor } from './actionCreatorsFor'

export default function createMyRest(config = {}, fetch = () => ({})) {
  const myRest = { actions: {}, reducers: {} }
  const fetchHolder = { fetch }

  Object.keys(config).forEach(endpointName => {
    const actionTypes = actionTypesFor(endpointName)
    const actionCreators = actionCreatorsFor(actionTypes)
    myRest.actions[endpointName] = createRestAction(endpointName, config[endpointName], actionCreators, fetchHolder)
    myRest.reducers[endpointName] = createRestReducer(endpointName, config[endpointName], actionTypes)
  })

  myRest.use = (key, value) => {
    fetchHolder[key] = value
    return myRest
  }

  return myRest
}
