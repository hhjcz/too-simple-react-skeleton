/** Created by hhj on 1/29/16. */
import { serializeQueryParams, normalizeResponse } from './fetchHelpers'
import { generateFetchActions } from './utils'

export default function createRestAction(endpointName, config, fetchHolder) {
  const url = config.url || '/'
  const getSubState = getState => {
    let state = getState()[endpointName]
    if (state.toObject) state = state.toObject()
    return state
  }
  const { fetchRequested, fetchSuccess, fetchError } = generateFetchActions(endpointName)

  /**
   * @returns {axios.Promise}
   */
  const fetchFromApi = ({ queryParams, dispatch }) => {

    function reportError(errorMessage) {
      const msg = `Ajaaj, chybka api: ${errorMessage}`
      dispatch(fetchError(msg))
      console.log(msg)
      throw new Error(msg)
    }

    dispatch(fetchRequested())

    return fetchHolder.fetch(`${url}${queryParams}`)
      .then(
        response => {
          if (!response.ok) {
            reportError(`${response.status} ${response.statusText}`)
          }
          return response.json()  // parse json to object
        },
        error => {
          reportError(error)
        })
      .then(
        response => {
          const normalizedResponse = normalizeResponse(response)
          normalizedResponse.meta.queryParams = queryParams
          return dispatch(fetchSuccess(normalizedResponse))
        }
      )
  }

  // projects state variables to url,
  // so that on page reload it can be used on server for initial state
  const projectStateToUrl = (history, search) => {
    history.push({ pathname: window.location.pathname, search })
  }

  const fetchActionCreator = ({ location } = {}) => ({ dispatch, getState, history }) => {
    // on server, get (initial) query from url (via location), on client from state
    const queryParams = location
      ? location.search
      : serializeQueryParams(getSubState(getState))
    const previousQueryParams = getSubState(getState).queryParams
    if (previousQueryParams === queryParams) return null // no need to refetch

    if (history) projectStateToUrl(history, queryParams)

    return fetchFromApi({ queryParams, dispatch })
  }

  return fetchActionCreator
}
