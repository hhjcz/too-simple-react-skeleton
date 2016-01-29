/** Created by hhj on 20.12.15. */
import { expect } from 'chai'
import { List } from 'immutable'
import { Pagination } from '../pagination'
import { Sort } from '../sort'
import * as actions from '../actions'
import reducer, { InitialState } from '../reducer'

describe('zarizeni-list reducer', () => {

  const initialState = new InitialState({
    pagination: new Pagination({ page: 1, perPage: 666, total: 6666, totalPages: 3 }),
    seznamZarizeni: List.of(),
    sort: new Sort()
  })

  //it('should handle fetch REQUEST', () => {
  //  expect(initialState.get('fetching')).to.equal(false)
  //
  //  const nextState = reducer(initialState, { type: actions.FETCH_LIST_REQUEST })
  //
  //  expect(nextState.get('fetching')).to.equal(true)
  //  expect(initialState.get('fetching')).to.equal(false)
  //})
  //
  //it('should handle fetch SUCCESS', () => {
  //  const state = reducer(initialState, { type: actions.FETCH_LIST_REQUEST })
  //  expect(state.get('fetching')).to.equal(true)
  //
  //  const nextState = reducer(
  //    state,
  //    { type: actions.FETCH_LIST_SUCCESS, data: [], meta: {} }
  //  )
  //
  //  expect(nextState.get('fetching')).to.equal(false)
  //  expect(state.get('fetching')).to.equal(true)
  //})

  it('should handle SET_PAGINATION', () => {
    const pagination = new Pagination({ page: 6, perPage: 66, total: 6666, totalPages: 666 })
    const nextState = reducer(undefined, { type: actions.SET_PAGINATION, pagination })
    expect(nextState.get('pagination')).to.equal(pagination)
  })

  it('should handle GOTO_PAGE', () => {
    const nextState = reducer(initialState, { type: actions.GOTO_PAGE, page: 3 })
    expect(nextState).to.equal(new InitialState({
      pagination: new Pagination({ page: 3, perPage: 666, total: 6666, totalPages: 3 }),
      seznamZarizeni: initialState.get('seznamZarizeni')
    }))
    expect(initialState).to.equal(new InitialState({
      pagination: new Pagination({ page: 1, perPage: 666, total: 6666, totalPages: 3 }),
      seznamZarizeni: List.of()
    }))
  })

  it('should handle SORT_CHANGE', () => {
    const nextState = reducer(initialState, { type: actions.SORT_CHANGE, sortField: 'someColumn' })
    expect(nextState.sort.by).to.equal('someColumn')
    expect(nextState.sort.dir).to.equal(false)

    // assert immutability
    expect(initialState).to.equal(new InitialState({
      pagination: new Pagination({ page: 1, perPage: 666, total: 6666, totalPages: 3 }),
      seznamZarizeni: List.of(),
      sort: new Sort()
    }))
  })

  it('should reverse sort direction', () => {
    const state = reducer(initialState, { type: actions.SORT_CHANGE, sortField: 'someColumn' })
    expect(state.sort.by).to.equal('someColumn')
    expect(state.sort.dir).to.equal(false)
    const nextState = reducer(state, { type: actions.SORT_CHANGE, sortField: 'someColumn' })
    expect(nextState.sort.by).to.equal('someColumn')
    expect(nextState.sort.dir).to.equal(true)

  })

})
