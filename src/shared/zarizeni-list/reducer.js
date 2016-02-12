/** Created by hhj on 20.12.15. */
import actions from './actions'
import { Pagination, setPage, setPageSize } from './pagination'
import { Sort } from './sort'
import rest from '../app/rest'

export default function reducer(state = {}, action) {

  state = rest.reducers.zarizeni(state, action)
  if (!action) return state

  switch (action.type) {

    case actions.SET_PAGINATION:
      return state.update('pagination', () => action.pagination)

    case actions.GOTO_PAGE:
      return state.update('pagination', pagination => setPage(pagination, action.page))

    case actions.SET_PAGE_SIZE:
      return state.update('pagination', pagination => setPageSize(pagination, action.perPage))

    case actions.SORT_CHANGE:
      let dir = state.sort.dir === true
      if (state.sort.by === action.sortField) dir = !dir
      return state.update('sort', () => new Sort({ dir, by: action.sortField }))

    case actions.FILTER_CHANGE:
      return state.update('filters', filters => {
        if (action.filter.value === '') return filters.delete(action.filter.name)
        return filters.set(action.filter.name, action.filter)
      })

    default:
      return state
  }

  return state
}
