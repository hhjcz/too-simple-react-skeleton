/** Created by hhj on 1/29/16. */
import queryGenerators from './queryGenerators'
import responseTransformers from './responseTransformers'
import { getSubState } from './utils'

const defaultConfig = () => ({
  url: '/',
  responseTransformers,
  queryGenerators,
})

export default function createRestAction(endpointName, _config, actionCreators, fetchHolder) {
  const config = { ...defaultConfig(), ..._config }
  const getThisSubState = getSubState(endpointName)

  /**
   * @returns {axios.Promise}
   */
  const fetchFromApi = ({ url, dispatch, responseTransformer, subActionCreators }) => {

    function reportError(errorMessage) {
      const error = `Ajaaj, chybka api: ${errorMessage}`
      dispatch(subActionCreators.error({ error }))
      console.log(error)
      throw new Error(error)
    }

    dispatch(subActionCreators.requested())

    return fetchHolder.fetch(url)
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
          normalizedResponse.meta.lastFetchMark = url
          return dispatch(subActionCreators.success(normalizedResponse))
        }
      )
  }

// projects state variables to window location (via history),
// so that on page reload it can be used on server for initial state
  const projectStateToLocation = (history, search) => {
    history.push({ pathname: window.location.pathname, search })
  }

  const createAction = actionName => {
    const subActionCreators = {
      requested: actionCreators[`${actionName}Requested`],
      success: actionCreators[`${actionName}Success`],
      error: actionCreators[`${actionName}Error`],
    }
    const queryGenerator = config.queryGenerators[actionName]
    const responseTransformer = config.responseTransformers[actionName]

    /* eslint-disable arrow-body-style */
    return ({ location, params } = {}) => {
      return ({ dispatch, getState, history }) => {
        // on server, get (initial) query from url (via location),
        // on client first project to window location, then get from window.location
        if (history) projectStateToLocation(history, queryGenerator(getThisSubState(getState)))
        const _location = location || (global.window ? global.window.location : {})
        const url = _location.pathname + _location.search
        // const paramString = params && params.id ? `/${params.id}` : ''
        // const url = `${config.url}${paramString}${queryString}`

        if (getThisSubState(getState).lastFetchMark === url) return null // no need to refetch

        return fetchFromApi({ url, responseTransformer, subActionCreators, dispatch })
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
