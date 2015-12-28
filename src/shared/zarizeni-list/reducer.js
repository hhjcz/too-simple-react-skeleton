/**
 * Created by hhj on 20.12.15.
 */
import {List, Map} from 'immutable'
import * as actions from './actions'
import {setList} from './core'
import {Pagination, nextPage, previousPage} from './pagination'

export const initialState = Map({
  pagination: new Pagination({page: 1, perPage: 10, totalPages: 1}),
  seznamZarizeni: List.of()
})

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.FETCH_LIST_SUCCESS:
      return setList(state, action.seznamZarizeni).update('pagination', () => (new Pagination({
        page: action.pagination.current_page,
        perPage: action.pagination.per_page,
        total: action.pagination.total,
        totalPages: action.pagination.total_pages
      })))

    case actions.SET_LIST:
      return setList(state, action.seznamZarizeni)

    case actions.SET_PAGINATION:
      return state.update('pagination', () => action.pagination)

    case actions.NEXT_PAGE:
      return state.update('pagination', (pagination) => nextPage(pagination))
  }

  return state
}
