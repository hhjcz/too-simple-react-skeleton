/**
 * Created by hhj on 12/29/15.
 */

import React, {PropTypes} from 'react'
import {Pagination} from 'react-bootstrap'

export default class Paginator extends React.Component {

  static propTypes = {
    pagination: PropTypes.object,
    onPageChange: PropTypes.func.required
  }

  handleSelect(event, selectedEvent) {
    this.props.onPageChange(selectedEvent.eventKey)
  }

  render() {
    const {pagination} = this.props
    return (
      <div>
        <Pagination
          bsSize="medium"
          items={pagination.totalPages}
          activePage={pagination.page}
          onSelect={this.handleSelect.bind(this)}
        />
        Current: {pagination.page}, page size: {pagination.perPage}, total pages: {pagination.totalPages}
      </div>
    )
  }
}
