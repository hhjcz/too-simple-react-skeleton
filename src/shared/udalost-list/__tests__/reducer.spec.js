/** Created by hhj on 20.12.15. */
import { expect } from 'chai'
import reducer from '../reducer'

describe('udalost-list reducer', () => {
  it('should be function', () => {
    const initialState = reducer({})
    expect(typeof initialState).to.equal('object')
  })
})
