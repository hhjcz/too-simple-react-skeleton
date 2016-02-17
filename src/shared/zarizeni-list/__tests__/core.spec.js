/** Created by hhj on 12/18/15. */
import { expect } from 'chai'
import { List, Map } from 'immutable'
import { setList } from './../core'
import { Zarizeni } from '../../app/models/Zarizeni'

describe('zarizeni list logic', () => {

  describe('setList', () => {

    it('adds items to the state', () => {
      const state = Map()
      const seznamZarizeni = List.of(new Zarizeni({ id: 1 }), new Zarizeni({ id: 2 }))
      const nextState = setList(state, seznamZarizeni)

      expect(nextState).to.equal(Map({
        seznamZarizeni: List.of(new Zarizeni({ id: 1 }), new Zarizeni({ id: 2 }))
      }))
    })

    it('converts to immutable', () => {
      const state = Map()
      const seznamZarizeni = [new Zarizeni({ id: 1 }), new Zarizeni({ id: 2 })]
      const nextState = setList(state, seznamZarizeni)

      expect(nextState).to.equal(Map({
        seznamZarizeni: List.of(new Zarizeni({ id: 1 }), new Zarizeni({ id: 2 }))
      }))
    })
  })

})
