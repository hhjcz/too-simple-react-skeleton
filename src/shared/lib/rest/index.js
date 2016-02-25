/** Created by hhj on 1/29/16. */
import { forEach } from 'lodash'
import { bindActionCreators } from 'redux'
import createRestReducer from './createRestReducer'
import createRestAction from './createRestAction'
import actionTypesFor from './actionTypesFor'
import { actionCreatorsFor } from './actionCreatorsFor'

export default function createMyRest(config = {}, fetch = () => ({})) {
  const myRest = { actions: {}, reducers: {} }
  // TODO - rename fetchHolder
  const fetchHolder = { fetch, dispatch: x => x }

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

  myRest.bindActionCreators = dispatch => {
    console.log('Dispatch: ', dispatch)
    dispatch || (dispatch = x => x)
    forEach(myRest.actions, (value, key) => {
      myRest.actions[key] = bindActionCreators(value, dispatch)
    })

    return myRest
  }

  return myRest
}
