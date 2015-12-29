/**
 * Created by hhj on 12/29/15.
 */

import React, {PropTypes} from 'react'
import {Pagination} from 'react-bootstrap'

export default class Paginator extends React.Component {

  static propTypes = {
    pagination: PropTypes.object.isRequired,
    onPageChange: PropTypes.func.isRequired
  }

  render() {
    const {pagination, onPageChange} = this.props
    return (
      <div>
        <Pagination
          bsSize="medium"
          items={pagination.totalPages}
          activePage={pagination.page}
          onSelect={(event, selectedEvent) => onPageChange(selectedEvent.eventKey)}
        />
        Current: {pagination.page}, page size: {pagination.perPage}, total pages: {pagination.totalPages}
      </div>
    )
  }
}
