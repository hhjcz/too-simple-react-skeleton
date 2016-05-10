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

  /**
   *  create ASYNC action creators
   */
  const createAsyncAction = (actionName, fetchMethod = null, methodExtraParams = {}) => {
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
  const fetchIds = createAsyncAction('fetchIds', 'fetchCollection', {
    fields: 'id',
    page: 1,
    per_page: 10000000,
    include: null
  })
  const fetchCollection = createAsyncAction('fetchCollection')
  const fetchCollectionByIds = createAsyncAction('fetchCollectionByIds', 'fetchCollection')
  const fetchOne = createAsyncAction('fetchOne')
  const create = createAsyncAction('create')
  const update = createAsyncAction('update')
  const destroy = createAsyncAction('destroy')


  const updateCollection = () => fetchIds().then(() => fetchCollectionByIds())

  // ***** SYNC action creators ***** */

  const fetchOneAt = cursorAt => ({ dispatch, getState }) => {
    dispatch(actionCreators.pointCursorTo(cursorAt))

    const subState = getSubState('zarizeni')(getState)
    const id = subState.ids.get(cursorAt - 1)
    if (!id) handleError(`No valid zarizeni found at position ${cursorAt}`)

    return fetchOne({ params: { id } })
  }

  const gotoPage = page => ({ dispatch }) => {
    dispatch(actionCreators.gotoPage({ page }))
    return fetchCollectionByIds()
  }

  const setPagination = pagination => ({ dispatch }) => {
    dispatch(actionCreators.setPagination({ pagination }))
    return fetchCollectionByIds()
  }

  const setPageSize = perPage => ({ dispatch }) => {
    dispatch(actionCreators.setPageSize({ perPage }))
    return updateCollection()
  }

  const sortChange = sortField => ({ dispatch }) => {
    dispatch(actionCreators.sortChange({ sortField }))
    return updateCollection()
  }

  const filterChange = filter => ({ dispatch }) => {
    dispatch(actionCreators.filterChange({ filter }))
    return updateCollection()
  }

  const generalParamChange = paramObj => ({ dispatch }) => {
    dispatch(actionCreators.generalParamChange({ paramObj }))
    return updateCollection()
  }

  const clearEntities = () => fnHolder.dispatch({ type: 'CLEAR_ENTITIES' })

  return {
    fetchIds,
    fetchCollection,
    fetchCollectionByIds,
    fetchOne,
    create,
    update,
    destroy,
    fetchOneAt,
    gotoPage,
    setPagination,
    setPageSize,
    sortChange,
    filterChange,
    generalParamChange,
    clearEntities,
  }
}
