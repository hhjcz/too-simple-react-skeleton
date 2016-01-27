/** Created by hhj on 1/26/16. */
import { expect } from 'chai'
import { Record, List } from 'immutable'
import * as actions from '../actions'
import reducer from '../reducer'

describe('zarizeni-list actions', () => {

  describe('fetchList', () => {

    let state
    const nullResponse = {}
    const zarizeniList = {}
    zarizeniList.toObject = () => zarizeniList

    const fetch = url => ({
      //console.log('Dispatching: ', action)
      then: successCb => successCb({
        ok: true,
        json: () => ({
          then: successCb2 => successCb2(nullResponse)
        })
      })
    })

    const getState = () => ({ zarizeniList })

    const dispatch = action => {
      if (typeof action === 'function') return action({ dispatch, getState, fetch })
      if (action.type === actions.FETCH_LIST_SUCCESS) {
        expect(action.data).not.to.be.undefined
      }
      const initialState = reducer(getState())
      state = reducer(initialState, action)

      return action
    }

    it('should handle null response', () => {
      dispatch(actions.gotoPage(5))
      expect(state).to.be.instanceOf(Record)
      expect(state.seznamZarizeni).to.be.instanceOf(List)
      expect(state.fetching).to.be.false
    })

  })
})
