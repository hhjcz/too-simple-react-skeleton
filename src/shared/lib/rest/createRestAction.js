/** Created by hhj on 1/29/16. */
import queryGenerator from './queryGenerator'
import responseTransformer from './responseTransformer'
import { getSubState } from './utils'

const defaultConfig = () => {
  return {
    url: '/',
    responseTransformer,
    queryGenerator,
  }
}

export default function createRestAction(endpointName, _config, actionCreators, fetchHolder) {
  const config = { ...defaultConfig(), ..._config }
  const getThisSubState = getSubState(endpointName)

  /**
   * @returns {axios.Promise}
   */
  const fetchFromApi = ({ queryParams, dispatch, responseTransformer }) => {

    function reportError(errorMessage) {
      const error = `Ajaaj, chybka api: ${errorMessage}`
      dispatch(actionCreators.fetchAllError({ error }))
      console.log(error)
      throw new Error(error)
    }

    dispatch(actionCreators.fetchAllRequested())

    return fetchHolder.fetch(`${config.url}${queryParams}`)
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
          const normalizedResponse = responseTransformer(response)
          normalizedResponse.meta.queryParams = queryParams
          return dispatch(actionCreators.fetchAllSuccess(normalizedResponse))
        }
      )
  }

// projects state variables to url,
// so that on page reload it can be used on server for initial state
  const projectStateToUrl = (history, search) => {
    history.push({ pathname: window.location.pathname, search })
  }

  const createAction = resourceType => ({ location } = {}) => ({ dispatch, getState, history }) => {
    // on server, get (initial) query from url (via location), on client from state
    const queryParams = location ? location.search : config.queryGenerator[resourceType](getThisSubState(getState))
    const previousQueryParams = getThisSubState(getState).queryParams
    if (previousQueryParams === queryParams) return null // no need to refetch

    if (history) projectStateToUrl(history, queryParams)

    return fetchFromApi({ queryParams, dispatch, responseTransformer: config.responseTransformer[resourceType] })
  }

  const fetchAll = createAction('collection')

  const fetchOne = createAction('item')

  return {
    fetchAll,
    fetchOne,
  }
}
