/** Created by hhj on 4/21/16. */
// noinspection JSUnresolvedVariable
import { expect } from 'chai'
import Port from '../Port'

describe('app model PortZarizeni', () => {

  it('should instantiate', () => {
    const port = new Port({ id: 5, name: 'someName', infoName: 'someInfoName' })
    expect(port).to.be.instanceOf(Port)
    expect(port.id).to.equal(5)
    expect(port.name).to.equal('someName')
    expect(port.infoName).to.equal('someInfoName')
  })

})
