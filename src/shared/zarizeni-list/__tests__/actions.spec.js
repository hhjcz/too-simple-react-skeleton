/** Created by hhj on 1/26/16. */
/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import { List, Record } from 'immutable'
import * as actions from '../actions'
import reducer from '../reducer'

describe('zarizeni-list actions', () => {

  let state
  const getState = () => {}

  const dispatch = action => {
    if (typeof action === 'function') return action({ dispatch, getState })
    const initialState = reducer()
    state = reducer(initialState, action)

    return action
  }

  describe('showColumn & hideColumn', () => {

    it('should show/hide columns', () => {
      dispatch(actions.hideColumn('name'))
      expect(state).to.be.instanceOf(Record)
      expect(state.columns.toObject().name.visible).to.equal(false)

      dispatch(actions.showColumn('name'))
      expect(state.columns.toObject().name.visible).to.equal(true)
    })
  })

})
