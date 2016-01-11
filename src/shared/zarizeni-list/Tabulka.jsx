/** Created by hhj on 12/28/15. */
import React, { PropTypes } from 'react'

import Radka from './Radka.jsx'
import { columns } from './Column'

export default class Tabulka extends React.Component {
  static propTypes = {
    seznamZarizeni: PropTypes.object
  };

  render() {
    // console.log(this.props)
    const { seznamZarizeni } = this.props
    // console.log(seznamZarizeni.toObject())

    return (
      <div className="Table">
        <div className="Table-row Table-header">
          {
            columns.toList().map(col => {
              return <div className="Table-row-item" key={col.name}>{col.caption}</div>
            })
          }
        </div>
        {
          seznamZarizeni.map(zarizeni => {
            return <Radka key={zarizeni.id} zarizeni={zarizeni} columns={columns.toObject()} />
          })
        }
      </div>
    )
  }
}
