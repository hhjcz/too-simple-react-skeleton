/** Created by hhj on 20.12.15. */
/* eslint-disable no-case-declarations */
import * as actions from './actions'
import { Pagination, setPage, setPageSize } from './../app/models/Pagination'
import { Sort } from './../app/models/Sort'
import rest from '../app/rest'

export default function reducer(state = {}, action) {

  state = rest.reducers.zarizeni(state, action)
  if (!action) return state

  switch (action.type) {

    case actions.SET_PAGINATION:
      return state.update('pagination', () => action.pagination)

    case actions.GOTO_PAGE:
      return state.update('pagination', pagination => setPage(pagination, action.page))

    case actions.POINT_CURSOR_TO:
      const page = Math.ceil(action.cursorAt / state.pagination.perPage)
      return state.update('pagination', pagination => new Pagination({
        ...pagination.toObject(),
        cursorAt: action.cursorAt,
        page,
      }))

    case actions.SET_PAGE_SIZE:
      return state.update('pagination', pagination => setPageSize(pagination, action.perPage))

    case actions.SORT_CHANGE:
      let dir = state.sort.dir === true
      if (state.sort.by === action.sortField) dir = !dir
      return state.update('sort', () => new Sort({ dir, by: action.sortField }))

    case actions.FILTER_CHANGE:
      return state.update('filters', filters => {
        if (action.filter.value === '' || action.filter.value === null) {
          return filters.delete(action.filter.name)
        }
        return filters.set(action.filter.name, action.filter)
      })

    case actions.GENERAL_PARAM_CHANGE:
      return state.update('generalParams', generalParams => {
        if (action.paramObj.value === '') return generalParams.delete(action.paramObj.name)
        return generalParams.set(action.paramObj.name, action.paramObj.value)
      })

    default:
      return state
  }
}
