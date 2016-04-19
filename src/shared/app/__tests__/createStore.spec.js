/** Created by hhj on 4/19/16. */
/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import createStore from '../createStore'

describe('app createStore', () => {

  it('should create store', () => {
    const store = createStore()
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

})
