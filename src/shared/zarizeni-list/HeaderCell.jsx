/** Created by hhj on 1/20/16. */
import React, { PropTypes } from 'react'
import HeaderFilter from './HeaderFilter'
import './Header.styl'

export default class HeaderCell extends React.Component {
  static propTypes = {
    column: PropTypes.object,
    sort: PropTypes.object,
    filter: PropTypes.object,
    onSortChange: PropTypes.func.isRequired,
    onFilterChange: PropTypes.func.isRequired,
  };

  render() {
    const { sort, filter, column, onSortChange, onFilterChange } = this.props
    const arrowDirection = sort.dir ? 'up' : 'down'
    const arrow = sort.by === column.name ? `glyphicon-arrow-${arrowDirection}` : ''

    return (
      <div className={'myTableRowItem' + ` uFlexGrow-${column.width}`}>
        <div className="header">
          <div className="headerItem uFlexGrow-2" onClick={function() {onSortChange(column.name)}}>
            {column.caption}
            <div className={'headerItem glyphicon ' + arrow} />
          </div>
          <HeaderFilter column={column} filter={filter} onFilterChange={onFilterChange} />
        </div>
      </div>
    )
  }
}
