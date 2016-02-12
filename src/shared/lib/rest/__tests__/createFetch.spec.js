/** Created by hhj on 2/12/16. */
import { expect } from 'chai'
import createFetch from '../createFetch'

describe('myRest library createFetch', () => {

  it('should create fetch', (done) => {
    const fetch = createFetch('someBaseUrl')
    expect(typeof fetch).to.equal('function')

    const promise = fetch('someUrl')
    return promise
      .catch(error => {
        expect(error).to.be.instanceOf(Error)
        done()
      })
  })

})
