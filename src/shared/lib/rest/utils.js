/** Created by hhj on 1/29/16. */

export const getSubState = endpointName => getState => {
  const state = (typeof getState === 'function') ? getState() : getState
  let subState = state[endpointName]
  if (subState.toObject) subState = subState.toObject()
  return subState
}
