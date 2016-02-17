/** Created by hhj on 2/16/16. */
import { expect } from 'chai'

import lokalitaMarker from '../lokalitaMarker'
import { Lokalita } from '../../app/models/lokalita'
import { Zarizeni } from '../../zarizeni/core'

describe('umisteni lokalitaMarker', () => {

  it('should mark common lokalita and zarizeni case 1', () => {
    const lokalita = new Lokalita({ ulice: 'jakasiUlice', cispop: 66, cisdop: 5 })
    const zarizeni = new Zarizeni({ name: '[skatule] jakasiUlice66E-nejakaBunka' })
    const marked = lokalitaMarker(lokalita, zarizeni)
    expect(marked.marked).to.equal('<span class="text-warning"><b>jakasiUlice</b></span> <span class="text-warning"><b>66</b></span>/0 <span class="text-warning"><b>e</b></span>')
    expect(marked.markLength).to.equal(14)
  })

  it('should mark common lokalita and zarizeni case 2', () => {
    const lokalita = new Lokalita({ ulice: 'jakasiUlice', cispop: 66, cisdop: 2 })
    const zarizeni = new Zarizeni({ name: 'x.jakesiMesto.jakasiUlice66b' })
    const marked = lokalitaMarker(lokalita, zarizeni)
    expect(marked.marked).to.equal('<span class="text-warning"><b>jakasiUlice</b></span> <span class="text-warning"><b>66</b></span>/0 <span class="text-warning"><b>b</b></span>')
    expect(marked.markLength).to.equal(14)
  })

})
