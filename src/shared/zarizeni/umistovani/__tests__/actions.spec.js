/** Created by hhj on 3/22/16. */
/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import actions from '../actions'

describe('umistovani actions', () => {

  it('should export actions', () => {
    expect(typeof actions).to.equal('object')
    expect(actions.umisteni).to.be.defined
  })

})
