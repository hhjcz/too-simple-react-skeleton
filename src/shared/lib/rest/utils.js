/** Created by hhj on 1/29/16. */
import humps from 'humps'

export const actionPrefix = '@@my-rest'

export const getActionBasename = endpointName => `${actionPrefix}/${humps.decamelize(endpointName).toUpperCase()}`

export const generateFetchActions = endpointName => {
  const actionBaseName = getActionBasename(endpointName)
  return {
    fetchRequested: () => ({
      type: `${actionBaseName}_REQUEST`
    }),
    fetchSuccess: response => ({
      type: `${actionBaseName}_SUCCESS`,
      ...response,
    }),
    fetchError: error => ({
      type: `${actionBaseName}_ERROR`,
      error
    })
  }
}

export const getSubState = endpointName => getState => {
  let state = getState()[endpointName]
  if (state.toObject) state = state.toObject()
  return state
}
