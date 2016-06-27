/** Created by hhj on 2/17/16. */
/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import { Cp2Type } from '../Cp2Type'

describe('app models Cp2Type', () => {

  it('should instantiate', () => {
    const cp2Type = new Cp2Type({ id: 666 })
    expect(cp2Type).to.be.instanceOf(Cp2Type)
  })

})
