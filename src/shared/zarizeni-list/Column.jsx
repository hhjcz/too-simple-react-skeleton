/** Created by hhj on 1/11/16. */
/* eslint-disable react/no-multi-comp */
import React from 'react'
import { Link } from 'react-router'
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
  render: null
})

export const columns = Map(
  {
    id: new Column({
      name: 'id',
      caption: 'ID',
      valueType: columntValueTypes.number,
      visible: true,
      render: (zarizeni) => <Link to={'/zarizeni/' + zarizeni.id}>{zarizeni.id}</Link>
    }),
    name: new Column({
      name: 'name',
      caption: 'Name',
      valueType: columntValueTypes.string,
      visible: true,
      render: (zarizeni) => <Link to={'/zarizeni/' + zarizeni.id}>{zarizeni.name}</Link>,
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
      visible: true
    }),
    ipAddress: new Column({
      name: 'ipAddress',
      caption: 'IP address',
      valueType: columntValueTypes.ipAddress,
      visible: true
    }),
  }
)
