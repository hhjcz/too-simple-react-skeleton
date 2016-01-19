/** Created by hhj on 20.12.15. */
import { List, Record } from 'immutable'

import * as actions from './actions'
import { setList } from './core'
import { Pagination, setPage, setPageSize } from './pagination'
import { Sort } from './sort'
import { Zarizeni } from '../zarizeni/core'

export const InitialState = Record({
  fetching: false,
  queryParams: null,
  seznamZarizeni: List(),
  pagination: new Pagination(),
  sort: new Sort()
})
const initialState = new InitialState

// Note how JSON from server is revived to immutable record.
const revive = ({ fetching, queryParams, seznamZarizeni, pagination, sort }) => initialState.merge({
  fetching,
  queryParams,
  seznamZarizeni: List(seznamZarizeni).map(z => new Zarizeni(z)),
  pagination: new Pagination(pagination),
  sort: new Sort(sort)
});

export default function reducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return revive(state)

  switch (action.type) {
    case actions.FETCH_LIST_REQUEST:
      return state
        .update('fetching', () => true)
    // .update('pagination', (pagination) => new Pagination({ ...pagination.toObject(), ...action.pagination }))

    case actions.FETCH_LIST_SUCCESS:
      return setList(state, action.seznamZarizeni)
        .update('fetching', () => false)
        .update('queryParams', () => action.queryParams)
        .update('pagination', () => new Pagination({ ...action.pagination, page: action.pagination.currentPage }))
        .update('sort', () => new Sort(action.sort))

    case actions.FETCH_LIST_ERROR:
      return setList(state, [])
        .update('fetching', () => false)

    case actions.SET_LIST:
      return setList(state, action.seznamZarizeni)

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

    default:
      return state
  }

  return state
}
