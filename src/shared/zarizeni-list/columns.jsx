/** Created by hhj on 2/26/16. */
import { Map } from 'immutable'
import React from 'react'
import { Link } from 'react-router'
import { Column, columntValueTypes } from '../app/models/Column'
import MarkedLokalita from '../umistovani/MarkedLokalita'

export const columns = Map(
  {
    id: new Column({
      name: 'id',
      caption: 'ID',
      valueType: columntValueTypes.number,
      visible: true,
      width: 1,
      render: (zarizeni) => <Link to={`/zarizeni/${zarizeni.id}`}>{zarizeni.id}</Link>
    }),
    name: new Column({
      name: 'name',
      caption: 'Name',
      valueType: columntValueTypes.string,
      visible: true,
      width: 4,
      render: (zarizeni) => <Link to={`/zarizeni/${zarizeni.id}`}>{zarizeni.name}</Link>,
    }),
    createdAt: new Column({
      name: 'createdAt',
      caption: 'Created at',
      valueType: columntValueTypes.date,
      visible: true
    }),
    updatedAt: new Column({
      name: 'updatedAt',
      caption: 'Updated at',
      valueType: columntValueTypes.date,
      visible: true
    }),
    deletedAt: new Column({
      name: 'deletedAt',
      caption: 'Deleted at',
      valueType: columntValueTypes.date,
      width: 1,
      visible: false
    }),
    ipAddress: new Column({
      name: 'ipAddress',
      caption: 'IP address',
      valueType: columntValueTypes.ipAddress,
      visible: true
    }),
    umisteni: new Column({
      name: 'umisteni',
      caption: 'Umisteni',
      valueType: columntValueTypes.string,
      width: 6,
      visible: true,
      render: (zarizeni, pozice) => <Link to={`/umistovani/${pozice}`}><MarkedLokalita lokalita={zarizeni.umisteni.lokalita} /></Link>
    }),
  }
)

export default columns
