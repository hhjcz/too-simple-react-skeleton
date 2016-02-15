/** Created by hhj on 1/29/16. */
import { parse as urlParse } from 'url'
import createResource from './createResource'
import { getSubState } from './utils'
import queryGenerators from './queryGenerators'

export default function createRestAction(endpointName, config, actionCreators, fetchHolder) {
  const getThisSubState = getSubState(endpointName)

  // projects fetch url to window location (via history),
  // so that on page reload it can be used on server for initial state
  const projectFetchUrlToLocation = (history, search) => {
    history.push({ pathname: window.location.pathname, search })
  }

  const resource = createResource(endpointName, config, fetchHolder)

  const createAction = actionName => {
    const subActionCreators = {
      requested: actionCreators[`${actionName}Requested`],
      success: actionCreators[`${actionName}Success`],
      error: actionCreators[`${actionName}Error`],
    }
    const queryGenerator = queryGenerators[actionName]

    /* eslint-disable arrow-body-style */
    return ({ params, projectToLocation } = {}) => {
      if (projectToLocation == null) projectToLocation = false // eslint-disable-line

      return ({ dispatch, getState, history }) => {

        const state = getThisSubState(getState)
        const queryParams = { ...queryGenerator(state), ...params }
        const { fetchUrl, fetchExecute } = resource[actionName](queryParams)

        if (state.lastFetchMark === fetchUrl) return null // no need to refetch
        if (history && projectToLocation) projectFetchUrlToLocation(history, urlParse(fetchUrl).search)

        dispatch(subActionCreators.requested())

        return fetchExecute()
          .then(response => dispatch(subActionCreators.success(response)))
          .catch(error => {
            const errorMessage = `Ajaaj, chybka api: ${error}`
            dispatch(subActionCreators.error({ errorMessage }))
            console.log(errorMessage)
            throw new Error(errorMessage)
          })
      }
    }
  }

  const fetchAll = createAction('fetchAll')
  const fetchOne = createAction('fetchOne')

  return {
    fetchAll,
    fetchOne,
  }
}
