/** Created by hhj on 1/20/16. */
import React, { PropTypes } from 'react'
import HeaderFilter from './HeaderFilter'
import HeaderSort from './HeaderSort'
import './Header.styl'

export default class HeaderCell extends React.Component {
  static propTypes = {
    column: PropTypes.object.isRequired,
    sort: PropTypes.object,
    filter: PropTypes.object,
    onSortChange: PropTypes.func.isRequired,
    onFilterChange: PropTypes.func.isRequired,
  };

  render() {
    const { filter, sort, column, onFilterChange, onSortChange } = this.props

    return (
      <div className={`myTableRowItem uFlexGrow-${column.width} header`}>
        <div className="headerTitle uFlexGrow-3">
          {column.caption}
        </div>
        <div className="headerIcons uFlexGrow-1">
          <HeaderSort column={column} sort={sort} onSortChange={onSortChange} />
          <HeaderFilter column={column} filter={filter} onFilterChange={onFilterChange} />
        </div>
      </div>
    )
  }
}
