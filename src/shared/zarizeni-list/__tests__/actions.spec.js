/** Created by hhj on 1/26/16. */
/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import { Record, List } from 'immutable'
import rest from '../../app/rest'
import { generateSubState } from '../../lib/rest/utils'
import reducer from '../reducer'
import * as actions from '../actions'

describe('zarizeni-list actions', () => {

  let state
  const nullResponse = {}
  const zarizeni = { pagination: {}, ids: List() }
  zarizeni.toObject = () => zarizeni

  const fetch = () => Promise.resolve({ nullResponse })

  const getState = () => generateSubState({ zarizeni })

  const dispatch = action => {
    if (typeof action === 'function') return action({ dispatch, getState })
    const initialState = reducer(getState())
    state = reducer(initialState, action)

    return action
  }

  rest.use('fetch', fetch)
  rest.use('dispatch', dispatch)

  describe('fetchList', () => {

    it('should handle null response', () =>
      dispatch(actions.fetchCollection()).then(() => {
        expect(state).to.be.instanceOf(Record)
        expect(state.items).to.be.instanceOf(List)
        expect(state.fetching).to.be.false
      })
    )
  })

  describe('fetchOneAt', () => {
    it('should dispatch', () =>
      dispatch(actions.fetchOneAt(666))
    )
  })

  describe('gotoPage', () => {
    it('should dispatch', () =>
      dispatch(actions.gotoPage(666))
    )
  })

  describe('setPageSize', () => {
    it('should dispatch', () =>
      dispatch(actions.setPageSize(66))
    )
  })

  describe('sortChange', () => {
    it('should dispatch', () =>
      dispatch(actions.sortChange('id'))
    )
  })

  describe('filterChange', () => {
    it('should dispatch', () =>
      dispatch(actions.filterChange({}))
    )
  })

  describe('generalParamChange', () => {
    it('should dispatch', () =>
      dispatch(actions.generalParamChange({}))
    )
  })

})
