/** Created by hhj on 20.12.15. */
import rest from '../app/rest'
import defaultColumns from './defaultColumns'

export const COLUMN_VISIBILITY = 'LOKALITA_LIST/COLUMN_VISIBILITY'
export const SET_COLUMN_WIDTH = 'LOKALITA_LIST/SET_COLUMN_WIDTH'

export const setColumnVisibility = (columnName, visible) => ({ type: COLUMN_VISIBILITY, columnName, visible })

export const showColumn = columnName => setColumnVisibility(columnName, true)

export const hideColumn = columnName => setColumnVisibility(columnName, false)

export const setColumnWidth = (columnName, width = null) => {
  if (!width) width = defaultColumns.get(columnName).width
  return ({ type: SET_COLUMN_WIDTH, columnName, width })
}

module.exports = {
  ...module.exports,
  ...rest.actions.lokalita,
}
