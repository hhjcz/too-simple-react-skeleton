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
    adresa: new Column({
      name: 'adresa',
      caption: <MyIcon color="black">place</MyIcon>,
      valueType: columntValueTypes.string,
      width: 2,
      visible: true,
      sortable: false,
      render: lokalita => <MarkedLokalita lokalita={lokalita} />
    }),
    opy: new Column({
      name: 'opy',
      caption: 'OPy',
      valueType: columntValueTypes.string,
      width: 4,
      visible: true,
      sortable: false,
      render: lokalita => <NepiOpy nepiOpy={lokalita.nepiOpy} />
    }),
    umistenaZarizeni: new Column({
      name: 'umistenaZarizeni',
      caption: 'Umístěná zařízení',
      valueType: columntValueTypes.string,
      width: 4,
      visible: true,
      sortable: false,
      render: lokalita => <UmistenaZarizeni umistenaZarizeni={lokalita.umistenaZarizeni} />
    })
  }
)

export default defaultColumns
