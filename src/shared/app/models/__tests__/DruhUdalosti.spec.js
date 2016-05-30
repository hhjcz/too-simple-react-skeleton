/** Created by hhj on 3/11/16. */
/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import { DruhUdalosti } from '../DruhUdalosti'

describe('app models NepiOp', () => {

  it('should instantiate', () => {
    const nepiOp = new DruhUdalosti()
    expect(nepiOp).to.be.instanceOf(DruhUdalosti)
  })

})
