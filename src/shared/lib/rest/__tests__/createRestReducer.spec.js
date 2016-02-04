/** Created by hhj on 2/1/16. */
import { expect } from 'chai'
import createRestReducer from '../createRestReducer'

describe('createRestReducer', () => {

  it('should create reducer', () => {
    const reducer = createRestReducer('someEndpoint', { url: 'someUrl' })
    const initialState = reducer({})
  })

  it('some testing', () => {
    const reducer = createRestReducer('someEndpoint', { url: 'someUrl' })
    const reducer2 = createRestReducer('someEndpoint2', { url: 'someUrl2' })
    console.log(reducer)
    console.log(reducer2)
    console.log(reducer === reducer2)
    const initialState = reducer({})
  })

})
