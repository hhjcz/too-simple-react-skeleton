/** Created by hhj on 2/3/16. */
import { expect } from 'chai'
import actionTypesFor from '../actionTypesFor'

describe('actionTypesFor', () => {

  it('should generate action types', () => {
    const actionTypes = actionTypesFor('someResource')
    expect(typeof actionTypes.fetchAllRequested).to.equal('string')
    expect(typeof actionTypes.fetchOneRequested).to.equal('string')
    expect(typeof actionTypes.createSuccess).to.equal('string')
    expect(typeof actionTypes.updateError).to.equal('string')
    expect(typeof actionTypes.destroySuccess).to.equal('string')
  })

})
