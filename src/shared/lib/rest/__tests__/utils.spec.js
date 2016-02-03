/** Created by hhj on 1/29/16. */
import { expect } from 'chai'
import { getSubState } from '../utils'

describe('fetch utils', () => {

  it('should get this substate using function', () => {
    const subState = { someVariable: 'someValue' }
    const getState = () => ({ someSubState: subState })
    const getThisSubState = getSubState('someSubState')
    expect(getThisSubState(getState)).to.equal(subState)
  })

  it('should get this substate from object', () => {
    const subState = { someVariable: 'someValue' }
    const getState = { someSubState: subState }
    const getThisSubState = getSubState('someSubState')
    expect(getThisSubState(getState)).to.equal(subState)
  })
})
