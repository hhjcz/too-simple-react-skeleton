/** Created by hhj on 1/26/16. */
/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import { Record } from 'immutable'
import * as actions from '../actions'
import reducer from '../reducer'
import defaultColumns from '../defaultColumns'

describe('cp2type-list actions', () => {

  let state
  const getState = () => {}

  const dispatch = action => {
    if (typeof action === 'function') return action({ dispatch, getState })
    const initialState = reducer()
    state = reducer(initialState, action)

    return action
  }

  it('should show/hide columns', () => {
    dispatch(actions.hideColumn('id'))
    expect(state).to.be.instanceOf(Record)
    expect(state.columns.toObject().id.visible).to.equal(false)

    dispatch(actions.showColumn('id'))
    expect(state.columns.toObject().id.visible).to.equal(true)
  })

  it('should set column width', () => {
    dispatch(actions.setColumnWidth('id', 66))
    expect(state).to.be.instanceOf(Record)
    expect(state.columns.toObject().id.width).to.equal(66)
  })

  it('should set default column width', () => {
    dispatch(actions.setColumnWidth('id'))
    expect(state).to.be.instanceOf(Record)
    expect(state.columns.toObject().id.width).to.equal(defaultColumns.get('id').width)
  })

})
