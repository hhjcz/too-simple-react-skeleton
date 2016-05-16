/** Created by hhj on 12/29/15. */
import React, { PropTypes } from 'react'
import { Pagination, FormGroup, FormControl, InputGroup } from 'react-bootstrap'

import debounce from '../debounce'

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

  static validatePageSize(perPage) {
    return Paginator.parsePageSize(perPage) > 0
  }

  static parsePageSize(perPage) {
    return parseInt(perPage, 10)
  }

  constructor(props) {
    super(props);
    this.state = {
      perPage: this.props.pagination.perPage
    }
    if (this.props.debounce > 0) {
      this.onPerPageChange = debounce(this.onPerPageChange, this.props.debounce, this)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.pagination.perPage !== nextProps.pagination.perPage) {
      this.setState({ perPage: nextProps.pagination.perPage })
    }
  }

  onPerPageChange(perPage) {
    if (Paginator.validatePageSize(perPage)) {
      this.props.onPerPageChange(Paginator.parsePageSize(perPage))
    }
  }

  render() {
    const self = this
    const { pagination, onPageChange, bsSize, maxButtons } = this.props
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col col-xs-8 vcenter" ref="pageInput">
            <Pagination
              items={pagination.totalPages}
              activePage={pagination.page}
              prev next first last ellipsis
              bsSize={bsSize} maxButtons={maxButtons}
              onSelect={function(eventKey) {
                if (pagination.page !== eventKey) onPageChange(eventKey)
              }}
            />
          </div>
          <div className="col col-xs-2 vcenter" ref="totalInput">
            <FormGroup bsSize={bsSize} validationState="success" bsSize={bsSize}>
              <InputGroup>
                <InputGroup.Addon>total</InputGroup.Addon>
                <FormControl type="text" value={pagination.total} disabled />
              </InputGroup>
            </FormGroup>
          </div>
          <div className="col col-xs-2 vcenter" ref="perPageInput">
            <FormGroup
              bsSize={bsSize}
              validationState={Paginator.validatePageSize(this.state.perPage) ? 'success' : 'error'}
            >
              <InputGroup>
                <InputGroup.Addon>page size</InputGroup.Addon>
                <FormControl
                  type="text" id="perPageInput" ref="perPage"
                  value={this.state.perPage}
                  onChange={function(event) {
                    if (event.persist) event.persist()
                    const perPage = event.target.value
                    self.setState({ perPage })
                    self.onPerPageChange(perPage)
                  }}
                />
              </InputGroup>
            </FormGroup>
          </div>
        </div>
      </div>
    )
  }
}
