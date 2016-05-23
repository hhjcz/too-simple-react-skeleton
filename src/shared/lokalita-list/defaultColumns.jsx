/** Created by hhj on 2/26/16. */
import { Map } from 'immutable'
import React from 'react'
import { Link } from 'react-router'
import { Column, columntValueTypes } from '../lib/tabulka/Column'
import MarkedLokalita from '../umistovani/MarkedLokalita'
import NepiOpy from '../umistovani/NepiOpy'
import UmistenaZarizeni from './UmistenaZarizeni'

const defaultColumns = Map(
  {
    ixlok: new Column({
      name: 'ixlok',
      caption: 'ID',
      valueType: columntValueTypes.number,
      visible: true,
      sortable: true,
      position: 10,
      width: 1,
      render: lokalita => <Link to={`/lokalita/${lokalita.id}`}>{lokalita.id}</Link>
    }),
    obec: new Column({
      name: 'obec',
      caption: 'Obec',
      valueType: columntValueTypes.string,
      visible: true,
      sortable: true,
      position: 20,
      width: 2,
      // render: lokalita => lokalita.obec
    }),
    ulice: new Column({
      name: 'ulice',
      caption: 'Ulice',
      valueType: columntValueTypes.string,
      visible: true,
      sortable: true,
      position: 30,
      width: 2,
      // render: lokalita => lokalita.obec
    }),
    akrlok: new Column({
      name: 'akrlok',
      caption: 'Akronym lokality',
      valueType: columntValueTypes.string,
      visible: true,
      sortable: true,
      position: 40,
      width: 2,
      // render: lokalita => lokalita.obec
    }),
    adresa: new Column({
      name: 'adresa',
      caption: 'Adresa',
      valueType: columntValueTypes.string,
      visible: true,
      sortable: false,
      position: 50,
      width: 4,
      render: lokalita => <MarkedLokalita lokalita={lokalita} />
    }),
    nepiOpyCount: new Column({
      name: 'nepiOpyCount',
      caption: 'Počet OP',
      valueType: columntValueTypes.number,
      visible: true,
      sortable: true,
      position: 60,
      width: 1,
      // render: lokalita => lokalita.nepiOpyCount,
    }),
    nepiOpy: new Column({
      name: 'nepiOpy',
      caption: 'OPy',
      valueType: columntValueTypes.string,
      disabled: true,
      visible: false,
      sortable: false,
      position: 80,
      width: 4,
      render: lokalita => <NepiOpy nepiOpy={lokalita.nepiOpy} />
    }),
    umistenaZarizeniCount: new Column({
      name: 'umistenaZarizeniCount',
      caption: 'Počet zařízení',
      valueType: columntValueTypes.number,
      visible: true,
      sortable: true,
      position: 85,
      width: 1,
      // render: lokalita => <UmistenaZarizeni umistenaZarizeni={lokalita.umistenaZarizeni} />
    }),
    umistenaZarizeni: new Column({
      name: 'umistenaZarizeni',
      caption: 'Umístěná zařízení',
      valueType: columntValueTypes.string,
      disabled: true,
      visible: false,
      sortable: false,
      position: 90,
      width: 4,
      render: lokalita => <UmistenaZarizeni umistenaZarizeni={lokalita.umistenaZarizeni} />
    })
  }
)

export default defaultColumns
