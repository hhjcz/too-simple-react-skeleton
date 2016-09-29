/** Created by hhj on 2/26/16. */
/* eslint-disable no-nested-ternary */
import { Map } from 'immutable'
import React from 'react'
import { Link } from 'react-router'
import { Column, columntValueTypes } from '@hhjcz/react-lib/lib/tabulka'

const defaultColumns = Map(
  {
    firstId: new Column({
      name: 'firstId',
      caption: 'ID #1',
      valueType: columntValueTypes.number,
      position: 10,
      width: 1,
    }),
    secondId: new Column({
      name: 'secondId',
      caption: 'ID #2',
      valueType: columntValueTypes.number,
      position: 20,
      width: 1,
    }),
    firstIpAddress: new Column({
      name: 'firstIpAddress',
      caption: 'IP adresa',
      valueType: columntValueTypes.ipAddress,
      position: 30,
      width: 1,
    }),
    firstName: new Column({
      name: 'firstName',
      caption: 'Jmeno #1',
      valueType: columntValueTypes.string,
      position: 40,
      width: 4,
    }),
    secondName: new Column({
      name: 'secondName',
      caption: 'Jmeno #2',
      valueType: columntValueTypes.string,
      position: 50,
      width: 4,
    }),
    slouceni: new Column({
      name: 'slouceni',
      caption: 'Lze sloucit',
      valueType: columntValueTypes.string,
      position: 60,
      width: 1,
      sortable: false,
      render: zarizeni => (
        <div>
          <Link to={`/udrzba/zarizeni_ke_slouceni/${zarizeni.firstId}/${zarizeni.secondId}`}>
            {zarizeni.firstName.toLowerCase() === zarizeni.secondName.toLowerCase() ? 'OK' : '?'}
          </Link>
        </div>
      ),
    }),
  }
)

export default defaultColumns
