/** Created by hhj on 2/17/16. */
// noinspection JSUnresolvedVariable
import { expect } from 'chai'
import Umisteni, { UmisteniFactory } from '../Umisteni'
import { Lokalita } from '../Lokalita'

describe('umisteni class Umistovani', () => {

  it('should instantiate', () => {
    const umisteni = UmisteniFactory({ id: 5, lokalita: { id: 6, ulice: 'nejakaUlice' } })
    expect(umisteni).to.be.instanceOf(Umisteni)
    expect(umisteni.lokalita).to.be.instanceOf(Lokalita)
    expect(umisteni.id).to.equal(5)
    expect(umisteni.lokalita.id).to.equal(6)
    expect(umisteni.lokalita.ulice).to.equal('nejakaUlice')
  })

})
