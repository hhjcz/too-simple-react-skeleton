/** Created by hhj on 4/12/16. */
/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import { List, Map } from 'immutable'
import * as reduceHelpers from '../reduceHelpers'

describe('rest lib reduceHelpers', () => {
  let initialState
  beforeEach(() => {
    initialState = new reduceHelpers.InitialState()
  })

  it('should revive state', () => {
    const state = reduceHelpers.revive()
    expect(state).to.be.instanceOf(reduceHelpers.InitialState)
  })


  describe('createItemsReducer', () => {

    const itemsReducer = reduceHelpers.createItemsReducer()
    const fetchedItems1 = [
      { id: 66, name: 'someName66' },
      { id: 77, name: 'someName77' }
    ]
    const fetchedItems2 = [
      { id: 66, name: 'someChangedName66' },
      { id: 88, name: 'someName88' }
    ]

    it('should map ids to items', () => {
      const state = itemsReducer(fetchedItems1)(initialState)
      expect(state.items).to.be.instanceOf(List)
      expect(state.items.toArray()).to.deep.equal([66, 77])
    })

    it('should map entities', () => {
      const state = itemsReducer(fetchedItems1)(initialState)

      expect(state.entities).to.be.instanceOf(Map)
      expect(state.entities.toObject()).to.deep.equal({
        '66': { id: 66, name: 'someName66' },
        '77': { id: 77, name: 'someName77' }
      })
      expect(state.items.toArray()).to.deep.equal([66, 77])
    })

    it('should merge with existing entities', () => {
      let state = itemsReducer(fetchedItems1)(initialState)
      state = itemsReducer(fetchedItems2)(state)

      expect(state.entities).to.be.instanceOf(Map)
      expect(state.entities.toObject()).to.deep.equal({
        '66': { id: 66, name: 'someChangedName66' },
        '77': { id: 77, name: 'someName77' },
        '88': { id: 88, name: 'someName88' }
      })
      expect(state.items.toArray()).to.deep.equal([66, 88])
    })

    it('should map with custom id field', () => {
      const itemsReducer = reduceHelpers.createItemsReducer(x => x, 'name')
      const state = itemsReducer(fetchedItems1)(initialState)
      expect(state.entities.toObject()).to.deep.equal({
        someName66: { id: 66, name: 'someName66' },
        someName77: { id: 77, name: 'someName77' },
      })
    })
  })

})
