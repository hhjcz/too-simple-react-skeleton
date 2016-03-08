/** Created by hhj on 2/24/16. */
import { expect } from 'chai'
import rest from '../rest'

describe('app rest', () => {

  it('should define rest actions', () => {
    expect(typeof rest.actions).to.equal('object')
  })

})
