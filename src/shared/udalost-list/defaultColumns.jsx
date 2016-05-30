/** Created by hhj on 2/26/16. */
import { Map } from 'immutable'
import React from 'react'
import { Link } from 'react-router'
import { Column, columntValueTypes } from '../lib/tabulka/Column'

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
      visible: true,
      sortable: true,
      position: 20,
      width: 2,
      render: udalost => udalost.druh.nazev,
    }),
    data: new Column({
      name: 'data',
      caption: 'Data',
      valueType: columntValueTypes.string,
      visible: true,
      sortable: false,
      position: 30,
      width: 6,
      render: udalost => JSON.stringify(udalost.data).substring(0, 90),
    }),
    createdAt: new Column({
      name: 'createdAt',
      caption: 'Created at',
      valueType: columntValueTypes.date,
      visible: true,
      position: 40,
    }),
    updatedAt: new Column({
      name: 'updatedAt',
      caption: 'Updated at',
      valueType: columntValueTypes.date,
      visible: false,
      position: 50,
    }),
  }
)

export default defaultColumns
