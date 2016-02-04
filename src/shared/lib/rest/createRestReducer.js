/** Created by hhj on 1/29/16. */
import { getActionBasename } from './utils'
import { Pagination } from '../../zarizeni-list/pagination'
import { Sort } from '../../zarizeni-list/sort'
import { List, Record, Map } from 'immutable'

const InitialState = Record({
  fetching: false,
  lastFetchMark: null,
  items: List(),
  item: {},
  pagination: new Pagination(),
  sort: new Sort(),
  filters: Map()
})

export default function createRestReducer(endpointName, config = {}, actionTypes = {}) {
  const itemTransformer = config.itemTransformer || (item => item)

  const initialState = new InitialState

  // Note how JSON from server is revived to immutable record.
  /* eslint-disable arrow-body-style */
  const revive = ({ fetching, lastFetchMark, items, item, pagination, sort, filters }) => {
    return initialState.merge({
      fetching,
      lastFetchMark,
      items: List(items).map(itemTransformer),
      item: itemTransformer(item),
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
      case actionTypes.fetchOneRequested:
        return state
          .update('fetching', () => true)

      case actionTypes.fetchAllSuccess:
        return state.set('items', List(action.data).map(itemTransformer))
          .set('fetching', false)
          .set('lastFetchMark', action.meta.lastFetchMark)
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
          .set('lastFetchMark', '')

      case actionTypes.fetchOneSuccess:
        return state.set('item', itemTransformer(action.data))
          .set('fetching', false)
          .set('lastFetchMark', action.meta.lastFetchMark)

      case actionTypes.fetchOneError:
        return state.set('item', {})
          .set('fetching', false)
          .set('queryParams', '')


      default:
        return state
    }
  }
}
