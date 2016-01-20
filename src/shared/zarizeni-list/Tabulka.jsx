/** Created by hhj on 12/28/15. */
import React, { PropTypes } from 'react'

import './Tabulka.styl'
import HeaderCell from './HeaderCell'
import Radka from './Radka'
import { columns } from './Column'

export default class Tabulka extends React.Component {
  static propTypes = {
    fetching: PropTypes.bool,
    seznamZarizeni: PropTypes.object,
    sort: PropTypes.object,
    onSortChange: PropTypes.func,
    onFilterChange: PropTypes.func,
  };

  render() {
    // console.log(this.props)
    const { fetching, seznamZarizeni, sort, onSortChange, onFilterChange } = this.props
    // console.log(seznamZarizeni.toObject())

    return (
      <div className={'Table ' + (fetching ? ' Table-fetching' : '')}>
        {/* header */}
        <div className="Table-row Table-header">
          {
            columns.toList().map(col => {
              return (
                <HeaderCell key={col.name} sort={sort} column={col} onSortChange={onSortChange} onFilterChange={onFilterChange} />
              )
            })
          }
        </div>
        {/* rows */}
        {
          seznamZarizeni.map(zarizeni => {
            return <Radka key={zarizeni.id} zarizeni={zarizeni} columns={columns.toList()} />
          })
        }
        {fetching ? <div className="fetchIndicator glyphicon" /> : ''}
      </div>
    )
  }
}
