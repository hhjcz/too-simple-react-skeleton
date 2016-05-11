/** Created by hhj on 20.12.15. */
/* eslint-disable no-case-declarations */
import { Record } from 'immutable'
import { Column } from '../app/models/Column'
import columns from './columns'
import * as actions from './actions'

const InitialState = Record({ columns })

const revive = (state = {}, initialState = new InitialState({})) => {
  const { columns } = state
  const mergeObj = {}
  if (columns) mergeObj.columns = columns

  return initialState.merge(mergeObj);
}

export default function reducer(state = {}, action) {
  const initialState = new InitialState({})
  if (!(state instanceof InitialState)) {
    return revive(state, initialState)
  }

  switch (action.type) {
    case actions.COLUMN_VISIBILITY:
      return state.update('columns', columns =>
        columns.update(action.columnName, column =>
          new Column({ ...column.toObject(), visible: action.visibility })
        )
      )

    default:
      return state
  }
}
