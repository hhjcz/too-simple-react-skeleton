/**
 * Created by hhj on 20.12.15.
 */
import {List, Record} from 'immutable'

import * as actions from './actions'
import {setList} from './core'
import {Pagination, nextPage, gotoPage} from './pagination'
import {Zarizeni} from '../zarizeni/core'

export const InitialState = Record({
  fetching: false,
  seznamZarizeni: List(),
  pagination: new Pagination(),
})
const initialState = new InitialState

// Note how JSON from server is revived to immutable record.
const revive = ({fetching, seznamZarizeni, pagination}) => initialState.merge({
  fetching,
  seznamZarizeni: List(seznamZarizeni).map(z => new Zarizeni(z)),
  pagination: new Pagination(pagination),
});

export default function reducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return revive(state)

  switch (action.type) {
    case actions.FETCH_LIST_REQUEST:
      return state.update('fetching', () => true)

    case actions.FETCH_LIST_SUCCESS:
      return setList(state, action.seznamZarizeni)
        .update('fetching', () => false)
        .update('pagination', () => (new Pagination({
          page: action.pagination.current_page,
          perPage: action.pagination.per_page,
          total: action.pagination.total,
          totalPages: action.pagination.total_pages
        })))

    case actions.SET_LIST:
      return setList(state, action.seznamZarizeni)

    case actions.SET_PAGINATION:
      return state.update('pagination', () => action.pagination)

    case actions.GOTO_PAGE:
      console.log('Go to page: ', action.page)
      return state.update('pagination', (pagination) => gotoPage(pagination, action.page))

    case actions.NEXT_PAGE:
      return state.update('pagination', (pagination) => nextPage(pagination))

    default:
      return state
  }

  return state
}
