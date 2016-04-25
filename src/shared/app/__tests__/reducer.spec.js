/** Created by hhj on 2/24/16. */
import { expect } from 'chai'
import reducer from '../reducer'

describe('app reducer', () => {

  it('should define reducer function', () => {
    expect(typeof reducer).to.equal('function')
  })

  it('should reduce', () => {
    const nextState = reducer({}, {})
    expect(typeof nextState).to.equal('object')
  })

})
