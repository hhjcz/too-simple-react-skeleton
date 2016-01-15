/** Created by hhj on 1/15/16. */
import React, { PropTypes } from 'react'

export default class Header extends React.Component {
  static propTypes = {
    columns: PropTypes.object,
    onSortChange: PropTypes.func,
    sortBy: PropTypes.string
  };

  render() {
    const { sortBy, columns, onSortChange } = this.props
    return (
      <div className="Table-row Table-header">
        {
          columns.toList().map(col => {
            const sorted = sortBy.indexOf(col.name) > -1 ? ' sorted' : ''
            return (
              <div className="Table-row-item" key={col.name} onClick={() => onSortChange(col.name)}>
                <div>
                  {col.caption}
                </div>
                <div>
                  {sorted}
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }
}
