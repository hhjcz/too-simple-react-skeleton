/** Created by hhj on 20.12.15. */
import rest from '../app/rest'
import defaultColumns from './defaultColumns'

export const COLUMN_VISIBILITY = 'ZARIZENI_LIST/COLUMN_VISIBILITY'
export const SET_COLUMN_WIDTH = 'ZARIZENI_LIST/SET_COLUMN_WIDTH'

export const setColumnVisibility = (columnName, visible) => ({ type: COLUMN_VISIBILITY, columnName, visible })

export const showColumn = columnName => setColumnVisibility(columnName, true)

export const hideColumn = columnName => setColumnVisibility(columnName, false)

export const setColumnWidth = (columnName, width = null) => {
  if (!width) width = defaultColumns.get(columnName).width
  return ({ type: SET_COLUMN_WIDTH, columnName, width })
}

export const confirmZmenenaIdentita = zarizeni => {
  rest.actions.previousNetvisionIdentity.destroy({
    params: { zarizeni_id: zarizeni.id }
  }).then(() =>
    rest.actions.zarizeni.fetchOne({
      params: { id: zarizeni.id }
    }))
}

module.exports = {
  ...module.exports,
  ...rest.actions.zarizeni,
}
