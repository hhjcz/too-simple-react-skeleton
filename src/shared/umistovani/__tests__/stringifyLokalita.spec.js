/** Created by hhj on 3/17/16. */
/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import { stringifyLokalita } from '../stringifyLokalita'
import { Lokalita } from '../../app/models/Lokalita'

describe('umistovani stringifyLokalita', () => {

  it('should stringify default Lokalita', () => {
    const lokalita = new Lokalita({ ixlok: 666 })
    const stringified = stringifyLokalita(lokalita)
    expect(stringified).to.equal('')
  })

  it('should stringify case 01', () => {
    const lokalita = new Lokalita({ ixlok: 666, obec: 'Pamlskov', cast: 'Zroutky', })
    const stringified = stringifyLokalita(lokalita)
    expect(stringified).to.equal('Pamlskov-Zroutky, ')
  })

  it('should stringify case 02', () => {
    const lokalita = new Lokalita({
      ixlok: 666,
      obec: 'Pamlskov',
      cast: 'Zroutky',
      ulice: 'Krivolaka',
      cisori: 66,
      cispop: 666,
      cisdop: 5,
    })
    const stringified = stringifyLokalita(lokalita)
    expect(stringified).to.equal('Pamlskov-Zroutky, Krivolaka 666/66e')
  })

  it('should stringify case 03', () => {
    const lokalita = new Lokalita({
      ixlok: 666,
      obec: 'Pamlskov',
      cast: 'Zroutky',
      ulice: 'Krivolaka',
      cisori: 66,
      cispop: 666,
      cisdop: 5,
      akrlok: 'nejakaBunka'
    })
    const stringified = stringifyLokalita(lokalita)
    expect(stringified).to.equal('Pamlskov-Zroutky, Krivolaka 666/66e :: "nejakaBunka"')
    // console.log(stringified)
  })

})
