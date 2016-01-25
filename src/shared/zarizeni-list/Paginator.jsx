/** Created by hhj on 12/29/15. */
import React, { PropTypes } from 'react'
import { Pagination, Input } from 'react-bootstrap'

import debounce from '../lib/debounce'

export default class Paginator extends React.Component {
  static propTypes = {
    pagination: PropTypes.object.isRequired,
    onPageChange: PropTypes.func.isRequired,
    onPerPageChange: PropTypes.func.isRequired,
    bsSize: PropTypes.string,
    maxButtons: PropTypes.number,
    debounce: PropTypes.number
  };

  static defaultProps = {
    debounce: 500,
    bsSize: 'small',
    maxButtons: 9,
  };

  constructor(props) {
    super(props);
    this.state = {
      perPage: this.props.pagination.perPage
    }
    if (this.props.debounce > 0) this.onPerPageChange = debounce(this.onPerPageChange, this.props.debounce, this)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.pagination.perPage !== nextProps.pagination.perPage) {
      this.setState({ perPage: nextProps.pagination.perPage })
    }
  }

  onPerPageChange(perPage) {
    if (Paginator.validatePageSize(perPage)) this.props.onPerPageChange(Paginator.parsePageSize(perPage))
  }

  static validatePageSize(perPage) {
    return Paginator.parsePageSize(perPage) > 0
  }

  static parsePageSize(perPage) {
    return parseInt(perPage, 10)
  }

  render() {
    const { pagination, onPageChange, bsSize, maxButtons, fetching } = this.props
    const self = this
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col col-xs-8 vcenter" ref="pageInput">
            <Pagination
              items={pagination.totalPages}
              activePage={pagination.page}
              prev next first last ellipsis
              bsSize={bsSize} maxButtons={maxButtons}
              onSelect={function(event, selectedEvent) {
                if (pagination.page !== selectedEvent.eventKey) onPageChange(selectedEvent.eventKey)
              }}
            />
          </div>
          <div className="col col-xs-2 vcenter" ref="totalInput">
            <Input
              type="text"
              addonBefore="total"
              value={pagination.total}
              bsStyle="success"
              bsSize={bsSize} disabled
            />
          </div>
          <div className="col col-xs-2 vcenter" ref="perPageInput">
            <Input
              id="perPageInput"
              type="text"
              ref="perPage"
              addonBefore="page size"
              value={this.state.perPage}
              bsStyle={Paginator.validatePageSize(this.state.perPage) ? 'success' : 'error'}
              bsSize={bsSize}
              onChange={function(event) {
                if (event.persist) event.persist()
                const perPage = event.target.value
                self.setState({ perPage })
                self.onPerPageChange(perPage)
              }}
            />
          </div>
        </div>
      </div>
    )
  }
}
