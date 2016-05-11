/** Created by hhj on 20.12.15. */
import rest from '../app/rest';

export const COLUMN_VISIBILITY = 'COLUMN_VISIBILITY'

export const showColumn = columnName => ({ type: COLUMN_VISIBILITY, columnName, visibility: true })

export const hideColumn = columnName => ({ type: COLUMN_VISIBILITY, columnName, visibility: false })

module.exports = {
  ...module.exports,
  ...rest.actions.zarizeni,
}
