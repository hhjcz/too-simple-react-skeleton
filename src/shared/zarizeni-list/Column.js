/** Created by hhj on 1/11/16. */

import { Record, List } from 'immutable'

export const columntValueTypes = {
  number: 'number',
  string: 'string',
  boolean: 'boolean',
  date: 'date',
  ipaddress: 'ipaddress',
}

export const Column = Record({
  name: 'column',
  caption: 'Column',
  valueType: columntValueTypes.number,
  defaultValue: null,
  visible: true
})

export const columns = List.of(
  new Column({
    name: 'id',
    caption: 'ID',
    valueType: columntValueTypes.number,
    visible: true
  }),
  new Column({
    name: 'name',
    caption: 'Name',
    valueType: columntValueTypes.number,
    visible: true
  })
)
