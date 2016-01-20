/** Created by hhj on 12/29/15. */
import React, { PropTypes } from 'react'
import { Pagination, Input } from 'react-bootstrap'

import debounce from '../lib/debounce'

export default class Paginator extends React.Component {
  static propTypes = {
    pagination: PropTypes.object.isRequired,
    onPageChange: PropTypes.func.isRequired,
    onPerPageChange: PropTypes.func.isRequired,
    bsSize: PropTypes.number,
    maxButtons: PropTypes.string,
    debounce: PropTypes.number
  };

  constructor(props) {
    super(props);
    this.state = {
      // page: this.props.pagination.page,
      perPage: this.props.pagination.perPage
    }
    this.onPerPageChange = debounce(this.onPerPageChange, this.props.debounce || 500, this)
  }

  componentWillReceiveProps(nextProps) {
    // console.log('Receive next perPage: ', nextProps.pagination.perPage)
    if (this.props.pagination.perPage !== nextProps.pagination.perPage) this.setState({ perPage: nextProps.pagination.perPage })
  }

  componentWillUpdate(nextProps) {  // eslint-disable-line no-unused-vars
    // console.log('Update next perPage: ', nextProps.pagination.perPage)
  }

  onPerPageChange(perPage) {
    if (this.validatePageSize(perPage)) this.props.onPerPageChange(this.parsePageSize(perPage))
  }

  validatePageSize(perPage) {
    return this.parsePageSize(perPage) > 0
  }

  parsePageSize(perPage) {
    return parseInt(perPage, 10)
  }

  render() {
    const { pagination, onPageChange, bsSize, maxButtons } = this.props
    return (
      <div className="container-fluid">
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
              bsStyle={this.validatePageSize(this.state.perPage) ? 'success' : 'error'}
              bsSize="small"
              addonBefore="page size"
              value={this.state.perPage}
              ref="perPage"
              onChange={(event) => {
                event.persist()
                const perPage = event.target.value
                this.setState({ perPage })
                this.onPerPageChange(perPage)
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
