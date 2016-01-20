/** Created by hhj on 12/28/15. */
import React, { PropTypes } from 'react'

import './Tabulka.styl'
import HeaderCell from './HeaderCell'
import Radka from './Radka'
import { columns } from './Column'

export default class Tabulka extends React.Component {
  static propTypes = {
    seznamZarizeni: PropTypes.object,
    onSortChange: PropTypes.func,
    sort: PropTypes.object
  };

  render() {
    // console.log(this.props)
    const { seznamZarizeni, sort, onSortChange } = this.props
    // console.log(seznamZarizeni.toObject())

    return (
      <div className="Table">
        {/* header */}
        <div className="Table-row Table-header">
          {
            columns.toList().map(col => {
              return <HeaderCell key={col.name} sort={sort} column={col} onSortChange={onSortChange} />
            })
          }
        </div>
        {/* rows */}
        {
          seznamZarizeni.map(zarizeni => {
            return <Radka key={zarizeni.id} zarizeni={zarizeni} columns={columns.toList()} />
          })
        }
      </div>
    )
  }
}
