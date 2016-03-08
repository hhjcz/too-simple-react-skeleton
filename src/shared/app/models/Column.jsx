/** Created by hhj on 1/11/16. */
import { Record } from 'immutable'

export const columntValueTypes = {
  number: 'number',
  string: 'string',
  boolean: 'boolean',
  date: 'date',
  ipAddress: 'ipAddress',
}

export const Column = Record({
  name: 'column',
  caption: 'Column',
  valueType: columntValueTypes.number,
  defaultValue: null,
  visible: true,
  width: 2,
  render: null
})

export default Column
