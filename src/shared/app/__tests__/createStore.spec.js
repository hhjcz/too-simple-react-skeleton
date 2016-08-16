/** Created by hhj on 4/19/16. */
/* eslint-disable no-unused-expressions, no-unused-vars, import/no-extraneous-dependencies */
import { expect } from 'chai'
import createStore, { getStore } from '../createStore'

describe('app createStore', () => {

  it('should create default store', () => {
    const store = createStore()
    expect(typeof store.dispatch).to.equal('function')
    expect(typeof store.getState).to.equal('function')
  })

  it('should create store with initial state', () => {
    const store = createStore({}, null)
    expect(typeof store.dispatch).to.equal('function')
    expect(typeof store.getState).to.equal('function')
  })

  describe('store getState', () => {
    it('returns state', () => {
      const store = createStore()
      expect(typeof store.getState()).to.equal('object')
    })
  })

  describe('store dispatch', () => {
    it('dispatches plain action', () => {
      const store = createStore()
      const action = { type: 'SOME_ACTION' }
      expect(store.dispatch(action)).to.equal(action)
    })
  })

  describe('store getStore', () => {
    it('returns store', () => {
      const store = createStore()
      expect(getStore()).to.equal(store)
    })
  })

})
