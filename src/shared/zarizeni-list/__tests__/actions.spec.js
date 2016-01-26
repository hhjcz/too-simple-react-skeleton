/** Created by hhj on 1/26/16. */
import { expect } from 'chai'
import * as actions from '../actions'
import reducer from '../reducer'

describe('zarizeni-list actions', () => {

  describe('fetchList', () => {

    it('should handle null response', () => {
      const nullResponse = {}
      const dispatch = action => {
        // console.log('Dispatching: ', action)
        if (typeof action === 'function') return action()
        if (action.type = actions.FETCH_LIST_SUCCESS) {
          expect(action.seznamZarizeni).not.to.be.null
          reducer(getState(), action)
        }
      }
      const fetch = url => ({
        then: successCb => successCb({
          ok: true,
          json: () => ({
            then: successCb2 => successCb2(nullResponse)
          })
        })
      })
      const zarizeniList = {}
      zarizeniList.toObject = () => zarizeniList
      const getState = () => ( { zarizeniList })
      const ret = actions.fetchList()({ dispatch, getState, fetch })
    })

  })
})
