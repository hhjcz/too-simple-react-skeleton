/** Created by hhj on 2/11/16. */
import { expect } from 'chai'
import createResource from '../createResource'

describe('myRest library createResource', () => {

  it('should create resource', () => {
    const resource = createResource('someResource')
    expect(typeof resource).to.equal('object')
    expect(typeof resource.fetchCollection).to.equal('function')
  })

  it('should return proper response as a promise', () => {
    const fetch = () => Promise.resolve({})
    const resource = createResource('someResource', {}, { fetch })
    return resource.fetchOne({}).executeFetch().then(response => {
      expect(response).to.have.property('data')
      expect(response).to.have.property('meta')
    })

    // return Promise.all([
    //   promise.should.be.resolved,
    //   promise.should.eventually.have.property('data'),
    //   promise.should.eventually.have.property('meta'),
    // ])
  })

  it('should throw error', () => {
    const fetch = () => Promise.reject('Nejaka chyba api')
    const resource = createResource('someResource', {}, { fetch })
    return resource.fetchOne({}).executeFetch().catch(error => {
      expect(error).to.be.instanceOf(Error)
    })

    // return promise.should.be.rejectedWith(Error)
  })

})
