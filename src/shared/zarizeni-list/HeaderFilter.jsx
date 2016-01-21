/** Created by hhj on 1/21/16. */
import React, { PropTypes } from 'react'
import { Input } from 'react-bootstrap'
import { Filter } from './filter'
import debounce from '../lib/debounce'

export default class HeaderFilter extends React.Component {
  static propTypes = {
    column: PropTypes.object.isRequired,
    filter: PropTypes.object,
    onFilterChange: PropTypes.func.isRequired,
    debounce: PropTypes.number,
  };

  constructor(props) {
    super(props)
    this.state = {
      filterValue: this.props.filter ? this.props.filter.value : '',
      filterVisible: false
    }
    this.onFilterChange = debounce(this.onFilterChange, this.props.debounce || 500, this)
  }

  onFilterChange(filterValue) {
    this.props.onFilterChange(new Filter({ name: this.props.column.name, value: filterValue }))
  }

  toggleFilter() {
    this.setState({ filterVisible: !this.state.filterVisible })
  }

  render() {
    const active = this.state.filterValue ? ' active' : ''
    return (
      <div>
        <div className={'headerItem glyphicon filterIcon' + active} onClick={() => this.toggleFilter.bind(this)() } />
        <div className={'columnFilter vcenter' + (this.state.filterVisible ? ' visible' : '')}>
          <Input
            type="text" value={this.state.filterValue} addonBefore="filter" bsStyle="success"
            onChange={(event) => {
              const filterValue = event.target.value
              this.setState({ filterValue })
              this.onFilterChange(filterValue)
            }}
          />
        </div>
      </div>
    )
  }
}
