/** Created by hhj on 1/29/16. */
import { decamelizeKeys } from 'humps'
import handleError from '../myErrorHandler'
import createResource from './createResource'
import { getSubState } from './utils'
import queryGenerators from './queryGenerators'

export default function createRestAction(endpointName, config, actionCreators, fnHolder) {
  const getThisSubState = getSubState(endpointName)

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
    return ({ params, body } = {}) => {

      return fnHolder.dispatch(({ dispatch, getState }) => {

        const state = getThisSubState(getState)
        const queryParams = { ...queryGenerator(state), ...extraParams, ...decamelizeKeys(params), ...methodExtraParams } // eslint-disable-line max-len
        const { executeFetch } = resource[fetchMethod](queryParams, body)

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

  // fetchIds uses fetchCollection resource with predefined params:
  const fetchIds = createAction('fetchIds', 'fetchCollection', {
    fields: 'id',
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
  // FIXME - should be set global for all resources?
  //       - define as a constant it in actionTypes
  const clearEntities = () => fnHolder.dispatch({ type: 'CLEAR_ENTITIES' })

  return {
    fetchIds,
    fetchCollection,
    fetchCollectionByIds,
    fetchOne,
    create,
    update,
    destroy,
    clearEntities,
  }
}
