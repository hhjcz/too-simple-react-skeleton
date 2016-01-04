/**
 * Created by hhj on 12/29/15.
 */

import React, { PropTypes } from 'react'
import { Pagination } from 'react-bootstrap'

export default class Paginator extends React.Component {

  static propTypes = {
    pagination: PropTypes.object.isRequired,
    onPageChange: PropTypes.func.isRequired,
    bsSize: PropTypes.number,
    maxButtons: PropTypes.string
  }

  render() {
    const { pagination, onPageChange, bsSize, maxButtons } = this.props
    return (
      <div>
        <Pagination
          bsSize={bsSize || 'medium'}
          prev
          next
          first
          last
          ellipsis
          maxButtons={maxButtons || 9}
          items={pagination.totalPages}
          activePage={pagination.page}
          onSelect={(event, selectedEvent) => {
            if (pagination.page !== selectedEvent.eventKey) onPageChange(selectedEvent.eventKey)
          }}
        />
        Current: {pagination.page}, page size: {pagination.perPage}, total pages: {pagination.totalPages}
      </div>
    )
  }
}
