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
      width: 1,
    }),
    secondId: new Column({
      name: 'secondId',
      caption: 'Second ID',
      valueType: columntValueTypes.number,
      position: 20,
      width: 1,
    }),
    firstIpAddress: new Column({
      name: 'firstIpAddress',
      caption: 'IP address',
      valueType: columntValueTypes.ipAddress,
      position: 30,
    }),
    firstName: new Column({
      name: 'firstName',
      caption: 'First name',
      valueType: columntValueTypes.string,
      position: 40,
      width: 4,
    }),
    secondName: new Column({
      name: 'secondName',
      caption: 'Second name',
      valueType: columntValueTypes.string,
      position: 50,
      width: 4,
    }),
  }
)

export default defaultColumns
