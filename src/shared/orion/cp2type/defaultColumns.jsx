/** Created by hhj on 2/26/16. */
/* eslint-disable no-nested-ternary */
import { Map } from 'immutable'
import React from 'react'
import { Column, columntValueTypes } from '../../lib/tabulka/Column'
import ActionButtons from './ActionButtons'

const defaultColumns = Map(
  {
    id: new Column({
      name: 'id',
      caption: 'id',
      valueType: columntValueTypes.string,
      visible: false,
      sortable: true,
      position: 10,
      width: 3,
    }),
    customPollerID: new Column({
      name: 'customPollerID',
      caption: 'CustomPollerID',
      valueType: columntValueTypes.number,
      visible: false,
      sortable: true,
      position: 15,
      width: 3,
    }),
    pollerName: new Column({
      name: 'pollerName',
      caption: 'Poller name',
      valueType: columntValueTypes.string,
      visible: true,
      sortable: true,
      position: 20,
      width: 4,
    }),
    sysObjectID: new Column({
      name: 'sysObjectID',
      caption: 'SysObjectID',
      valueType: columntValueTypes.string,
      visible: true,
      sortable: true,
      position: 30,
      width: 3,
    }),
    machineType: new Column({
      name: 'machineType',
      caption: 'Machine type',
      valueType: columntValueTypes.string,
      visible: true,
      sortable: true,
      position: 40,
      width: 3,
    }),
    faulty: new Column({
      name: 'faulty',
      caption: 'Faulty',
      valueType: columntValueTypes.number,
      visible: true,
      sortable: true,
      position: 50,
      width: 1,
    }),
    functional: new Column({
      name: 'functional',
      caption: 'OK',
      valueType: columntValueTypes.number,
      visible: true,
      sortable: true,
      position: 60,
      width: 1,
    }),
    total: new Column({
      name: 'total',
      caption: 'Total',
      valueType: columntValueTypes.number,
      visible: true,
      sortable: true,
      position: 70,
      width: 1,
    }),
    autoAssign: new Column({
      name: 'autoAssign',
      caption: 'AutoAssign',
      valueType: columntValueTypes.string,
      visible: true,
      sortable: true,
      position: 90,
      width: 1,
      render: cp2type => (cp2type.autoAssign === '0' ? (
          'NA'
        ) : cp2type.autoAssign === '1' ? (
          'Assign'
        ) : cp2type.autoAssign === '2' ? (
          'Unassign'
        ) : cp2type.autoAssign === '3' ? (
          'Ignore'
        ) : 'Unrecognized value'
      )
    }),
    actions: new Column({
      name: 'actions',
      caption: 'Actions',
      visible: true,
      sortable: false,
      position: 100,
      render: cp2type => <ActionButtons cp2type={cp2type} />
    }),
    updatedAt: new Column({
      name: 'updatedAt',
      caption: 'Updated at',
      valueType: columntValueTypes.date,
      visible: true,
      position: 110,
    }),
  }
)

export default defaultColumns
