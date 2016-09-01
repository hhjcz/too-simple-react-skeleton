/** Created by hhj on 2/24/16. */
import { expect } from 'chai'
import rest from '../rest'

describe('app rest', () => {

  it('returns rest actions', () => {
    expect(typeof rest.actions).to.equal('object')
  })

  it('returns rest reducers', () => {
    expect(typeof rest.reducer).to.equal('function')
  })

  it('returns selectResourcesRoot selector', () => {
    expect(typeof rest.selectResourcesRoot).to.equal('function')
  })

  it('returns selectResource selector', () => {
    expect(typeof rest.selectResource).to.equal('function')
  })

})
