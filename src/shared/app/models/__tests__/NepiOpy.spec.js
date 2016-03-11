/** Created by hhj on 3/11/16. */
/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import { List } from 'immutable'
import { NepiOpyFactory } from '../NepiOpy'
import NepiOp from '../NepiOp'

describe('app models NepiOpy', () => {

  it('should instantiate', () => {
    const nepiOpy = NepiOpyFactory()
    expect(nepiOpy).to.be.instanceOf(List)
  })

  it('should contain instances of nepiOp', () => {
    const nepiOpy = NepiOpyFactory([{ ixop: 66 }, { ixop: 666 }])
    expect(nepiOpy).to.be.instanceOf(List)
    nepiOpy.forEach(nepiOp => {
      expect(nepiOp).to.be.instanceOf(NepiOp)
    })
  })

})
