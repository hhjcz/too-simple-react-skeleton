/** Created by hhj on 1/15/16. */
import React, { PropTypes } from 'react'

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
            const arrow = sort.by === col.name ? (sort.dir ? 'glyphicon-arrow-up' : 'glyphicon-arrow-down') : ''
            return (
              <div className="Table-row-item" key={col.name} onClick={() => onSortChange(col.name)}>
                <div className="Table-row">
                  <div className="Table-row-item u-flex-grow-2">
                    {col.caption}
                  </div>
                  <div className={'Table-row-item glyphicon ' + arrow} />
                  <div className="Table-row-item glyphicon glyphicon-filter" />
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }
}
