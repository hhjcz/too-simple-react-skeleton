/** Created by hhj on 2/26/16. */
import { Map } from 'immutable'
import React from 'react'
import { Link } from 'react-router'
import MyIcon from '../lib/MyIcon'
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
      caption: <MyIcon color="black">place</MyIcon>,
      valueType: columntValueTypes.string,
      width: 6,
      visible: true,
      sortable: false,
      render: (zarizeni, pozice) =>
        <Link to={`/umistovani/${pozice}`}>{
          zarizeni.umisteni && zarizeni.umisteni.lokalita && zarizeni.umisteni.lokalita.ixlok > 0 ?
            <MarkedLokalita lokalita={zarizeni.umisteni.lokalita} />
            : 'neumistene'
        }</Link>
    }),
    previousNetvisionName: new Column({
      name: 'previousNetvisionName',
      caption: 'Previous NV name',
      valueType: columntValueTypes.string,
      width: 4,
      visible: false,
      render: (zarizeni, pozice) => (
        zarizeni.previousNetvisionName ? (
          <div>
            <div>{zarizeni.previousNetvisionName}</div>
            <div>{zarizeni.name}</div>
          </div>
        ) : null
      )
    }),
  }
)

export default columns
