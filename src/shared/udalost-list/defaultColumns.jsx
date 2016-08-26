/** Created by hhj on 2/26/16. */
import { Map } from 'immutable'
import React from 'react'
import { Link } from 'react-router'
import { Column, columntValueTypes } from '@hhjcz/react-lib/lib/tabulka'

const defaultColumns = Map(
  {
    id: new Column({
      name: 'id',
      caption: 'ID',
      valueType: columntValueTypes.number,
      visible: true,
      sortable: true,
      position: 10,
      width: 1,
      render: udalost => <Link to={`/udalost/${udalost.id}`}>{udalost.id}</Link>
    }),
    druh: new Column({
      name: 'druh',
      caption: 'Druh',
      valueType: columntValueTypes.string,
      visible: false,
      sortable: true,
      position: 20,
      width: 1,
      render: udalost => udalost.druh.nazev,
    }),
    data: new Column({
      name: 'data',
      caption: 'Data',
      valueType: columntValueTypes.string,
      visible: true,
      sortable: true,
      position: 30,
      width: 8,
      render: udalost => (
        <span>
          <Link to={`/zarizeni/orion/${udalost.data.alreadyInOrionId}`}>{udalost.data.alreadyInOrionId}</Link>
        </span>
      ),
    }),
    stav: new Column({
      name: 'stav',
      caption: 'Stav',
      valueType: columntValueTypes.string,
      visible: false,
      sortable: true,
      position: 35,
      width: 1,
    }),
    createdAt: new Column({
      name: 'createdAt',
      caption: 'Created at',
      valueType: columntValueTypes.date,
      visible: false,
      position: 40,
      width: 2,
    }),
    updatedAt: new Column({
      name: 'updatedAt',
      caption: 'Updated at',
      valueType: columntValueTypes.date,
      visible: false,
      position: 50,
      width: 2,
    }),
  }
)

export default defaultColumns
