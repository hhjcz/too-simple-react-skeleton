/** Created by hhj on 2/18/16. */
import { expect } from 'chai'

import Zarizeni, { ZarizeniFactory } from '../Zarizeni'

describe('Zarizeni factory', () => {

  it('should create Zarizeni', () => {
    const zarizeni = ZarizeniFactory({ id: 666, name: 'someName' })
    expect(zarizeni).to.be.instanceOf(Zarizeni)
    expect(zarizeni.id).to.equal(666)
    expect(zarizeni.name).to.equal('someName')
    expect(zarizeni.defaultmap).to.equal('')

    const zarizeni2 = ZarizeniFactory({ id: 777, name: 'someOtherName' })
    expect(zarizeni2).to.be.instanceOf(Zarizeni)
    expect(zarizeni2.id).to.equal(777)
    expect(zarizeni2.name).to.equal('someOtherName')
    expect(zarizeni2.defaultmap).to.equal('')
  })

  it('should set defaultmap', () => {
    const zarizeni = ZarizeniFactory({
      id: 666,
      name: 'someName',
      netvisionZarizeni: { id: 777, defaultmap: 'someMap' }
    })
    expect(zarizeni).to.be.instanceOf(Zarizeni)
    expect(zarizeni.id).to.equal(666)
    expect(zarizeni.netvisionZarizeni.id).to.equal(777)
    expect(zarizeni.defaultmap).to.equal('someMap')
    expect(zarizeni.defaultmap).to.equal(zarizeni.netvisionZarizeni.defaultmap)
  })

})
