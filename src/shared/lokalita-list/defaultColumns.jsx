/** Created by hhj on 2/26/16. */
import { Map } from 'immutable'
import React from 'react'
import { Link } from 'react-router'
import MyIcon from '../lib/MyIcon'
import { Column, columntValueTypes } from '../lib/tabulka/Column'
import MarkedLokalita from '../umistovani/MarkedLokalita'
import NepiOpy from '../umistovani/NepiOpy'
import UmistenaZarizeni from './UmistenaZarizeni'

const defaultColumns = Map(
  {
    ixlok: new Column({
      name: 'ixlok',
      caption: 'ixlok',
      valueType: columntValueTypes.number,
      visible: true,
      sortable: false,
      width: 1,
      render: lokalita => <Link to={`/lokalita/${lokalita.id}`}>{lokalita.id}</Link>
    }),
    obec: new Column({
      name: 'obec',
      caption: 'obec',
      valueType: columntValueTypes.string,
      visible: true,
      sortable: true,
      width: 2,
      // render: lokalita => lokalita.obec
    }),
    ulice: new Column({
      name: 'ulice',
      caption: 'ulice',
      valueType: columntValueTypes.string,
      visible: true,
      sortable: true,
      width: 2,
      // render: lokalita => lokalita.obec
    }),
    akrlok: new Column({
      name: 'akrlok',
      caption: 'akrlok',
      valueType: columntValueTypes.string,
      visible: true,
      sortable: true,
      width: 2,
      // render: lokalita => lokalita.obec
    }),
    adresa: new Column({
      name: 'adresa',
      caption: <MyIcon color="black">place</MyIcon>,
      valueType: columntValueTypes.string,
      width: 4,
      visible: true,
      sortable: false,
      render: lokalita => <MarkedLokalita lokalita={lokalita} />
    }),
    nepiOpyCount: new Column({
      name: 'nepiOpyCount',
      caption: 'Počet OP',
      valueType: columntValueTypes.number,
      width: 1,
      visible: true,
      sortable: true,
      // render: lokalita => lokalita.nepiOpyCount,
    }),
    nepiOpyCount2: new Column({
      name: 'nepiOpyCount2',
      caption: 'Počet OP (2)',
      valueType: columntValueTypes.number,
      width: 1,
      visible: true,
      sortable: true,
      render: lokalita => lokalita.nepiOpy.count(),
    }),
    nepiOpy: new Column({
      name: 'opy',
      caption: 'OPy',
      valueType: columntValueTypes.string,
      width: 4,
      visible: false,
      sortable: false,
      render: lokalita => <NepiOpy nepiOpy={lokalita.nepiOpy} />
    }),
    umistenaZarizeni: new Column({
      name: 'umistenaZarizeni',
      caption: 'Umístěná zařízení',
      valueType: columntValueTypes.string,
      width: 4,
      visible: false,
      sortable: false,
      render: lokalita => <UmistenaZarizeni umistenaZarizeni={lokalita.umistenaZarizeni} />
    })
  }
)

export default defaultColumns
