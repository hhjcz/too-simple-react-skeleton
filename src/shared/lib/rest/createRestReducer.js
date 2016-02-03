/** Created by hhj on 1/29/16. */
import { getActionBasename } from './utils'
import { Pagination } from '../../zarizeni-list/pagination'
import { Sort } from '../../zarizeni-list/sort'
import { List, Record, Map } from 'immutable'

const InitialState = Record({
  fetching: false,
  queryParams: null,
  items: List(),
  pagination: new Pagination(),
  sort: new Sort(),
  filters: Map()
})

export default function createRestReducer(endpointName, config = {}, actionTypes = {}) {
  const itemTransformer = config.itemTransformer || (item => item)

  const initialState = new InitialState

  // Note how JSON from server is revived to immutable record.
  /* eslint-disable arrow-body-style */
  const revive = ({ fetching, queryParams, items, pagination, sort, filters }) => {
    return initialState.merge({
      fetching,
      queryParams,
      items: List(items).map(itemTransformer),
      pagination: new Pagination(pagination),
      sort: new Sort(sort),
      filters: Map(filters)
    });
  }
  /* eslint-enable arrow-body-style */

  return function reducer(state, action) {
    if (!(state instanceof InitialState)) return revive(state)

    switch (action.type) {
      case actionTypes.fetchAllRequested:
        return state
          .update('fetching', () => true)

      case actionTypes.fetchAllSuccess:
        return state.set('items', List(action.data).map(itemTransformer))
          .set('fetching', false)
          .set('queryParams', action.meta.queryParams)
          .update('pagination', pagination =>
            action.meta.pagination
              ? new Pagination({ ...pagination, ...action.meta.pagination, })
              : pagination
          )
          .update('sort', sort =>
            action.meta.sort
              ? new Sort(action.meta.sort)
              : sort
          )

      case actionTypes.fetchAllError:
        return state.set('items', List([]))
          .set('fetching', false)
          .set('queryParams', '')

      default:
        return state
    }
  }
}