/** Created by hhj on 12/28/15. */
import React, { PropTypes } from 'react'

import './Tabulka.styl'
import HeaderCell from './HeaderCell'
import Radka from './Radka'
import { columns } from './columns'

export default class Tabulka extends React.Component {

  static propTypes = {
    fetching: PropTypes.bool,
    seznamZarizeni: PropTypes.object,
    pagination: PropTypes.object,
    sort: PropTypes.object,
    filters: PropTypes.object,
    onSortChange: PropTypes.func.isRequired,
    onFilterChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    pagination: {},
  };

  render() {
    // console.log(this.props)
    const { fetching, seznamZarizeni, pagination, sort, filters, onSortChange, onFilterChange } = this.props
    let offset = (pagination.page - 1) * pagination.perPage + 1
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
            <Radka key={zarizeni.id} zarizeni={zarizeni} columns={columns.toList()} pagination={pagination} pozice={offset++} />
          )
        }
        {fetching ? <div className="fetchIndicator glyphicon visible" /> : ''}
      </div>
    )
  }
}
