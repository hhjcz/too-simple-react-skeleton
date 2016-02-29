/** Created by hhj on 1/11/16. */
/* eslint-disable react/no-multi-comp */
import React from 'react'
import { Record, Map } from 'immutable'

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
