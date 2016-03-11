/** Created by hhj on 3/11/16. */
/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import NepiOp from '../NepiOp'

describe('app models NepiOp', () => {

  it('should instantiate', () => {
    const nepiOp = new NepiOp()
    expect(nepiOp).to.be.instanceOf(NepiOp)
  })

})
