/** Created by hhj on 2/11/16. */
import { expect } from 'chai'
import createResource from '../createResource'

describe('myRest library createResource', () => {

  it('should create resource', () => {
    const resource = createResource('someResource')
    expect(typeof resource).to.equal('object')
    expect(typeof resource.fetchAll).to.equal('function')
  })

  it('should return promise', () => {
    const fetch = () => Promise.resolve({})
    const resource = createResource('someResource', {}, { fetch })
    const promise = resource.fetchOne({}).executeFetch()

    return Promise.all([
      promise.should.be.resolved,
      promise.should.eventually.have.property('data'),
      promise.should.eventually.have.property('meta'),
    ])
  })

  it('should throw error', () => {
    const fetch = () => Promise.reject('Nejaka chyba api')
    const resource = createResource('someResource', {}, { fetch })
    const promise = resource.fetchOne({}).executeFetch()

    return promise.should.be.rejectedWith(Error)
  })

})
