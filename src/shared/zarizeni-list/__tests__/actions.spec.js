/** Created by hhj on 1/26/16. */
import { expect } from 'chai'
import { Record, List } from 'immutable'
import actions from '../actions'
import rest from '../../app/rest'
import reducer from '../reducer'

describe('zarizeni-list actions', () => {

  describe('fetchList', () => {

    let state
    const nullResponse = {}
    const zarizeni = {}
    zarizeni.toObject = () => zarizeni

    const fetch = url => ({
      // console.log('Dispatching: ', action)
      then: successCb => successCb({
        ok: true,
        json: () => ({
          then: successCb2 => successCb2(nullResponse)
        })
      })
    })

    const getState = () => ({ zarizeni })

    const dispatch = action => {
      if (typeof action === 'function') return action({ dispatch, getState, fetch })
      if (action.type === '@@my-rest/ZARIZENI_SUCCESS') {
        expect(action.data).not.to.be.undefined
      }
      const initialState = reducer(getState())
      state = reducer(initialState, action)

      return action
    }

    rest.use('fetch', fetch)

    it('should handle null response', () => {
      return dispatch(actions.fetchAll()).then(response => {
        expect(state).to.be.instanceOf(Record)
        expect(state.items).to.be.instanceOf(List)
        expect(state.fetching).to.be.false
      })
    })

  })
})
