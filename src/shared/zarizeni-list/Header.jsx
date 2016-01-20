/** Created by hhj on 1/15/16. */
import React, { PropTypes } from 'react'
import './Header.styl'
import HeaderCell from './HeaderCell.jsx'

/**
 * @deprecated
 */
export default class Header extends React.Component {
  static propTypes = {
    columns: PropTypes.object,
    onSortChange: PropTypes.func,
    sort: PropTypes.object
  };

  render() {
    const { sort, columns, onSortChange } = this.props
    return (
      <div className="Table-row Table-header">
        {
          columns.toList().map(col => {
            return <HeaderCell key={col.name} sort={sort} column={col} onSortChange={onSortChange} />
          })
        }
      </div>
    )
  }
}
