/** Created by hhj on 1/20/16. */
import React, { PropTypes } from 'react'
import HeaderFilter from './HeaderFilter'
import './Header.styl'

export default class HeaderCell extends React.Component {
  static propTypes = {
    column: PropTypes.object,
    sort: PropTypes.object,
    filter: PropTypes.object,
    onSortChange: PropTypes.func,
    onFilterChange: PropTypes.func,
  };

  render() {
    const { sort, filter, column, onSortChange, onFilterChange } = this.props
    const arrow = sort.by === column.name ? (sort.dir ? 'glyphicon-arrow-up' : 'glyphicon-arrow-down') : ''
    return (
      <div className={'myTableRowItem' + ` uFlexGrow-${column.width}`}>
        <div className="header">
          <div className="headerItem uFlexGrow-2" onClick={() => onSortChange(column.name)}>
            {column.caption}
          <div className={'headerItem glyphicon ' + arrow} />
          </div>
          <HeaderFilter column={column} filter={filter} onFilterChange={onFilterChange} />
        </div>
      </div>
    )
  }
}
