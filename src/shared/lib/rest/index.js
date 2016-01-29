/** Created by hhj on 1/29/16. */
import createRestReducer from './createRestReducer'
import createRestAction from './createRestAction'

export default function createMyRest(config = {}) {
  const myRest = { actions: {}, reducer: {} }
  Object.keys(config).forEach(endpointName => {
    myRest.actions[endpointName] = createRestAction(endpointName, config[endpointName])
    myRest.reducer[endpointName] = createRestReducer(endpointName, config[endpointName])
  })

  return myRest
}
