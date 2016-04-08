/** Created by hhj on 1/29/16. */
/* eslint-disable max-len */
import { Pagination } from '../../app/models/Pagination'
import { Sort } from '../../app/models/Sort'
import Immutable, { List, Record, Map } from 'immutable'

export const InitialState = Record({
  fetching: false,
  lastFetchSignature: { fetchCollection: null, fetchOne: null },
  lastActionId: {},
  ids: List(),
  items: List(),
  item: {},
  pagination: new Pagination(),
  sort: new Sort(),
  filters: Map(),
  generalParams: Map(),
})

export default function createRestReducer(endpointName, config = {}, actionTypes = {}) {
  const itemTransformer = config.itemTransformer || (item => item)

  const initialState = new InitialState(config.defaultState || {})

  // Note how JSON from server is revived to immutable record.
  const revive = ({ fetching, lastFetchSignature, lastActionId, ids, items, item, pagination, sort, filters, generalParams }) => {
    const mergeObj = {
      fetching,
      lastFetchSignature,
      lastActionId,
    }
    if (ids) mergeObj.ids = List(ids)
    if (items) mergeObj.items = List(items).map(itemTransformer)
    if (item) mergeObj.item = itemTransformer(item)
    if (pagination) mergeObj.pagination = new Pagination(pagination)
    if (sort) mergeObj.sort = new Sort(sort)
    if (filters) mergeObj.filters = Map(filters)
    if (generalParams) mergeObj.generalParams = Map(generalParams)

    return initialState.merge(mergeObj);
  }

  return function reducer(state = {}, action) {
    if (!(state instanceof InitialState)) {
      return revive(state)
    }

    // TODO - refactor!
    switch (action.type) {
      case actionTypes.fetchCollectionRequested:
      case actionTypes.fetchCollectionByIdsRequested:
      case actionTypes.fetchIdsRequested:
      case actionTypes.fetchOneRequested:
      case actionTypes.createRequested:
      case actionTypes.updateRequested:
        return state.set('fetching', true)

      case actionTypes.fetchCollectionSuccess:
        return state.set('items', List(action.data).map(itemTransformer))
          .set('fetching', false)
          .update('lastFetchSignature', lastFetchSignature => ({
            ...lastFetchSignature,
            fetchCollection: action.meta.lastFetchSignature
          }))
          // .update('pagination', pagination => {   // eslint-disable-line arrow-body-style
          //   return action.meta.pagination
          //     ? new Pagination({ ...pagination.toObject(), ...action.meta.pagination })
          //     : pagination
          // })
          .update('sort', sort => {   // eslint-disable-line arrow-body-style
            return action.meta.sort
              ? new Sort(action.meta.sort)
              : sort
          })

      case actionTypes.fetchCollectionByIdsSuccess:
        return state.set('items', List(action.data).map(itemTransformer))
          .set('fetching', false)
          .update('lastFetchSignature', lastFetchSignature => ({
            ...lastFetchSignature,
            fetchCollectionByIds: action.meta.lastFetchSignature
          }))

      case actionTypes.fetchIdsSuccess:
        return state.set('ids', Immutable.fromJS(action.data).map(item => item.get('id')))
          .set('fetching', false)
          .update('lastFetchSignature', lastFetchSignature => ({
            ...lastFetchSignature,
            fetchIds: action.meta.lastFetchSignature
          }))
          .update('pagination', pagination => {   // eslint-disable-line arrow-body-style
            return action.meta.pagination ? new Pagination({
              ...pagination.toObject(),
              total: action.meta.pagination.total,
              totalPages: Math.ceil(action.meta.pagination.total / pagination.toObject().perPage)
            }) : pagination
          })

      case actionTypes.fetchCollectionError:
        return state.set('items', List([]))
          .set('fetching', false)
          .update('lastFetchSignature', lastFetchSignature => ({ ...lastFetchSignature, fetchCollection: '' }))

      case actionTypes.fetchOneSuccess:
        return state.set('item', itemTransformer(action.data))
          .set('fetching', false)
          .update('lastFetchSignature', lastFetchSignature => ({
            ...lastFetchSignature,
            fetchOne: action.meta.lastFetchSignature
          }))

      case actionTypes.fetchOneError:
        return state.set('item', {})
          .set('fetching', false)
          .update('lastFetchSignature', lastFetchSignature => ({ ...lastFetchSignature, fetchOne: '' }))

      case actionTypes.createSuccess:
      case actionTypes.updateSuccess:
      case actionTypes.createError:
      case actionTypes.updateError:
        return state.set('fetching', false)

      default:
        return state
    }
  }
}
