/** Created by hhj on 12/18/15. */
import { expect } from 'chai'
import { List, Map } from 'immutable'
import { setList } from './../core'
import { ZarizeniFactory } from '../../app/models/Zarizeni'

describe('zarizeni list logic', () => {

  it('adds items to the state', () => {
    const state = Map()
    const seznamZarizeni = List.of({ id: 1 }, { id: 2 })
    const nextState = setList(state, seznamZarizeni)

    expect(nextState).to.equal(Map({
      seznamZarizeni: List.of(ZarizeniFactory({ id: 1 }), ZarizeniFactory({ id: 2 }))
    }))
  })

  it('converts to immutable', () => {
    const state = Map()
    const seznamZarizeni = [{ id: 1 }, { id: 2 }]
    const nextState = setList(state, seznamZarizeni)

    expect(nextState).to.equal(Map({
      seznamZarizeni: List.of(ZarizeniFactory({ id: 1 }), ZarizeniFactory({ id: 2 }))
    }))
  })

})
