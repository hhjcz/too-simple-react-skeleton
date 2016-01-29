/** Created by hhj on 1/29/16. */
import { serializeQueryParams, fetchFromApi } from './fetchHelpers'
import { getFetchActions } from './utils'

export default function createRestAction(endpointName, config) {
  const url = config.url || '/'
  const getSubState = getState => getState()[endpointName]

  return function fetchList({ location } = {}) {

    // projects state variables to url,
    // so that on page reload it can be used on server for initial state
    const projectStateToUrl = (history, search) => {
      history.push({ pathname: window.location.pathname, search })
    }

    return ({ dispatch, getState, history, fetch }) => {
      // on server, get (initial) query from url (via location), on client from state
      const queryParams = location
        ? location.search
        : serializeQueryParams(getSubState(getState).toObject())
      const previousQueryParams = getSubState(getState).queryParams
      if (previousQueryParams === queryParams) return null // no need to refetch

      if (history) projectStateToUrl(history, queryParams)

      const fetchCallbacks = getFetchActions(endpointName)

      return fetchFromApi({ url, queryParams, dispatch, fetch, fetchCallbacks })
    }
  }
}
