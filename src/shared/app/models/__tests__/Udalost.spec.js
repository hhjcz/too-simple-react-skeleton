/** Created by hhj on 3/11/16. */
/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import { Udalost } from '../Udalost'

describe('app models NepiOp', () => {

  it('should instantiate', () => {
    const nepiOp = new Udalost()
    expect(nepiOp).to.be.instanceOf(Udalost)
  })

})
