/** Created by hhj on 12/28/15. */
import React, { PropTypes } from 'react'

import './Tabulka.styl'
import HeaderCell from './HeaderCell'
import Radka from './Radka'
import { columns } from './../app/models/Column'

export default class Tabulka extends React.Component {
  static propTypes = {
    fetching: PropTypes.bool,
    seznamZarizeni: PropTypes.object,
    sort: PropTypes.object,
    filters: PropTypes.object,
    onSortChange: PropTypes.func.isRequired,
    onFilterChange: PropTypes.func.isRequired,
  };

  render() {
    // console.log(this.props)
    const { fetching, seznamZarizeni, sort, filters, onSortChange, onFilterChange } = this.props
    // console.log(seznamZarizeni.toObject())

    return (
      <div className={'myTable' + (fetching ? ' fetching' : '')}>
        {/* header */}
        <div className="myTableRow">
          {
            columns.toList().map(col =>
              <HeaderCell
                key={col.name} sort={sort} column={col} filter={filters.get(col.name)}
                onSortChange={onSortChange} onFilterChange={onFilterChange}
              />
            )
          }
        </div>
        {/* rows */}
        {
          seznamZarizeni.map(zarizeni =>
            <Radka key={zarizeni.id} zarizeni={zarizeni} columns={columns.toList()} />
          )
        }
        {fetching ? <div className="fetchIndicator glyphicon visible" /> : ''}
      </div>
    )
  }
}
