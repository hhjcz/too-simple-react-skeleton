/** Created by hhj on 2/3/16. */
import { expect } from 'chai'
import { actionTypesFor } from '../actionTypesFor'

describe('actionTypesFor', () => {

  it('should generate action types', () => {
    const actionTypes = actionTypesFor('someResource')
    expect(typeof actionTypes.fetchIdsRequested).to.equal('string')
    expect(typeof actionTypes.fetchCollectionRequested).to.equal('string')
    expect(typeof actionTypes.fetchCollectionByIdsRequested).to.equal('string')
    expect(typeof actionTypes.fetchOneRequested).to.equal('string')
    expect(typeof actionTypes.createSuccess).to.equal('string')
    expect(typeof actionTypes.updateError).to.equal('string')
    expect(typeof actionTypes.destroySuccess).to.equal('string')
  })

})
