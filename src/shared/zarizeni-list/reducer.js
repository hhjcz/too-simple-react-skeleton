/** Created by hhj on 20.12.15. */
import { List, Record, Map } from 'immutable'

import * as actions from './actions'
import { Pagination, setPage, setPageSize } from './pagination'
import { Sort } from './sort'
import { Zarizeni } from '../zarizeni/core'
import rest from '../app/rest'

export const InitialState = Record({
  fetching: false,
  queryParams: null,
  seznamZarizeni: List(),
  pagination: new Pagination(),
  sort: new Sort(),
  filters: Map()
})
const initialState = new InitialState

// Note how JSON from server is revived to immutable record.
/* eslint-disable arrow-body-style */
const revive = ({ fetching, queryParams, seznamZarizeni, pagination, sort, filters }) => {
  return initialState.merge({
    fetching,
    queryParams,
    seznamZarizeni: List(seznamZarizeni).map(z => new Zarizeni(z)),
    pagination: new Pagination(pagination),
    sort: new Sort(sort),
    filters: Map(filters)
  });
}
/* eslint-enable arrow-body-style */

export default function reducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return revive(state)

  state = rest.reducers.zarizeniList(state, action)

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
