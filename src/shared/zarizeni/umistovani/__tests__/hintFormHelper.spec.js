/** Created by hhj on 4/25/16. */
/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import * as hintFormHelper from '../hintFormHelper'

describe('umistovani hintFormHelper', () => {

  // hintFormHelper.propsHolder = {}

  describe('fetchSeznamAkrloks', () => {
    it('should return null if no actions defined', () => {
      const akrloks = hintFormHelper.fetchSeznamAkrloks()
      expect(akrloks).to.equal(null)
    })

    it('should return akrloks', () => {
      const akrloks = ['prvni', 'druhy']
      hintFormHelper.propsHolder.actions = { akrloks: { fetchCollection: () => Promise.resolve(akrloks) } }
      return hintFormHelper.fetchSeznamAkrloks().then(response => {
        expect(response).to.equal(akrloks)
      })
    })
  })


  describe('autoCompleteFactory', () => {

    beforeEach(() => {
      hintFormHelper.propsHolder.actions = {
        lokalitaForAutocomplete: {
          fetchCollection: () => Promise.resolve({
            data: [{ obec: 'prvniObec', ulice: 'prvniUlice' }, { obec: 'druhaObec', ulice: 'druhaUlice' }]
          })
        }
      }
    })

    it('should generate auto complete for obec', () => {
      const autoCompleteObec = hintFormHelper.autoCompleteFactory('obec')
      autoCompleteObec()
      return autoCompleteObec('someObec').then(response => {
        expect(response).to.deep.equal([{ value: 'prvniObec', group: '' }, { value: 'druhaObec', group: '' }])
      })
    })

    it('should generate auto complete for ulice', () => {
      const autoCompleteUlice = hintFormHelper.autoCompleteFactory('ulice')
      autoCompleteUlice()
      return autoCompleteUlice('someUlice').then(response => {
        expect(response).to.deep.equal([{ value: 'prvniUlice', group: '' }, { value: 'druhaUlice', group: '' }])
      })
    })
  })

})
