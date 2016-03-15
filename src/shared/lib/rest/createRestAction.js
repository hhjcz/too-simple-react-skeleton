/** Created by hhj on 1/29/16. */
import { parse as urlParse } from 'url'
import { decamelizeKeys } from 'humps'
import createResource from './createResource'
import { getSubState } from './utils'
import queryGenerators from './queryGenerators'

export default function createRestAction(endpointName, config, actionCreators, fnHolder) {
  const getThisSubState = getSubState(endpointName)

  // projects fetch url to window location (via history),
  // so that on page reload it can be used on server for initial state
  const projectFetchUrlToLocation = (history, search) => {
    history.push({ pathname: window.location.pathname, search })
  }

  const resource = createResource(endpointName, config, fnHolder)
  const { extraParams } = config

  const createAction = actionName => {
    const subActionCreators = {
      requested: actionCreators[`${actionName}Requested`],
      success: actionCreators[`${actionName}Success`],
      error: actionCreators[`${actionName}Error`],
    }
    const queryGenerator = queryGenerators[actionName] || (() => ({}))

    /* eslint-disable arrow-body-style */
    return ({ params, body, projectToLocation } = {}) => {
      if (projectToLocation == null) projectToLocation = false // eslint-disable-line

      return fnHolder.dispatch(({ dispatch, getState, history }) => {

        const state = getThisSubState(getState)
        const queryParams = { ...queryGenerator(state), ...extraParams, ...decamelizeKeys(params) }
        const { fetchUrl, fetchExecute } = resource[actionName](queryParams, body)

        const lastFetchMark = state.lastFetchMark ? (state.lastFetchMark.toObject ? state.lastFetchMark.toObject()[actionName] : state.lastFetchMark[actionName]) : null // eslint-disable-line no-nested-ternary
        if (lastFetchMark === fetchUrl) return Promise.resolve(null) // no need to refetch
        if (history && projectToLocation) projectFetchUrlToLocation(history, urlParse(fetchUrl).search)

        dispatch(subActionCreators.requested())

        return fetchExecute()
          .then(response => {
            dispatch(subActionCreators.success(response))
            return response
          })
          .catch(error => {
            const errorMessage = `Ajaaj, chybka api: ${error}`
            dispatch(subActionCreators.error({ errorMessage }))
            console.error(errorMessage)
            throw new Error(errorMessage)
          })
      })
    }
  }

  const fetchAll = createAction('fetchAll')
  const fetchOne = createAction('fetchOne')
  const create = createAction('create')
  const update = createAction('update')
  const destroy = createAction('destroy')

  return {
    fetchAll,
    fetchOne,
    create,
    update,
    destroy,
  }
}
