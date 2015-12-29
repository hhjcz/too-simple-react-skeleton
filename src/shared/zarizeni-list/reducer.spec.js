/**
 * Created by hhj on 20.12.15.
 */
import {expect} from 'chai'
import {Map, List, Record} from 'immutable'
import {Zarizeni} from '../zarizeni/core'
import {Pagination} from './pagination'
import * as actions from './actions'
import reducer, {InitialState} from './reducer'

describe('reducer', () => {

  const initialState = new InitialState({
    pagination: new Pagination({page: 1, perPage: 666, total: 6666, totalPages: 3}),
    seznamZarizeni: List.of()
  })

  it('should handle SET_LIST', () => {
    const seznamZarizeni = List.of(new Zarizeni({id: 1}), new Zarizeni({id: 2}))
    const nextState = reducer(initialState, {type: actions.SET_LIST, seznamZarizeni: seznamZarizeni})

    expect(nextState.get('seznamZarizeni')).to.equal(
      List.of(new Zarizeni({id: 1}), new Zarizeni({id: 2}))
    )
  })

  it('should handle SET_PAGINATION', () => {
    const pagination = new Pagination({page: 6, perPage: 66, total: 6666, totalPages: 666})
    const nextState = reducer(undefined, {type: actions.SET_PAGINATION, pagination: pagination})
    expect(nextState.get('pagination')).to.equal(pagination)
  })

  it('should handle GOTO_PAGE', () => {
    const nextState = reducer(initialState, {type: actions.GOTO_PAGE, page: 3})
    expect(nextState).to.equal(new InitialState({
      pagination: new Pagination({page: 3, perPage: 666, total: 6666, totalPages: 3}),
      seznamZarizeni: initialState.get('seznamZarizeni')
    }))
    expect(initialState).to.equal(new InitialState({
      pagination: new Pagination({page: 1, perPage: 666, total: 6666, totalPages: 3}),
      seznamZarizeni: List.of()
    }))
  })

  it('should handle NEXT_PAGE', () => {
    const nextState = reducer(initialState, {type: actions.NEXT_PAGE})
    expect(nextState).to.equal(new InitialState({
      pagination: new Pagination({page: 2, perPage: 666, total: 6666, totalPages: 3}),
      seznamZarizeni: initialState.get('seznamZarizeni')
    }))
    expect(initialState).to.equal(new InitialState({
      pagination: new Pagination({page: 1, perPage: 666, total: 6666, totalPages: 3}),
      seznamZarizeni: List.of()
    }))
  })

  it('sets initial state', () => {
    const nextState = reducer(undefined, {type: actions.SET_LIST, seznamZarizeni: List.of(new Zarizeni({id: 66}))})
    expect(nextState).to.equal(new InitialState({
      pagination: new Pagination({page: 1, perPage: 10, totalPages: 1}),
      seznamZarizeni: List.of(new Zarizeni({id: 66}))
    }))
  })

})
