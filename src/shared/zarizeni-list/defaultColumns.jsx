/** Created by hhj on 2/26/16. */
import { Map } from 'immutable'
import React from 'react'
import { Link } from 'react-router'
import IconButton from 'material-ui/IconButton'
import MyIcon from '../lib/MyIcon'
import colors from '../app/colors'
import { Column, columntValueTypes } from '../lib/tabulka/Column'
import MarkedLokalita from '../zarizeni/umistovani/MarkedLokalita'
import * as actions from './actions'

const defaultColumns = Map(
  {
    id: new Column({
      name: 'id',
      caption: 'ID',
      valueType: columntValueTypes.number,
      visible: true,
      position: 10,
      width: 1,
      render: (zarizeni, pozice) => <Link to={`/zarizeni/${zarizeni.id}/info?cursor=${pozice}`}>{zarizeni.id}</Link>
    }),
    name: new Column({
      name: 'name',
      caption: 'Name',
      valueType: columntValueTypes.string,
      visible: true,
      position: 20,
      width: 4,
      render: zarizeni => <Link to={`/zarizeni/${zarizeni.id}`}>{zarizeni.name}</Link>,
    }),
    createdAt: new Column({
      name: 'createdAt',
      caption: 'Created at',
      valueType: columntValueTypes.date,
      visible: false,
      position: 30,
    }),
    updatedAt: new Column({
      name: 'updatedAt',
      caption: 'Updated at',
      valueType: columntValueTypes.date,
      visible: true,
      position: 30,
    }),
    deletedAt: new Column({
      name: 'deletedAt',
      caption: 'Deleted at',
      valueType: columntValueTypes.date,
      position: 40,
      width: 1,
      visible: false
    }),
    ipAddress: new Column({
      name: 'ipAddress',
      caption: 'IP address',
      valueType: columntValueTypes.ipAddress,
      visible: true,
      position: 50,
    }),
    umisteni: new Column({
      name: 'umisteni',
      caption: <MyIcon color="black">place</MyIcon>,
      valueType: columntValueTypes.string,
      position: 60,
      width: 6,
      visible: true,
      sortable: false,
      render: (zarizeni, pozice) =>
        <Link to={`/zarizeni/${zarizeni.id}/umistovani?cursor=${pozice}`}>{
          zarizeni.umisteni && zarizeni.umisteni.lokalita && zarizeni.umisteni.lokalita.ixlok > 0 ? (
            <MarkedLokalita lokalita={zarizeni.umisteni.lokalita} />
          ) : 'neumistene'
        }</Link>
    }),
    previousNetvisionName: new Column({
      name: 'previousNetvisionName',
      caption: 'Previous NV name',
      valueType: columntValueTypes.string,
      position: 70,
      width: 6,
      visible: false,
      render: zarizeni => (
        zarizeni.previousNetvisionName ? (
          <div className="row">
            <div className="col col-xs-2">
              <IconButton
                tooltip="Potvrdit!" style={{ padding: '0px' }}
                onTouchTap={() => actions.confirmZmenenaIdentita(zarizeni)}
              >
                <MyIcon color={colors.blue400}>done</MyIcon>
              </IconButton>
            </div>
            <div className="col col-xs-10">
              <div>{zarizeni.previousNetvisionName}</div>
              <div>{zarizeni.name}</div>
            </div>
          </div>
        ) : null
      )
    }),
  }
)

export default defaultColumns
