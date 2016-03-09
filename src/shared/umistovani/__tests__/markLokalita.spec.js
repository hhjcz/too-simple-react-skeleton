/** Created by hhj on 2/16/16. */
/* eslint-disable max-len */
import { expect } from 'chai'

import markLokalita from '../markLokalita'
import lokalitaHinter from '../findLokalitaHint'
import { Lokalita } from '../../app/models/Lokalita'

describe('umistovani markLokalita', () => {

  it('should mark common lokalita and zarizeni case 1', () => {
    const lokalita = new Lokalita({ ulice: 'jakasiUlice', cispop: 66, cisdop: 5, akrlok: 'jakasiAkrlok' })
    const lokalitaHint = lokalitaHinter('[skatule] jakasiUlice66E-nejakaBunka')
    const marked = markLokalita(lokalita, lokalitaHint)
    expect(marked.marked).to.equal('<span class="text-warning"><b>jakasiUlice</b></span> <span class="text-warning"><b>66</b></span>/0 <span class="text-warning"><b>e</b></span> :: <span class="text-warning"><b>jakasi</b></span>Akrlok')
    expect(marked.markLength).to.equal(20)
  })

  it('should mark common lokalita and zarizeni case 2', () => {
    const lokalita = new Lokalita({ ulice: 'jakasiUlice', cispop: 66, cisdop: 2, akrlok: 'jakasiAkrlok' })
    const lokalitaHint = lokalitaHinter('x.jakesiMesto.jakasiUlice66b')
    const marked = markLokalita(lokalita, lokalitaHint)
    expect(marked.marked).to.equal('<span class="text-warning"><b>jakasiUlice</b></span> <span class="text-warning"><b>66</b></span>/0 <span class="text-warning"><b>b</b></span> :: <span class="text-warning"><b>jakasi</b></span>Akrlok')
    expect(marked.markLength).to.equal(20)
  })

})
