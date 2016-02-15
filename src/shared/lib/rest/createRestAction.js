/** Created by hhj on 1/29/16. */
import qs from 'query-string'
import { parse as urlParse } from 'url'
import createResource from './createResource'
import { getSubState } from './utils'
import queryGenerators from './queryGenerators'

export default function createRestAction(endpointName, config, actionCreators, fetchHolder) {
  const getThisSubState = getSubState(endpointName)

// projects state variables to window location (via history),
// so that on page reload it can be used on server for initial state
  const projectStateToLocation = (history, search) => {
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
    return ({ location, params, projectToLocation } = {}) => {
      if (projectToLocation == null) projectToLocation = false // eslint-disable-line

      return ({ dispatch, getState, history }) => {

        // on server, get (initial) query from url (via location),
        // on client first project to window location, then get from window.location
        const state = getThisSubState(getState)
        let queryParams
        if (location) {
          queryParams = qs.parse(location.search)
        } else {
          queryParams = qs.parse(queryGenerator(state))
        }
        const { fetchUrl, fetchExecute } = resource[actionName]({ ...queryParams, ...params })
        if (state.lastFetchMark === fetchUrl) return null // no need to refetch
        if (history && projectToLocation) projectStateToLocation(history, urlParse(fetchUrl).search)

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
