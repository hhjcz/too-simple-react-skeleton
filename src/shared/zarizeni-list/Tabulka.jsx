/** Created by hhj on 12/28/15. */
import React, { PropTypes } from 'react'
import { List } from 'immutable'
import '../lib/Tabulka.styl'
import HeaderCell from './HeaderCell'
import Radka from './Radka'

export default class Tabulka extends React.Component {

  static propTypes = {
    columns: PropTypes.object.isRequired,
    fetching: PropTypes.bool,
    seznamZarizeni: PropTypes.object,
    pagination: PropTypes.object,
    sort: PropTypes.object,
    filters: PropTypes.object,
    onSortChange: PropTypes.func.isRequired,
    onFilterChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    columns: List(),
    pagination: {},
  };

  render() {
    const { fetching, seznamZarizeni, pagination, sort, filters, onSortChange, onFilterChange, columns } = this.props // eslint-disable-line max-len
    let offset = (pagination.page - 1) * pagination.perPage + 1

    return (
      <div className={`myTable${(fetching ? ' fetching' : '')}`}>
        {/* header */}
        <div className="myTableRow">
          {
            columns.filter(col => col.visible).map(col =>
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
            <Radka
              key={zarizeni.id} zarizeni={zarizeni} columns={columns.toList()}
              pagination={pagination} pozice={offset} highlighted={offset++ === pagination.cursorAt}
            />
          )
        }
        {fetching ? <div className="fetchIndicator glyphicon visible" /> : ''}
      </div>
    )
  }
}
