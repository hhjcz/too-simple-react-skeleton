/** Created by hhj on 2/3/16. */
import { expect } from 'chai'
import { actionTypesFor } from '../actionTypesFor'
import { actionCreatorsFor } from '../actionCreatorsFor'

describe('actionCreatorsFor', () => {

  let actionTypes
  let actionCreators

  beforeEach(() => {
    actionTypes = actionTypesFor('someResource')
    actionCreators = actionCreatorsFor(actionTypes)
  })

  it('should create action creators', () => {
    expect(typeof actionCreators.fetchCollectionRequested).to.equal('function')
    expect(typeof actionCreators.fetchCollectionSuccess).to.equal('function')
    expect(typeof actionCreators.fetchCollectionError).to.equal('function')
  })

  it('should create valid action creators', () => {
    expect(actionCreators.fetchCollectionRequested().type)
      .to.equal(actionTypes.fetchCollectionRequested)
    expect(actionCreators.fetchCollectionSuccess().type)
      .to.equal(actionTypes.fetchCollectionSuccess)
    expect(actionCreators.fetchCollectionError().type)
      .to.equal(actionTypes.fetchCollectionError)
  })

})
