/** Created by hhj on 2/1/16. */
import { expect } from 'chai'
import createRestReducer from '../createRestReducer'
import { InitialState } from '../reduceHelpers'

describe('createRestReducer', () => {

  it('should create reducer', () => {
    const reducer = createRestReducer('someEndpoint', { url: 'someUrl' })
    const initialState = reducer({})
    expect(initialState).to.be.instanceOf(InitialState)
  })

  it('should handle empty action', () => {
    const reducer = createRestReducer('someEndpoint', { url: 'someUrl' })
    const initialState = reducer({})
    const state = reducer(initialState, {})
    expect(state).to.be.instanceOf(InitialState)
  })

})
