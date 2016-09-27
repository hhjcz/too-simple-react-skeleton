/** Created by hhj on 2/26/16. */
/* eslint-disable no-nested-ternary */
import { Map } from 'immutable'
import React from 'react'
import { Column, columntValueTypes } from '@hhjcz/react-lib/lib/tabulka'

const defaultColumns = Map(
  {
    firstId: new Column({
      name: 'firstId',
      caption: 'First ID',
      valueType: columntValueTypes.number,
      position: 10,
    }),
    secondId: new Column({
      name: 'secondId',
      caption: 'Second ID',
      valueType: columntValueTypes.number,
      position: 20,
    }),
    firstIpAddress: new Column({
      name: 'firstIpAddress',
      caption: 'IP address',
      valueType: columntValueTypes.ipAddress,
      position: 30,
    }),
  }
)

export default defaultColumns
