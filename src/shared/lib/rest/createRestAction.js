/** Created by hhj on 1/29/16. */
import { decamelizeKeys } from 'humps'
import contains from 'lodash/includes'
import remove from 'lodash/fp/remove'
import handleError from '../myErrorHandler'
import createResource from './createResource'
import { getSubState } from './utils'
import queryGenerators from './queryGenerators'

let actionCounter = 1

export default function createRestAction(endpointName, config, actionCreators, fnHolder) {
  const getThisSubState = getSubState(endpointName)

  const resource = createResource(endpointName, config, fnHolder)
  const extraParams = decamelizeKeys(config.extraParams)

  const canceledActions = {}
  const pendingActions = {}

  const createAction = (actionName, fetchMethod = null, methodExtraParams = {}) => {
    if (!fetchMethod) fetchMethod = actionName

    const subActionCreators = {
      requested: actionCreators[`${actionName}Requested`],
      success: actionCreators[`${actionName}Success`],
      error: actionCreators[`${actionName}Error`],
    }
    const queryGenerator = queryGenerators[actionName] || (() => ({}))

    pendingActions[actionName] = []

    /* eslint-disable arrow-body-style */
    const action = ({ params, body, force } = {}) => {
      if (force == null) force = false // eslint-disable-line

      return fnHolder.dispatch(({ dispatch, getState }) => {

        const state = getThisSubState(getState)
        const queryParams = { ...queryGenerator(state), ...extraParams, ...decamelizeKeys(params), ...methodExtraParams } // eslint-disable-line max-len
        const { fetchUrl, executeFetch } = resource[fetchMethod](queryParams, body)

        let lastFetchSignature = null
        if (state.lastFetchSignature) {
          let lastFetchSignatureObj = state.lastFetchSignature
          if (lastFetchSignatureObj.toObject) lastFetchSignatureObj = lastFetchSignatureObj.toObject()
          lastFetchSignature = lastFetchSignatureObj[actionName]
        }
        if (!force && lastFetchSignature === fetchUrl) return Promise.resolve(null) // no need to refetch

        dispatch(subActionCreators.requested())
        const thisActionId = actionCounter++
        pendingActions[actionName].push(thisActionId)
        const removeThisActionFrom = remove(actionId => {
          console.log('Iteratee actionId', actionId, thisActionId)
          return actionId === thisActionId
        })
        const removeThisActionFromPending = () => {
          pendingActions[actionName] = removeThisActionFrom(pendingActions[actionName])
        }

        return executeFetch()
          .then(response => {
            console.log(actionName, 'pending actions, canceledActions, thisActionId: ', pendingActions[actionName], canceledActions[actionName], thisActionId)
            removeThisActionFromPending()
            // was canceled? -> don't dispatch response
            if (contains(canceledActions[actionName], thisActionId)) {
              console.log(actionName, thisActionId, ' was canceled, not dispatching')
              // canceledActions[actionName] = []
              return null
            }
            dispatch(subActionCreators.success(response))
            return response
          })
          .catch(error => {
            removeThisActionFromPending()
            const errorMessage = `${error.message}`
            dispatch(subActionCreators.error({ errorMessage }))
            handleError(errorMessage)
          })
      })
    }

    action.cancelPending = () => {
      canceledActions[actionName] = pendingActions[actionName].map(actionId => actionId)
      console.log(actionName, ' will cancel actions: ', canceledActions[actionName], pendingActions[actionName])
    }

    return action
  }

  // fetchIds uses fetchCollection resource with predefined params:
  const fetchIds = createAction('fetchIds', 'fetchCollection', {
    _fields: 'id',
    page: 1,
    per_page: 10000000,
    include: null
  })
  const fetchCollection = createAction('fetchCollection')
  const fetchCollectionByIds = createAction('fetchCollectionByIds', 'fetchCollection')
  const fetchOne = createAction('fetchOne')
  const create = createAction('create')
  const update = createAction('update')
  const destroy = createAction('destroy')

  return {
    fetchIds,
    fetchCollection,
    fetchCollectionByIds,
    fetchOne,
    create,
    update,
    destroy,
  }
}
