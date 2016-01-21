/** Created by hhj on 1/20/16. */
import React, { PropTypes } from 'react'
import { Input } from 'react-bootstrap'
import debounce from '../lib/debounce'
import { Filter } from './filter'
import './Header.styl'

export default class HeaderCell extends React.Component {
  static propTypes = {
    column: PropTypes.object,
    sort: PropTypes.object,
    onSortChange: PropTypes.func,
    onFilterChange: PropTypes.func,
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
    const { sort, column, onSortChange, onFilterChange } = this.props
    const arrow = sort.by === column.name ? (sort.dir ? 'glyphicon-arrow-up' : 'glyphicon-arrow-down') : ''
    return (
      <div className="myTableRowItem">
        <div className="header">
          <div className="headerItem uFlexGrow-2" onClick={() => onSortChange(column.name)}>
            {column.caption}
          </div>
          <div className={'headerItem glyphicon ' + arrow} />
          <div className="headerItem glyphicon filterIcon" onClick={() => this.toggleFilter.bind(this)() } />
          {
            this.state.filterVisible ?
              <div className="columnFilter vcenter">
                <Input type="text" addonBefore="filter" bsStyle="success"
                  onChange={debounce(event => onFilterChange(new Filter({ name: column.name, value: event.target.value })), 500)}
                />
              </div>
              : null
          }
        </div>
      </div>
    )
  }
}
