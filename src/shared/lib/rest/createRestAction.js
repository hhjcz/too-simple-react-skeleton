/** Created by hhj on 1/29/16. */
import { parse as urlParse } from 'url'
import { decamelizeKeys } from 'humps'
import handleError from '../myErrorHandler'
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
  const extraParams = decamelizeKeys(config.extraParams)

  const createAction = (actionName, fetchMethod = null, methodExtraParams = {}) => {
    if (!fetchMethod) fetchMethod = actionName

    const subActionCreators = {
      requested: actionCreators[`${actionName}Requested`],
      success: actionCreators[`${actionName}Success`],
      error: actionCreators[`${actionName}Error`],
    }
    const queryGenerator = queryGenerators[actionName] || (() => ({}))

    /* eslint-disable arrow-body-style */
    return ({ params, body, projectToLocation, force } = {}) => {
      if (projectToLocation == null) projectToLocation = false // eslint-disable-line
      if (force == null) force = false // eslint-disable-line

      return fnHolder.dispatch(({ dispatch, getState, history }) => {

        const state = getThisSubState(getState)
        const queryParams = { ...queryGenerator(state), ...extraParams, ...decamelizeKeys(params), ...methodExtraParams }
        const { fetchUrl, executeFetch } = resource[fetchMethod](queryParams, body)

        let lastFetchMark = null
        if (state.lastFetchMark) {
          let lastFetchMarkObj = state.lastFetchMark
          if (lastFetchMarkObj.toObject) lastFetchMarkObj = lastFetchMarkObj.toObject()
          lastFetchMark = lastFetchMarkObj[actionName]
        }
        if (!force && lastFetchMark === fetchUrl) return Promise.resolve(null) // no need to refetch
        if (history && projectToLocation) {
          projectFetchUrlToLocation(history, urlParse(fetchUrl).search)
        }

        dispatch(subActionCreators.requested())

        return executeFetch()
          .then(response => {
            dispatch(subActionCreators.success(response))
            return response
          })
          .catch(error => {
            const errorMessage = `${error.message}`
            dispatch(subActionCreators.error({ errorMessage }))
            handleError(errorMessage)
          })
      })
    }
  }

  const fetchAll = createAction('fetchAll')
  const fetchAllByIds = createAction('fetchAllByIds', 'fetchAll')
  // fetchIds as a special case of fetchAll:
  const fetchIds = createAction('fetchIds', 'fetchAll', {
    _fields: 'id',
    page: 1,
    per_page: 10000000,
    include: null
  })
  const fetchOne = createAction('fetchOne')
  const create = createAction('create')
  const update = createAction('update')
  const destroy = createAction('destroy')

  return {
    fetchAll,
    fetchAllByIds,
    fetchIds,
    fetchOne,
    create,
    update,
    destroy,
  }
}
