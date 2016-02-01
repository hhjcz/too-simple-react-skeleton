/** Created by hhj on 1/29/16. */
import createRestReducer from './createRestReducer'
import createRestAction from './createRestAction'

export default function createMyRest(config = {}, fetch = null) {
  const myRest = { actions: {}, reducers: {} }
  const fetchHolder = { fetch }

  Object.keys(config).forEach(endpointName => {
    myRest.actions[endpointName] = createRestAction(endpointName, config[endpointName], fetchHolder)
    myRest.reducers[endpointName] = createRestReducer(endpointName, config[endpointName])
  })

  myRest.use = (key, value) => {
    fetchHolder[key] = value
    return myRest
  }

  return myRest
}
