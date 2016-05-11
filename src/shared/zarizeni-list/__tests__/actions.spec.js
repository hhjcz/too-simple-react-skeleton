/** Created by hhj on 1/26/16. */
/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import { List, Record } from 'immutable'
import * as actions from '../actions'
import reducer from '../reducer'
import defaultColumns from '../columns'

describe('zarizeni-list actions', () => {

  let state
  const getState = () => {}

  const dispatch = action => {
    if (typeof action === 'function') return action({ dispatch, getState })
    const initialState = reducer()
    state = reducer(initialState, action)

    return action
  }

  it('should show/hide columns', () => {
    dispatch(actions.hideColumn('name'))
    expect(state).to.be.instanceOf(Record)
    expect(state.columns.toObject().name.visible).to.equal(false)

    dispatch(actions.showColumn('name'))
    expect(state.columns.toObject().name.visible).to.equal(true)
  })

  it('should set column width', () => {
    dispatch(actions.setColumnWidth('name', 66))
    expect(state).to.be.instanceOf(Record)
    expect(state.columns.toObject().name.width).to.equal(66)
  })

  it('should set default column width', () => {
    dispatch(actions.setColumnWidth('name'))
    expect(state).to.be.instanceOf(Record)
    expect(state.columns.toObject().name.width).to.equal(defaultColumns.get('name').width)
  })

})
