/** Created by hhj on 1/29/16. */
/* eslint-disable max-len */
import { Pagination } from '../../app/models/Pagination'
import { Sort } from '../../app/models/Sort'
import { List, Record, Map } from 'immutable'

export const InitialState = Record({
  fetching: false,
  lastFetchMark: { fetchAll: null, fetchOne: null },
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
  const revive = ({ fetching, lastFetchMark, items, item, pagination, sort, filters, generalParams }) => {
    const mergeObj = {
      fetching,
      lastFetchMark,
    }
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

    switch (action.type) {
      case actionTypes.fetchAllRequested:
      case actionTypes.fetchOneRequested:
      case actionTypes.createRequested:
      case actionTypes.updateRequested:
        return state.set('fetching', true)

      case actionTypes.fetchAllSuccess:
        return state.set('items', List(action.data).map(itemTransformer))
          .set('fetching', false)
          .update('lastFetchMark', lastFetchMark => ({ ...lastFetchMark, fetchAll: action.meta.lastFetchMark }))
          .update('pagination', pagination => {   // eslint-disable-line arrow-body-style
            return action.meta.pagination
              ? new Pagination({ ...pagination.toObject(), ...action.meta.pagination })
              : pagination
          })
          .update('sort', sort => {   // eslint-disable-line arrow-body-style
            return action.meta.sort
              ? new Sort(action.meta.sort)
              : sort
          })

      case actionTypes.fetchAllError:
        return state.set('items', List([]))
          .set('fetching', false)
          .update('lastFetchMark', lastFetchMark => ({ ...lastFetchMark, fetchAll: '' }))

      case actionTypes.fetchOneSuccess:
        return state.set('item', itemTransformer(action.data))
          .set('fetching', false)
          .update('lastFetchMark', lastFetchMark => ({ ...lastFetchMark, fetchOne: action.meta.lastFetchMark }))

      case actionTypes.fetchOneError:
        return state.set('item', {})
          .set('fetching', false)
          .update('lastFetchMark', lastFetchMark => ({ ...lastFetchMark, fetchOne: '' }))

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
