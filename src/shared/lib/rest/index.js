/** Created by hhj on 1/29/16. */
import { forEach } from 'lodash'
import { bindActionCreators } from 'redux'
import createRestReducer from './createRestReducer'
import createRestAction from './createRestAction'
import actionTypesFor from './actionTypesFor'
import { actionCreatorsFor } from './actionCreatorsFor'

export default function createMyRest(config = {}, fetch = () => ({}), dispatch = null) {
  const myRest = { actions: {}, reducers: {} }
  const fnHolder = { fetch, dispatch }

  Object.keys(config).forEach(endpointName => {
    const actionTypes = actionTypesFor(endpointName)
    const actionCreators = actionCreatorsFor(actionTypes)
    myRest.actions[endpointName] = createRestAction(endpointName, config[endpointName], actionCreators, fnHolder)
    myRest.reducers[endpointName] = createRestReducer(endpointName, config[endpointName], actionTypes)
  })

  myRest.use = (key, value) => {
    fnHolder[key] = value
    return myRest
  }

  return myRest
}
