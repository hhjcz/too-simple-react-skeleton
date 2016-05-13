/** Created by hhj on 20.12.15. */
/* eslint-disable no-case-declarations */
import { Record } from 'immutable'
import { Column } from '../app/models/Column'
import defaultColumns from './defaultColumns'
import * as actions from './actions'

const InitialState = Record({ columns: defaultColumns })

const revive = (state = {}, initialState = new InitialState({})) => {
  const { columns } = state
  const mergeObj = {}
  if (columns) mergeObj.columns = columns

  return initialState.merge(mergeObj);
}

export default function reducer(state = {}, action) {
  if (!(state instanceof InitialState)) {
    return revive()
  }

  switch (action.type) {
    case actions.COLUMN_VISIBILITY:
      return state.update('columns', columns =>
        columns.update(action.columnName, column =>
          new Column({ ...column.toObject(), visible: action.visible })
        )
      )

    case actions.SET_COLUMN_WIDTH:
      return state.update('columns', columns =>
        columns.update(action.columnName, column =>
          new Column({ ...column.toObject(), width: action.width })
        )
      )

    default:
      return state
  }
}
