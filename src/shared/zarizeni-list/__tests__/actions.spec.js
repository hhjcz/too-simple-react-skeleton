/** Created by hhj on 1/26/16. */
/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import { Record, List } from 'immutable'
import actions from '../actions'
import rest from '../../app/rest'
import { generateSubState } from '../../lib/rest/utils'
import reducer from '../reducer'

describe('zarizeni-list actions', () => {

  describe('fetchList', () => {

    let state
    const nullResponse = {}
    const zarizeni = {}
    zarizeni.toObject = () => zarizeni

    const fetch = () => Promise.resolve({ nullResponse })

    const getState = () => generateSubState({ zarizeni })

    const dispatch = action => {
      if (typeof action === 'function') return action({ dispatch, getState })
      const initialState = reducer(getState())
      state = reducer(initialState, action)

      return action
    }

    rest.use('fetch', fetch)
    rest.use('dispatch', dispatch)

    it('should handle null response', () =>
      dispatch(actions.fetchCollection()).then(() => {
        expect(state).to.be.instanceOf(Record)
        expect(state.items).to.be.instanceOf(List)
        expect(state.fetching).to.be.false
      })
    )

  })
})
