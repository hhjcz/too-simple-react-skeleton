/** Created by hhj on 1/20/16. */
import React, { PropTypes } from 'react'
import './Header.styl'

export default class HeaderCell extends React.Component {
  static propTypes = {
    column: PropTypes.object,
    onSortChange: PropTypes.func,
    sort: PropTypes.object
  };

  constructor() {
    super()
    this.state = {
      filterVisible: false
    }
  }

  toggleFilter() {
    this.setState({ filterVisible: !this.state.filterVisible })
  }

  render() {
    const { sort, column, onSortChange } = this.props
    const arrow = sort.by === column.name ? (sort.dir ? 'glyphicon-arrow-up' : 'glyphicon-arrow-down') : ''
    return (
      <div className="Table-row-item">
        <div className="Header">
          <div className="Header-item u-flex-grow-2" onClick={() => onSortChange(column.name)}>
            {column.caption}
          </div>
          <div className={'Header-item glyphicon ' + arrow} />
          <div className="Header-item glyphicon glyphicon-filter" onClick={() => this.toggleFilter.bind(this)() } />
          {
            this.state.filterVisible ? <div className="ColumnFilter"></div> : null
          }
        </div>
      </div>
    )
  }
}
