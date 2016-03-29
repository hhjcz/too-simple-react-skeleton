/** Created by hhj on 2/17/16. */
/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import { Lokalita } from '../Lokalita'

describe('umisteni class Lokalita', () => {

  it('should instantiate', () => {
    const lokalita = new Lokalita({ id: 666 })
    expect(lokalita).to.be.instanceOf(Lokalita)
  })

})
