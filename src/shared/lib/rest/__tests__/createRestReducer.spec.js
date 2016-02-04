/** Created by hhj on 2/1/16. */
import { expect } from 'chai'
import createRestReducer from '../createRestReducer'

describe('createRestReducer', () => {

  it('should create reducer', () => {
    const reducer = createRestReducer('someEndpoint', { url: 'someUrl' })
    const initialState = reducer({})
  })

})
