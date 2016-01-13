/** Created by hhj on 12/29/15. */
import React, { PropTypes } from 'react'
import { Pagination, Input } from 'react-bootstrap'

export default class Paginator extends React.Component {
  static propTypes = {
    pagination: PropTypes.object.isRequired,
    onPageChange: PropTypes.func.isRequired,
    onPerPageChange: PropTypes.func.isRequired,
    bsSize: PropTypes.number,
    maxButtons: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      // page: this.props.pagination.page,
      perPage: this.props.pagination.perPage
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.pagination.perPage !== nextProps.pagination.perPage) this.setState({ perPage: nextProps.pagination.perPage })
  }

  validatePageSize(perPage) {
    if (!parseInt(perPage) > 0) return 'error'

    return 'success'
  }

  render() {
    const { pagination, onPageChange, onPerPageChange, bsSize, maxButtons } = this.props
    return (
      <div class="container-fluid">
        <div className="row">
          <div className="col col-xs-8 vcenter">
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
          </div>
          <div className="col col-xs-2 vcenter">
            <Input
              type="text"
              bsStyle={this.validatePageSize(this.state.perPage)}
              bsSize="small"
              addonBefore="page size"
              value={this.state.perPage}
              ref="perPage"
              onChange={(event) => {
                const perPage = event.target.value
                this.setState({ perPage })
                if (this.validatePageSize(perPage).indexOf('success') > -1) onPerPageChange(parseInt(perPage))
              }}
            />
          </div>
        </div>
        <div>
          Current: {pagination.page}, page size: {pagination.perPage}, total pages: {pagination.totalPages}
        </div>
      </div>
    )
  }
}
