/** Created by hhj on 2/3/16. */
import { expect } from 'chai'
import actionTypesFor from '../actionTypesFor'
import actionCreatorsFor from '../actionCreatorsFor'

describe('actionCreatorsFor', () => {

  let actionTypes
  let actionCreators

  beforeEach(() => {
    actionTypes = actionTypesFor('someResource')
    actionCreators = actionCreatorsFor(actionTypes)
  })

  it('should create action creators', () => {
    expect(typeof actionCreators.fetchAllRequested).to.equal('function')
    expect(typeof actionCreators.fetchAllSuccess).to.equal('function')
    expect(typeof actionCreators.fetchAllError).to.equal('function')
  })

  it('should create valid action creators', () => {
    expect(actionCreators.fetchAllRequested().type).to.equal(actionTypes.fetchAllRequested)
    expect(actionCreators.fetchAllSuccess().type).to.equal(actionTypes.fetchAllSuccess)
    expect(actionCreators.fetchAllError().type).to.equal(actionTypes.fetchAllError)
  })

})
